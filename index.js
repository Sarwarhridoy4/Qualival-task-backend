//Require all nessesary pakage
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Airtable = require("airtable");
//using dotenv pakage
dotenv.config();

const app = express();
app.use(cors()); // allow cross-origin requests
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

app.get("/data", (req, res) => {
  // replace "YOUR_TABLE_NAME" with the name of your Airtable table
  base("Tasks")
    .select({
      view: "My_view", // replace with the name of your Airtable view
      maxRecords: 5, // replace with the number of records you want to retrieve
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach((record) => {
          console.log(record.fields); // display the data in the terminal
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return res.status(500).send("Error retrieving data from Airtable");
        }
        return res.send("Data retrieved successfully");
      }
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
