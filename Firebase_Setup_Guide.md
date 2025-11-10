# Firebase Database Setup Guide for Beginners

## Introduction

This guide will walk you through setting up a Firebase Firestore database from scratch and connecting it to your Google Sheets CompTime Tracker application. No prior Firebase experience is required.

---

## What is Firebase?

**Firebase** is Google's platform for building web and mobile applications. We're using **Firestore**, which is Firebase's flexible, scalable NoSQL database. Think of it as a secure, cloud-based storage system for your CompTime data that multiple users can access simultaneously.

---

## Part 1: Creating Your Firebase Project

### Step 1.1: Access Firebase Console

1. Open your web browser and go to: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Sign in with your Google account (use your organization's Google account)
3. You'll see the Firebase welcome screen

### Step 1.2: Create New Project

1. Click the **"Add project"** or **"Create a project"** button
2. Enter your project name:
   - Type: `CompTime Tracker` (or your preferred name)
   - Note: Firebase will generate a unique project ID below your name
   - Click **"Continue"**

3. Google Analytics Setup:
   - You'll see "Enable Google Analytics for this project?"
   - Toggle it **OFF** (not needed for this application)
   - Click **"Create project"**

4. Wait for project creation:
   - This takes about 30 seconds
   - You'll see a progress indicator
   - When complete, click **"Continue"**

5. You're now in your Firebase project dashboard!

---

## Part 2: Setting Up Firestore Database

### Step 2.1: Create Firestore Database

1. In the left sidebar, look for **"Build"** section
2. Click on **"Firestore Database"**
3. Click the **"Create database"** button in the center of the screen

### Step 2.2: Configure Database Security

1. A dialog appears: "Secure rules for Cloud Firestore"
2. Select **"Start in production mode"** (we'll add custom rules later)
3. Click **"Next"**

### Step 2.3: Choose Database Location

1. You'll see "Set Cloud Firestore location"
2. From the dropdown, select a location close to you:
   - **Recommended for Asia/Pacific:** `asia-southeast1 (Singapore)`
   - **Recommended for Americas:** `us-central1 (Iowa)`
   - **Recommended for Europe:** `europe-west1 (Belgium)`
3. **IMPORTANT:** This cannot be changed later!
4. Click **"Enable"**
5. Wait 1-2 minutes for database creation

### Step 2.4: Verify Database is Ready

1. You should now see the Firestore Database console
2. You'll see tabs: "Data", "Rules", "Indexes", "Usage"
3. The "Data" tab will be empty (this is normal)

---

## Part 3: Getting Your Firebase Configuration

### Step 3.1: Register Web App

1. Go back to **Project Overview** (home icon in left sidebar)
2. In the center of the screen, you'll see "Get started by adding Firebase to your app"
3. Click the **`</>`** icon (Web platform)

### Step 3.2: Register App

1. Enter app nickname: `CompTime Web App`
2. **DO NOT** check "Also set up Firebase Hosting"
3. Click **"Register app"**

### Step 3.3: Copy Configuration

1. You'll see "Add Firebase SDK" screen with code
2. Look for the `firebaseConfig` object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

3. **COPY THIS ENTIRE OBJECT** to a notepad file
4. You'll need these values in a moment
5. Click **"Continue to console"**

---

## Part 4: Creating Service Account (Backend Access)

### Step 4.1: Access Google Cloud Console

1. In your Firebase console, click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Go to the **"Service accounts"** tab
4. Click **"Manage service account permissions"**
5. This opens Google Cloud Console in a new tab

### Step 4.2: Create Service Account

1. In Google Cloud Console, you should be on "IAM & Admin" → "Service Accounts"
2. If not, use the left menu to navigate there
3. Click **"+ CREATE SERVICE ACCOUNT"** at the top

### Step 4.3: Service Account Details

1. Fill in the form:
   - **Service account name:** `firestore-admin`
   - **Service account ID:** (auto-filled as `firestore-admin`)
   - **Description:** `Backend service account for CompTime Tracker`
2. Click **"CREATE AND CONTINUE"**

### Step 4.4: Grant Permissions

1. You'll see "Grant this service account access to project"
2. Click the **"Select a role"** dropdown
3. Type: `Cloud Datastore User`
4. Select **"Cloud Datastore User"** from the list
5. Click **"+ ADD ANOTHER ROLE"**
6. Search for and select: **"Firebase Admin SDK Administrator Service Agent"**
7. Click **"CONTINUE"**
8. Skip the next step (Grant users access) by clicking **"DONE"**

### Step 4.5: Generate Private Key

1. You should now see your service account in the list
2. Click on the **email address** of the service account (looks like `firestore-admin@your-project.iam.gserviceaccount.com`)
3. Click the **"KEYS"** tab at the top
4. Click **"ADD KEY"** → **"Create new key"**
5. Select **"JSON"** format
6. Click **"CREATE"**

### Step 4.6: Save the JSON Key File

1. A JSON file will automatically download to your computer
2. **VERY IMPORTANT:** This file contains sensitive credentials
3. Save it in a secure location
4. Never share this file or commit it to public repositories
5. Open the JSON file with a text editor (Notepad, TextEdit, etc.)

### Step 4.7: Extract Service Account Information

From the JSON file, you'll need three values:

1. **client_email:** (looks like `firestore-admin@your-project.iam.gserviceaccount.com`)
2. **private_key:** (long text starting with `-----BEGIN PRIVATE KEY-----`)
3. **project_id:** (your project ID)

Keep this file open - you'll need it in the next part.

---

## Part 5: Connecting Firebase to Google Sheets

### Step 5.1: Open Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new blank spreadsheet
3. Name it: `CompTime Tracker`

### Step 5.2: Open Apps Script Editor

1. In your Google Sheet, click **"Extensions"** in the top menu
2. Click **"Apps Script"**
3. A new tab opens with the Apps Script editor
4. You'll see a default `Code.gs` file with a sample function
5. Delete all the default code

### Step 5.3: Create Code.gs File

1. Copy the entire **Code.gs** file provided to you
2. Paste it into the Apps Script editor
3. Don't save yet - we need to update configuration first

### Step 5.4: Update Firebase Configuration in Code.gs

At the top of Code.gs, you'll see three constants that need updating:

**A) Update FIRESTORE_PROJECT_ID:**
```javascript
const FIRESTORE_PROJECT_ID = 'your-firebase-project-id';
```
Replace `'your-firebase-project-id'` with the `project_id` from your JSON file.

**B) Update FIRESTORE_EMAIL:**
```javascript
const FIRESTORE_EMAIL = 'your-service-account@your-project.iam.gserviceaccount.com';
```
Replace with the `client_email` from your JSON file.

