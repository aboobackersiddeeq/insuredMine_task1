// Utility function to convert data to CSV format
function convertToCSV(data) {
  // Create a CSV string with the header row
  let csvString =
    "First Name,Last Name,Email Address,Mobile,Gender,Status,Location\n";

  // Iterate over the data and append rows to the CSV string
  data.forEach((record) => {
    csvString += `${record.firstName},${record.lastName},${record.email},${record.mobile},${record.gender},${record.status},${record.location}\n`;
  });

  return csvString;
}

// Export the convertToCSV function
module.exports = {
  convertToCSV,
};
