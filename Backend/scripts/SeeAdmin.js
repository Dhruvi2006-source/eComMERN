const mongoose = require("mongoose")
const User = require("../model/User")
require("dotenv").config()

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Connected to MongoDB")

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" })

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email)
      process.exit(0)
    }

    // Create admin user
    const adminUser = new User({
      firstName: process.env.ADMIN_FIRST_NAME || "Admin",
      lastName: process.env.ADMIN_LAST_NAME || "User",
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      password: process.env.ADMIN_PASSWORD || "admin123456",
      role: "admin",
      isVerified: true,
      isActive: true,
    })

    await adminUser.save()

    console.log("Admin user created successfully:")
    console.log("Email:", adminUser.email)
    console.log("Password:", process.env.ADMIN_PASSWORD || "admin123456")
    console.log("Role:", adminUser.role)

    process.exit(0)
  } catch (error) {
    console.error("Error seeding admin user:", error)
    process.exit(1)
  }
}

seedAdmin()
