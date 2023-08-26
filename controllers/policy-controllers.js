const Policy = require("../model/policy");

module.exports = {
  // Add Policy
  addPolicy: async (req, res) => {
    try {
      const {
        policy_number,
        premium_amount,
        policy_mode,
        policy_type,
        policy_start_date,
        policy_end_date,
        company_id,
        agent_id,
        csr,
        lob_id,
      } = req.body;
      const policy = await Policy.findOne({ Policy_name: Policy_name });

      if (policy) {
        // Email already exists, send a response indicating failure
        res.json({
          status: "failed",
          message: "Policy already exists.",
        });
      } else {
        await Policy.create({
          policy_number,
          premium_amount,
          policy_mode,
          policy_type,
          policy_start_date,
          policy_end_date,
          company_id,
          agent_id,
          csr,
          lob_id,
        }).then((data) => {
          // User created successfully, send a success response with the data
          res.status(200).json({
            result: data,
            message: "Policy created successfully!",
          });
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get all Policy
  getPolicys: async (req, res) => {
    try {
      const Policy_data = await Policy.find({});
      Policy_data.reverse();

      // Send a success response with the retrieved users
      res.status(200).json({ result: Policy_data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get Policy by ID
  getPolicy: async (req, res) => {
    try {
      const Policy_data = await Policy.findById(req.params.id);

      // Send a success response with the retrieved user
      res.status(200).json({ result: Policy_data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete Policy
  deletePolicy: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPolicy = await Policy.findByIdAndDelete(id);
      if (!deletedPolicy) {
        // Policy not found
        return res.status(404).json({ error: "Policy not found" });
      }

      // Send a success response
      res.status(200).json({ result: deletedPolicy });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Edit user details
  updatePolicy: async (req, res) => {
    try {
      const {
        policy_number,
        premium_amount,
        policy_mode,
        policy_type,
        policy_start_date,
        policy_end_date,
        company_id,
        agent_id,
        csr,
        lob_id,
      } = req.body;
      const { id } = req.params;
      const updatedPolicy = await Policy.findByIdAndUpdate(id, {
        policy_number,
        premium_amount,
        policy_mode,
        policy_type,
        policy_start_date,
        policy_end_date,
        company_id,
        agent_id,
        csr,
        lob_id,
      });
      if (!updatedPolicy) {
        return res.status(404).json({ error: "Policy not found" });
      }
      // Send a success response
      res.status(200).json({
        result: updatedPolicy,
        message: "Policy details updated successfully!",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
