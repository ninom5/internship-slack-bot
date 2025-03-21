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
      range: "Sheet1!A:B",
    });

    const resultRows = response.data.values;

    if (!resultRows || resultRows.length <= 1) {
      console.log("Data empty");
      return [];
    }

    const dataRows = resultRows.slice(1);

    const itemLocationMap = new Map();

    dataRows.forEach(([item, location]) => {
      if (!itemLocationMap.has(item)) 
        itemLocationMap.set(item, new Set());
      
      itemLocationMap.get(item).add(location);
    });

    const matchResults = likelyMatches(userMessage, Array.from(itemLocationMap.keys()));

    const formattedResults = matchResults.map(match => ({
      item: match.item,
      locations: Array.from(itemLocationMap.get(match.item) || []),
    }));

    return formattedResults;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching data from Google Sheets");
  }
};
