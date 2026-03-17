#!/usr/bin/env node

/**
 * Helper script to prepare Google Credentials for Vercel deployment
 * Usage: node setup-vercel-env.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔧 Vercel Environment Setup Helper\n');

// Check if credentials.json exists
const credentialsPath = path.join(__dirname, 'credentials.json');
if (!fs.existsSync(credentialsPath)) {
  console.error('❌ credentials.json not found in project root');
  console.log('Please ensure credentials.json is in the project directory\n');
  process.exit(1);
}

// Read credentials
const credentials = fs.readFileSync(credentialsPath, 'utf8');
const credentialsJSON = JSON.parse(credentials);

console.log('✅ credentials.json found and valid\n');

// Display instructions
console.log('📋 SPREADSHEET_ID Configuration:');
console.log('   ✓ Already configured in vercel.json');
console.log('   Value: 1tfdx9_c7U9y-tLQRdLt_AD-9cho-8O0wdUmlZszR0VI\n');

console.log('📋 GOOGLE_CREDENTIALS Configuration:');
console.log('   Add to Vercel Settings → Environment Variables:\n');
console.log('   Name: GOOGLE_CREDENTIALS');
console.log('   Value (copy entire JSON below):\n');

// Pretty print credentials for easy copying
console.log('━'.repeat(60));
console.log(JSON.stringify(credentialsJSON, null, 2));
console.log('━'.repeat(60));

console.log('\n✏️  Steps to add to Vercel:');
console.log('   1. Go to: https://vercel.com/nagarjunabeharas-projects/innovation');
console.log('   2. Click Settings → Environment Variables');
console.log('   3. Click "Add New Environment Variable"');
console.log('   4. Name: GOOGLE_CREDENTIALS');
console.log('   5. Value: Paste the JSON above');
console.log('   6. Select Environment: All Environments');
console.log('   7. Click Save\n');

console.log('✅ Configuration is ready!\n');
console.log('📤 After adding environment variables to Vercel:');
console.log('   • Go to Deployments tab');
console.log('   • Click "Redeploy" on latest commit');
console.log('   • Monitor the build logs\n');
