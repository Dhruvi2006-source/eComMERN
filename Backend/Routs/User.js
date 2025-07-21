const express = require("express")
const User = require("../model/User")
const { authenticateToken, authorize } = require("../server/middleware/Auth")
const router = express.Router()

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get("/", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const sortBy = req.query.sortBy || "createdAt"
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1
    const search = req.query.search || ""

    // Build search query
    const searchQuery = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {}

    // Calculate skip value
    const skip = (page - 1) * limit

    // Get users with pagination
    const users = await User.find(searchQuery)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .select("-password")

    // Get total count for pagination
    const totalUsers = await User.countDocuments(searchQuery)
    const totalPages = Math.ceil(totalUsers / limit)

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    })
  }
})

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
router.get("/:id", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

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
    console.error("Get user error:", error)

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
    })
  }
})

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put("/:id", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const { firstName, lastName, email, role, isActive, isVerified } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Update fields if provided
    if (firstName) user.firstName = firstName.trim()
    if (lastName) user.lastName = lastName.trim()
    if (email) user.email = email.toLowerCase().trim()
    if (role) user.role = role
    if (typeof isActive === "boolean") user.isActive = isActive
    if (typeof isVerified === "boolean") user.isVerified = isVerified

    await user.save()

    res.json({
      success: true,
      message: "User updated successfully",
      user: user.getPublicProfile(),
    })
  } catch (error) {
    console.error("Update user error:", error)

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      })
    }

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

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        errors: {
          email: ["Email already exists"],
        },
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating user",
    })
  }
})

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete("/:id", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      })
    }

    await User.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Delete user error:", error)

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
    })
  }
})

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats/overview
// @access  Private/Admin
router.get("/stats/overview", authenticateToken, authorize("admin"), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const activeUsers = await User.countDocuments({ isActive: true })
    const verifiedUsers = await User.countDocuments({ isVerified: true })
    const adminUsers = await User.countDocuments({ role: "admin" })

    // Users signuped in the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    // Users who logged in in the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const activeInLastWeek = await User.countDocuments({
      lastLogin: { $gte: sevenDaysAgo },
    })

    res.json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        verifiedUsers,
        adminUsers,
        recentUsers,
        activeInLastWeek,
        inactiveUsers: totalUsers - activeUsers,
        unverifiedUsers: totalUsers - verifiedUsers,
      },
    })
  } catch (error) {
    console.error("Get user stats error:", error)
    res.status(500).json({
      success: false,
      message: "Server error while fetching user statistics",
    })
  }
})

module.exports = router
