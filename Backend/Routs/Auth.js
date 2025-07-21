const express = require("express")
const User = require("../model/User")
// const User = require("../../model/User")

const { generateToken, authenticateToken } = require("../server/middleware/Auth")
const router = express.Router()

// @desc    signup a new user
// @route   POST /api/auth/signup
// @access  Public
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        errors: {
          firstName: !firstName ? ["First name is required"] : [],
          lastName: !lastName ? ["Last name is required"] : [],
          email: !email ? ["Email is required"] : [],
          password: !password ? ["Password is required"] : [],
        },
      })
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
        errors: {
          email: ["Please enter a valid email address"],
        },
      })
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
        errors: {
          password: ["Password must be at least 6 characters"],
        },
      })
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
        errors: {
          email: ["User already exists with this email"],
        },
      })
    }

    // Create new user
    const user = new User({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password,
    })

    await user.save()

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    // Get public profile
    const userProfile = user.getPublicProfile()

    res.status(201).json({
      success: true,
      message: "User signuped successfully",
      token,
      user: userProfile,
    })
  } catch (error) {
    console.error("Registration error:", error)

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = {}
      Object.keys(error.errors).forEach((key) => {
        errors[key] = [error.errors[key].message]
      })

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      })
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
        errors: {
          email: ["User already exists with this email"],
        },
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    })
  }
})

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
        errors: {
          email: !email ? ["Email is required"] : [],
          password: !password ? ["Password is required"] : [],
        },
      })
    }

    // Find user and include password for comparison
    const user = await User.findByEmail(email).select("+password")
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        errors: {
          email: ["Invalid credentials"],
        },
      })
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Account has been deactivated. Please contact support.",
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        errors: {
          password: ["Invalid credentials"],
        },
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    // Get public profile
    const userProfile = user.getPublicProfile()

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: userProfile,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during login",
    })
  }
})

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      user: user.getPublicProfile(),
    })
  } catch (error) {
    console.error("Profile error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put("/profile", authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, phone, address, dateOfBirth } = req.body

    const user = await User.findById(req.user._id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Update fields if provided
    if (firstName) user.firstName = firstName.trim()
    if (lastName) user.lastName = lastName.trim()
    if (phone) user.phone = phone.trim()
    if (address) user.address = { ...user.address, ...address }
    if (dateOfBirth) user.dateOfBirth = new Date(dateOfBirth)

    await user.save()

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: user.getPublicProfile(),
    })
  } catch (error) {
    console.error("Profile update error:", error)

    if (error.name === "ValidationError") {
      const errors = {}
      Object.keys(error.errors).forEach((key) => {
        errors[key] = [error.errors[key].message]
      })

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error during profile update",
    })
  }
})

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put("/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
        errors: {
          currentPassword: !currentPassword ? ["Current password is required"] : [],
          newPassword: !newPassword ? ["New password is required"] : [],
        },
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
        errors: {
          newPassword: ["New password must be at least 6 characters"],
        },
      })
    }

    // Find user with password
    const user = await User.findById(req.user._id).select("+password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword)
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
        errors: {
          currentPassword: ["Current password is incorrect"],
        },
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during password change",
    })
  }
})

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
router.post("/logout", authenticateToken, async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just send a success response
    res.json({
      success: true,
      message: "Logout successful",
    })
  } catch (error) {
    console.error("Logout error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during logout",
    })
  }
})

// @desc    Delete user account
// @route   DELETE /api/auth/account
// @access  Private
router.delete("/account", authenticateToken, async (req, res) => {
  try {
    const { password } = req.body

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required to delete account",
        errors: {
          password: ["Password is required"],
        },
      })
    }

    // Find user with password
    const user = await User.findById(req.user._id).select("+password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
        errors: {
          password: ["Incorrect password"],
        },
      })
    }

    // Delete user
    await User.findByIdAndDelete(req.user._id)

    res.json({
      success: true,
      message: "Account deleted successfully",
    })
  } catch (error) {
    console.error("Delete account error:", error)
    res.status(500).json({
      success: false,
      message: "Server error during account deletion",
    })
  }
})

module.exports = router
  