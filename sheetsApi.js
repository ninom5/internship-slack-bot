// require('dotenv').config();
import {google} from "googleapis";
import {GoogleSheetsURL} from "./config.js";
// require(GoogleAuth)

export const sheetsApi = () => {
    const googleAuth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: GoogleSheetsURL,
    })

    const sheets = google.sheets({ version: "v4", auth: googleAuth });

    sheets.spreadsheets.values.get({
        spreadSheetID: process.env.SHEET_ID,
        // range: "Sheet1!A1:B2",
    }, () => {
        try{
            const resultRows = res.data.values;

            if(resultRows.length > 0)
            {
                console.log("Data empty");
                return;
            }

            resultRows.map((row) => {
                console.log(`Item: ${row[0]} is at the ${row[1]}`);
            })

        }catch(err)
        {
            console.log(err);
            throw new Error("Error fetching sheets data: ", err);
        }
    })
}