**C) Update FIRESTORE_KEY:**
```javascript
const FIRESTORE_KEY = '-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n';
```
Replace with the complete `private_key` from your JSON file (including the BEGIN and END lines).

**D) Update FIREBASE_CONFIG Object:**

Find the `FIREBASE_CONFIG` constant and replace it with the values you copied from Firebase Console (Part 3.3):

```javascript
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY_HERE",           // From firebaseConfig
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-firebase-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Step 5.5: Install FirestoreApp Library

1. In the Apps Script editor, look at the left sidebar
2. Click the **"+"** icon next to **"Libraries"**
3. In the "Script ID" field, paste: `1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw`
4. Click **"Look up"**
5. You'll see "FirestoreApp" appear
6. In the "Version" dropdown, select the **highest number** (latest version)
7. Click **"Add"**
8. You should now see "FirestoreApp" in your Libraries list

### Step 5.6: Create Main.html File

1. In the Apps Script editor, click the **"+"** icon next to **"Files"**
2. Select **"HTML"**
3. Name it: `Main`
4. Click **"Create"**
5. Delete any default content
6. Copy the entire **Main.html** file provided to you
7. Paste it into the Main.html file

### Step 5.7: Save Your Project

1. Click the **disk icon** or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
2. Give your project a name: `CompTime Tracker Backend`
3. Click **"Save"**

---

## Part 6: Deploying Security Rules

### Step 6.1: Prepare firestore.rules File

1. Open the **firestore.rules** file provided to you
2. You need to make two updates:

**A) Update Service Account UID:**

Find this line:
```
request.auth.uid == 'YOUR_SERVICE_ACCOUNT_UID_HERE'
```

Replace with your service account email from the JSON file:
```
request.auth.uid == 'firestore-admin@your-project.iam.gserviceaccount.com'
```

**B) Update Authorized Emails:**

Find this section:
```
function isStaff() {
  return isAuthenticated() && request.auth.token.email.matches('.*@yourdomain\\.com$');
}
```

Replace with your specific authorized Gmail accounts:
```
function isStaff() {
  return isAuthenticated() && 
         (request.auth.token.email == 'ad.dpwhro2@gmail.com' ||
          request.auth.token.email == 'dpwh.hrms@gmail.com');
}
```

**Note:** The firestore.rules file provided already has this update. If you need to add more users later, just add another line like:
```
request.auth.token.email == 'newuser@gmail.com' ||
```

### Step 6.2: Deploy Rules to Firebase

1. Go back to your Firebase Console
2. Click **"Firestore Database"** in the left sidebar
3. Click the **"Rules"** tab at the top
4. You'll see the default rules in an editor
5. **Select all** the existing rules and **delete** them
6. Copy your updated **firestore.rules** content
7. Paste it into the rules editor
8. Click **"Publish"** button
9. Confirm when asked "Are you sure?"
10. You should see "Rules deployed successfully"

---

## Part 7: Initial Database Setup

### Step 7.1: Create Configuration Collection

We need to manually create one configuration document:

1. In Firebase Console, go to **"Firestore Database"** → **"Data"** tab
2. Click **"Start collection"**
3. Enter Collection ID: `configuration`
4. Click **"Next"**

### Step 7.2: Create accrualRules Document

1. Document ID: Type `accrualRules`
2. Click **"Add field"** and add these fields one by one:

| Field Name | Type | Value |
|------------|------|-------|
| regularDayMultiplier | number | 1.0 |
| restDayMultiplier | number | 1.5 |
| holidayMultiplier | number | 1.5 |
| monthlyAccrualCap | number | 40 |
| totalBalanceCap | number | 120 |
| expiryMonths | number | 12 |
| updatedAt | timestamp | (click "Set value to current timestamp") |

3. Click **"Save"**
4. You should now see your configuration document

### Step 7.3: Test the Connection

1. Go back to your Google Sheet
2. **Refresh the page** (press F5 or reload)
3. You should see a new menu: **"COC Admin"**
4. Click **"COC Admin"** → **"Open CompTime Tracker"**
5. A large modal should open
6. Wait a few seconds - you should see your email appear in the top-right corner
7. If you see your email, **SUCCESS!** Your Firebase is connected!

### Step 7.4: Troubleshooting Connection Issues

**If the modal doesn't open:**
- Check that you saved both Code.gs and Main.html
- Try refreshing the Google Sheet again
- Check Apps Script execution logs (View → Logs in Apps Script editor)

**If authentication fails:**
- Verify all configuration values are correct in Code.gs
- Check that service account credentials are properly formatted
- Review the browser console (F12) for error messages

**If you see "Permission denied" errors:**
- Verify firestore.rules were deployed successfully
- Check that your email domain matches the rule
- Confirm service account email is correct in rules

---

## Part 8: Next Steps

### Congratulations! Your Firebase database is now connected to your Google Sheets application.

**What you've accomplished:**
✅ Created Firebase project
✅ Set up Firestore database
✅ Generated service account credentials
✅ Connected Google Sheets to Firebase
✅ Deployed security rules
✅ Created initial configuration

**Next steps:**
1. Follow the **Project_Build_Plan.md** to continue setup
2. Add master data (offices, positions)
3. Add employees
4. Start using the system

---

## Appendix: Common Questions

### Q: Is my data secure?
**A:** Yes! Firebase uses bank-level security with:
- Encrypted data transmission (HTTPS)
- Encrypted data storage
- Security rules preventing unauthorized access
- Service account authentication for backend operations

### Q: What if I lose my service account JSON file?
**A:** You can generate a new key:
1. Go to Google Cloud Console → Service Accounts
2. Click on your service account
3. Go to Keys tab
4. Delete the old key (optional)
5. Create a new key
6. Update Code.gs with new credentials

### Q: Can multiple users access this simultaneously?
**A:** Yes! That's the power of Firebase. Multiple HR staff can use the system at the same time without conflicts.

### Q: How much does Firebase cost?
**A:** Firebase has a generous free tier:
- Firestore: 50,000 reads/day free
- Storage: 1GB free
- For typical CompTime usage: FREE

If you exceed free limits, costs are minimal (typically <$5/month).

### Q: How do I backup my data?
**A:** Two methods:
1. **Automatic:** Firebase creates daily backups (available in Google Cloud Console)
2. **Manual:** Use the "Sync Reports to Sheet" function in COC Admin menu

### Q: Can I test without affecting production data?
**A:** Yes! Create a separate Firebase project for testing:
1. Create new Firebase project: "CompTime Tracker - TEST"
2. Use a copy of your Google Sheet for testing
3. Update Code.gs with test project credentials

### Q: How do I add more authorized users?
**A:** Edit the firestore.rules file:
1. Go to Firebase Console → Firestore Database → Rules tab
2. Find the `isStaff()` function
3. Add a new line with the user's email:
```
request.auth.token.email == 'newuser@gmail.com' ||
```
4. Make sure to keep the `||` (OR operator) between emails
5. Click "Publish" to deploy the updated rules

---

## Support Resources

### Firebase Documentation
- Official Guide: [https://firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore)
- Security Rules: [https://firebase.google.com/docs/rules](https://firebase.google.com/docs/rules)

### Google Apps Script
- Documentation: [https://developers.google.com/apps-script](https://developers.google.com/apps-script)
- FirestoreApp Library: [https://github.com/grahamearley/FirestoreGoogleAppsScript](https://github.com/grahamearley/FirestoreGoogleAppsScript)

### Community Help
- Stack Overflow: Tag questions with `firebase` and `google-apps-script`
- Firebase Community: [https://firebase.google.com/community](https://firebase.google.com/community)

---

*Setup Guide Version: 1.0*  
*Last Updated: November 2025*  
*For: CompTime Tracker v2.0*
