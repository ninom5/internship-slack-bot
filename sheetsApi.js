import { google } from "googleapis";
import path from "path";
import { likelyMatches } from "./matcher.js";
import dotenv from "dotenv";
dotenv.config();

import { GoogleSheetsURL } from "./config.js";

export const sheetsApi = async (userMessage) => {
  const keyFilePath = path.resolve(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  const googleAuth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: GoogleSheetsURL,
  });

  const sheets = google.sheets({
    version: "v4",
    auth: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A1:B2",
    });

    const resultRows = response.data.values;

    if (!resultRows || resultRows.length === 0) {
      console.log("Data empty");
      return;
    }

    const matchResults =likelyMatches(userMessage, resultRows.flat());

    return matchResults;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data from Google Sheets");
  }
};
