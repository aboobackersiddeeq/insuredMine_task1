const csvtojson = require("csvtojson");
// Set up storage for file upload

export function CSVFileUploader(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileBuffer = req.file.buffer;
  const fileContent = fileBuffer.toString();
  csvtojson()
    .fromString(fileContent)
    .then((data) => {
        console.log('Data', data);
    });
}
