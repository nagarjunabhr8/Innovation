# Ugadi Habba 2026 Form - Sri Tulasi Nivas

A beautiful community event participation form with WhatsApp integration and Google Sheets backend.

## 🌸 Features

- ✨ Beautiful, responsive form interface
- 🗳️ Celebration & lunch voting
- 🍛 Potluck dish selection
- 🎭 Activity preferences
- 💬 WhatsApp message generator
- 📊 Automatic Google Sheets storage
- 📱 Mobile-friendly design

## 🏗️ Project Structure

```
ugadi-form/
├── server.js              # Express backend with Google Sheets API
├── package.json           # Dependencies
├── vercel.json            # Vercel deployment config
├── .env.example           # Environment variables template
├── credentials.json       # Google Service Account (DO NOT COMMIT)
├── public/
│   └── index.html         # Form UI
└── .gitignore             # Git ignore rules
```

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm start
```

3. Open http://localhost:3000 in your browser

## 📊 Google Sheets Setup

The form automatically saves submissions to:
- **Spreadsheet ID**: `1tfdx9_c7U9y-tLQRdLt_AD-9cho-8O0wdUmlZszR0VI`
- **Service Account**: `nagarjunabehara@ugadi-2026.iam.gserviceaccount.com`

Columns saved:
- Name
- Flat Number
- Members Joining
- Celebration Response
- Lunch Vote
- Dishes (Potluck)
- Veg/Non-veg
- Activities
- Message
- Timestamp

## 🌐 Vercel Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Ugadi Habba 2026 form"
git push origin main
```

### Step 2: Configure Vercel Environment

1. Go to your Vercel project settings
2. Add these environment variables:

**SPREADSHEET_ID**
```
1tfdx9_c7U9y-tLQRdLt_AD-9cho-8O0wdUmlZszR0VI
```

**GOOGLE_CREDENTIALS** (full JSON content)
```json
{
  "type": "service_account",
  "project_id": "ugadi-2026",
  ... (entire credentials.json content)
}
```

### Step 3: Deploy
- Vercel will auto-deploy on every push to GitHub
- Your form will be live at `https://qualitycrafted.live`

## 🔒 Security Notes

1. **Never commit `credentials.json`** - Already in `.gitignore`
2. **On Vercel**, use environment variables (`GOOGLE_CREDENTIALS`) instead
3. **Share Google Sheet** only with the Service Account email
4. **Access Control**: Sheet is read-only for other users

## 📝 API Endpoints

### POST `/api/submit`
Submits form data to Google Sheets

**Request:**
```json
{
  "name": "John Doe",
  "flat": "A-201",
  "members": 3,
  "celebrate": "yes",
  "lunch": "potluck",
  "dishes": ["Pulihora", "Obbattu"],
  "vegtype": "veg",
  "activities": ["Rangoli drawing", "Group photo"],
  "message": "Looking forward to it!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your response has been submitted successfully!",
  "data": {
    "name": "John Doe",
    "flat": "A-201",
    "timestamp": "2026-03-17T10:30:00.000Z"
  }
}
```

### GET `/api/status`
Check server status

**Response:**
```json
{
  "status": "ok",
  "message": "Ugadi Habba 2026 Form Server is running",
  "sheetsIntegrated": true
}
```

## 🛠️ Troubleshooting

**Form submissions not saving?**
- Check if Google Sheet has Editor permission for Service Account
- Verify environment variables on Vercel
- Check server logs in Vercel dashboard

**API errors?**
- Visit `/api/status` to check server health
- Check browser console for network errors

## 📞 Support

For questions about deployment, contact the development team.

---

🌸 Ugadi Habba Shubhashayagalu!
