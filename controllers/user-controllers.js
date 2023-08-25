const User = require("../model/user");
const { convertToCSV } = require("../utils/convert-to-csv");

module.exports = {
  // Add user
  addUser: async (req, res) => {
    try {
      const { firstName, lastName, email, mobile, gender, status, location } =
        req.body.values;
      const user = await User.findOne({ email: email });
      const image = req.files.img;

      if (user) {
        // Email already exists, send a response indicating failure
        res.json({
          status: "failed",
          message: "Email already exists.",
        });
      } else {
        let imageUrl;
        if (image) {
          imageUrl = image[0].path;
          imageUrl = imageUrl.substring(6);
        }
        await User.create({
          image: imageUrl,
          firstName,
          lastName,
          email,
          mobile,
          gender,
          status,
          location,
        }).then((data) => {
          // User created successfully, send a success response with the data
          res.json({
            auth: true,
            result: data,
            status: "success",
            message: "User created successfully!",
          });
        });
      }
    } catch (error) {
      res.json({ status: "failed", message: error.message });
    }
  },

  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      users.reverse();

      // Send a success response with the retrieved users
      res.json({ status: "success", result: users });
    } catch (error) {
      res.json({ status: "failed", message: error.message });
    }
  },

  // Get user by ID
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.body.id);

      // Send a success response with the retrieved user
      res.json({ status: "success", result: user });
    } catch (error) {
      res.json({ status: "failed", message: error.message });
    }
  },

  // Delete user
  deleteUsers: async (req, res) => {
    try {
      const id = req.body.id;
      await User.findByIdAndDelete(id);
      const users = await User.find({});
      users.reverse();


      // Send a success response with the remaining users
      res.json({ status: "success", result: users });
    } catch (error) {
      res.json({ status: "failed", message: error.message });
    }
  },

  // Edit user details
  editUsers: async (req, res) => {
    try {
      const { firstName, lastName, email, mobile, gender, status, location } =
        req.body.values;
      const id = req.body.id;
      const image = req.files.img;
      let imageUrl;

      if (image) {
        imageUrl = image[0].path;
        imageUrl = imageUrl.substring(6);
      }

      await User.findByIdAndUpdate(id, {
        image: imageUrl,
        firstName,
        lastName,
        email,
        mobile,
        gender,
        status,
        location,
      });

      const users = await User.find({});

      // Send a success response with the updated users
      res.json({
        status: "success",
        result: users,
        message: "User details updated successfully!",
      });
    } catch (error) {
      res.json({ status: "failed", message: error.message });
    }
  },

  // Update user active status
  activeUser: async (req, res) => {
    try {
      const { id, status } = req.body;
      await User.findByIdAndUpdate(id, { status: status });
      const details = await User.find({});
      details.reverse();

      // Send a success response with the updated details
      res.json({ status: "success", result: details });
    } catch (error) {
      res.json({ status: "failed", message: error.message });
    }
  },

  // Search user data
  searchUserData: async (req, res) => {
    const { query } = req.query;
    try {
      const users = await User.find({
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { status: { $regex: query, $options: "i" } },
          { gender: { $regex: query, $options: "i" } },
        ],
      });

      // Send a success response with the matching users
      res.json({ status: "success", result: users });
    } catch (error) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },

  // Export CSV of user data
  exportCsv: async (req, res) => {
    try {
      const data = await User.find({});
      data.reverse();
      // Convert the data to CSV format
      const csvData = convertToCSV(data);

      // Set the HTTP headers
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=export.csv");

      // Send the CSV data as the response
      res.send(csvData);
    } catch (error) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
