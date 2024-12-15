const User = require("../models/user");

const createAdminUser = async () => {
  try {
    const admin = await User.findOne({ role: "Admin" });

    if (!admin) {
      await User.create({
        username: "admin",
        email: "nabeel@gmail.com",
        password: "admin123",
        role: "Admin",
        status: "Approved",
      });
    }
  } catch (error) {
    console.error("Error creating admin: ", error);
  }
};

module.exports = createAdminUser;
