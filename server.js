import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Google Sheets Setup
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || '1tfdx9_c7U9y-tLQRdLt_AD-9cho-8O0wdUmlZszR0VI';
const SHEET_NAME = 'Responses';
const RANGE = `${SHEET_NAME}!A1`;

let sheets;
let auth;

// Initialize Google Sheets API
async function initializeGoogleSheets() {
  try {
    // Try to use credentials from environment variable first
    if (process.env.GOOGLE_CREDENTIALS) {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    } else {
      // Fallback to credentials.json file
      const credentialsPath = path.join(__dirname, 'credentials.json');
      if (fs.existsSync(credentialsPath)) {
        auth = new google.auth.GoogleAuth({
          keyFile: credentialsPath,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
      } else {
        console.warn('Warning: No credentials found. Google Sheets integration will not work.');
        return;
      }
    }

    sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Google Sheets API initialized');

    // Create "Responses" sheet if it doesn't exist and add headers
    await createResponsesSheetIfNotExists();
  } catch (error) {
    console.error('❌ Error initializing Google Sheets:', error.message);
  }
}

// Create "Responses" sheet and add headers
async function createResponsesSheetIfNotExists() {
  try {
    // Get all sheets in the spreadsheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheetExists = spreadsheet.data.sheets.some(
      (sheet) => sheet.properties.title === SHEET_NAME
    );

    if (sheetExists) {
      console.log(`✅ Sheet "${SHEET_NAME}" already exists`);
    } else {
      console.log(`📝 Creating sheet "${SHEET_NAME}"...`);

      // Create new sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                },
              },
            },
          ],
        },
      });

      // Add headers
      const headers = [
        ['Name', 'Flat', 'Members', 'Celebration', 'Lunch', 'Dishes', 'Veg Type', 'Activities', 'Message', 'Timestamp'],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:J1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: headers,
        },
      });

      console.log(`✅ Sheet "${SHEET_NAME}" created with headers`);
    }
  } catch (error) {
    console.error('⚠️ Warning: Could not verify sheet setup:', error.message);
  }
}

// Route: Submit form
app.post('/api/submit', async (req, res) => {
  try {
    const {
      name,
      flat,
      members,
      celebrate,
      lunch,
      dishes,
      vegtype,
      activities,
      message,
    } = req.body;

    // Validate required fields
    if (!name || !flat || !celebrate || !lunch) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, flat, celebrate, lunch',
      });
    }

    // Prepare row data
    const timestamp = new Date().toISOString();
    const rowData = [
      [
        name,
        flat,
        members,
        celebrate,
        lunch,
        Array.isArray(dishes) ? dishes.join(', ') : dishes || '',
        vegtype || '',
        Array.isArray(activities) ? activities.join(', ') : activities || '',
        message || '',
        timestamp,
      ],
    ];

    // Append to Google Sheet
    if (sheets) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: rowData,
        },
      });
    }

    console.log(`✅ Submission received from ${name} (${flat})`);

    res.json({
      success: true,
      message: 'Your response has been submitted successfully!',
      data: {
        name,
        flat,
        timestamp,
      },
    });
  } catch (error) {
    console.error('❌ Error submitting form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit the form. Please try again.',
    });
  }
});

// Route: Check server status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Ugadi Habba 2026 Form Server is running',
    sheetsIntegrated: !!sheets,
  });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize and start server
await initializeGoogleSheets();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🎉 Ugadi Habba 2026 Form Server running on port ${PORT}`);
  console.log(`📝 Form available at http://localhost:${PORT}`);
  console.log(`🌸 Spreadsheet ID: ${SPREADSHEET_ID}\n`);
});
