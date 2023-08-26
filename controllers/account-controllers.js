const Account = require("../model/account");

module.exports = {
  // Add Account
  addAccount: async (req, res) => {
    try {
      const { account_name, account_type } = req.body;
      const account = await Account.findOne({ account_name: account_name });

      if (account) {
        // Email already exists, send a response indicating failure
        res.json({
          status: "failed",
          message: "Account already exists.",
        });
      } else {
        await Account.create({
          account_name,
          account_type,
        }).then((data) => {
          // User created successfully, send a success response with the data
          res.status(200).json({
            result: data,
            message: "Account created successfully!",
          });
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all account
  getAccounts: async (req, res) => {
    try {
      const account_data = await Account.find({});
      account_data.reverse();

      // Send a success response with the retrieved users
      res.status(200).json({ result: account_data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get account by ID
  getAccount: async (req, res) => {
    try {
      const account_data = await Account.findById(req.params.id);

      // Send a success response with the retrieved user
      res.status(200).json({ result: account_data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete account
  deleteAccount: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAccount = await Account.findByIdAndDelete(id);
      if (!deletedAccount) {
        // Account not found
        return res.status(404).json({ error: "Account not found" });
      }

      // Send a success response with the remaining users
      res.status(200).json({ result: deletedAccount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Edit user details
  updateAccount: async (req, res) => {
    try {
      const { id, account_name, account_type, user_id } = req.body;

      const updatedAccount = await Account.findByIdAndUpdate(id, {
        account_name,
        account_type,
      });
      if (!updatedAccount) {
        return res.status(404).json({ error: "Account not found" });
      }
      const userExit = updatedAccount.user_id.findIndex((id) => id == user_id);

      if (userExit === -1) {
        Account.updateOne({ _id: id }, { $push: { user_id: user_id } }).then(
          () => {}
        );
      }
      // Send a success response with the updated users
      res.status(200).json({
        result: updatedAccount,
        message: "Account details updated successfully!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
