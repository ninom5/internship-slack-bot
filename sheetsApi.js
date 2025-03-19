import { google } from "googleapis";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { GoogleSheetsURL } from "./config.js";

export const sheetsApi = () => {
  const keyFilePath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS); 

  const googleAuth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: GoogleSheetsURL,
  });

  const sheets = google.sheets({ version: "v4", auth: process.env.GOOGLE_APPLICATION_CREDENTIALS});

  sheets.spreadsheets.values.get(
    {
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A1:B2",
    },
    (err, res) => {
      if (err) {
        console.error("Error fetching sheets data:", err);
        return;
      }
      const resultRows = res.data.values;

      if (!resultRows || resultRows.length === 0) {
        console.log("Data empty");
        return;
      }

      resultRows.forEach((row) => {
        console.log(`Item: ${row[0]} is at the ${row[1]}`);
      });
    }
  );
};
