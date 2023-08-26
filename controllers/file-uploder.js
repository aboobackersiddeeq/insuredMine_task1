const csvtojson = require("csvtojson");
const xlsx = require("xlsx");
const User = require("../model/user");
const Account = require("../model/account");
const Agent = require("../model/agent");
const Policy = require("../model/policy");
const LOB = require("../model/lob");
const Carrier = require("../model/carrier");

async function processAndSaveData(data) {
    for (const item of data) {
      // Create Account document
      const account = new Account({
        account_name: item.account_name,
        account_type: item.account_type,
      });
      await account.save();

      // Create Carrier document
      const carrier = new Carrier({
        company_name: item.company_name,
      });
      await carrier.save();
      // Create LOB document
      const lob = new LOB({
        category_name: item.category_name,
      });
      await lob.save();

      // Create Agent document
      const agent = new Agent({
        agent: item.agent,
      });
      await agent.save();

      // Create Policy document
      const policy = new Policy({
        policy_number: item.policy_number,
        premium_amount: item.premium_amount,
        policy_mode: item.policy_mode,
        policy_type: item.policy_type,
        policy_start_date: item.policy_start_date,
        policy_end_date: item.policy_end_date,
        company_id: carrier._id,
        agent_id: agent._id,
        csr: item.csr,
        lob_id: lob._id,
      });
      await policy.save();

      // Create User document with references to Account and Policy
      const user = new User({
        firstname: item.firstname,
        email: item.email,
        gender: item.gender,
        dob: item.dob,
        address: item.address,
        city: item.city,
        state: item.state,
        zip: item.zip,
        phone: item.phone,
        userType: item.userType,
        account_id: account._id,
        policy_id: policy._id,
      });
      await user.save();

      // Update the Polcy document to include the reference to the User

      Policy.findByIdAndUpdate(policy._id, { user_id: user._id });
      Account.findByIdAndUpdate(account._id, { user_id: user._id });
    }
   
}

module.exports = {
  FileUploader: (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const fileBuffer = req.file.buffer;
      const fileContent = fileBuffer.toString();
      if (req.file.mimetype === "text/csv") {
        csvtojson()
          .fromString(fileContent)
          .then((data) => {
            processAndSaveData(data)
              .then(() => {
                res.status(200).json({ message: "Data uploaded successfully" });
              })
              .catch((error) => {
                res.status(500).json({ error: "Error processing data", error });
              });
          });
      } else if (req.file.originalname.endsWith(".xlsx")) {
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
        processAndSaveData(data)
          .then(() => {
            res.status(200).json({ message: "Data uploaded successfully" });
          })
          .catch((error) => {
            res.status(500).json({ error: "Error processing data", error });
          });
      } else {
        return res.status(400).json({ error: "Unsupported file format" });
      }
 
    } catch (error) {
      res.status(500).json({ error: "Error processing data" });
    }
  },
};
