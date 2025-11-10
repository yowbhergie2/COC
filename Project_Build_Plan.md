# CompTime Tracker - Project Build Plan

## Overview
This document outlines the complete implementation plan for the Compensatory Time Off (CTO) & Overtime Credit (COC) Management System. Follow these phases sequentially to ensure proper setup and deployment.

---

## Phase 0: Environment & Backend Setup

### 0.1 Google Cloud Project Setup
**Duration:** 30 minutes

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" or "Create a project"
   - Enter project name: `comptime-tracker`
   - Disable Google Analytics (optional)
   - Click "Create project"

2. **Enable Firestore Database**
   - In Firebase Console, navigate to "Build" → "Firestore Database"
   - Click "Create database"
   - Select "Start in production mode"
   - Choose location: `asia-southeast1` (Singapore) for optimal performance
   - Click "Enable"

3. **Get Firebase Web Config**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps" section
   - Click web icon `</>`
   - Register app name: `CompTime Web App`
   - Copy the firebaseConfig object
   - Save this configuration for later use in Code.gs

### 0.2 Google Apps Script Setup
**Duration:** 20 minutes

1. **Create Google Sheet**
   - Create new Google Sheet
   - Name it: `CompTime Tracker`
   - Go to Extensions → Apps Script

2. **Create Script Files**
   - In Apps Script editor, create file: `Code.gs`
   - Paste the complete Code.gs content
   - Create file: `Main.html`
   - Paste the complete Main.html content

3. **Update Firebase Config**
   - In Code.gs, update `FIREBASE_CONFIG` object with values from Phase 0.1.3
   - Update `FIRESTORE_PROJECT_ID` with your project ID

4. **Install FirestoreApp Library**
   - In Apps Script, click "+" next to Libraries
   - Enter Script ID: `1VUSl4b1r1eoNcRWotZM3e87ygkxvXltOgyDZhixqncz9lQ3MjfT1iKFw`
   - Select latest version
   - Click "Add"

---

## Phase 1: Authentication & Security

### 1.1 Create Service Account
**Duration:** 30 minutes

1. **Navigate to Google Cloud Console**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your Firebase project

2. **Create Service Account**
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Name: `firestore-admin`
   - Description: `Service account for CompTime backend operations`
   - Click "Create and Continue"

3. **Grant Permissions**
   - Add role: `Cloud Datastore User`
   - Add role: `Firebase Admin`
   - Click "Continue" → "Done"

4. **Generate Private Key**
   - Click on the newly created service account
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Select "JSON" format
   - Click "Create" (downloads JSON file)
   - **IMPORTANT:** Store this file securely

5. **Extract Service Account Details**
   - Open the downloaded JSON file
   - Copy `client_email` value → Update `FIRESTORE_EMAIL` in Code.gs
   - Copy `private_key` value → Update `FIRESTORE_KEY` in Code.gs
   - Copy `project_id` value → Update `FIRESTORE_PROJECT_ID` in Code.gs

### 1.2 Configure Firestore Security Rules
**Duration:** 15 minutes

1. **Get Service Account UID**
   - In Firebase Console, go to "Build" → "Authentication"
   - Enable "Email/Password" sign-in method (just toggle on, no setup needed)
   - Go to "Users" tab
   - Note: Service account UID format is `firebase-adminsdk-xxxxx@project-id.iam.gserviceaccount.com`

2. **Update firestore.rules**
   - Open the firestore.rules file
   - Replace `YOUR_SERVICE_ACCOUNT_UID_HERE` with your service account email
   - Replace `yourdomain.com` with your organization's domain

3. **Deploy Security Rules**
   - In Firebase Console, go to "Firestore Database"
   - Click "Rules" tab
   - Paste the complete firestore.rules content
   - Click "Publish"

### 1.3 Test Authentication
**Duration:** 20 minutes

1. **Deploy Apps Script**
   - In Apps Script editor, click "Deploy" → "New deployment"
   - Select type: "Web app" (for testing purposes)
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"
   - Copy the deployment URL

2. **Test Backend Connection**
   - In Google Sheet, reload the page
   - Check if "COC Admin" menu appears
   - Click "COC Admin" → "Open CompTime Tracker"
   - Modal should open and show "Loading..." for user email
   - Check browser console (F12) for any errors

3. **Verify Firebase Authentication**
   - Modal should authenticate automatically
   - User email should appear in top-right corner
   - If errors occur, check:
     - Firebase config values in Code.gs
     - Service account credentials
     - Firestore rules

---

## Phase 2: Master Data & Historical Balances

### 2.1 Initialize Firestore Collections
**Duration:** 30 minutes

1. **Create Initial Configuration Document**
   - In Firebase Console, go to Firestore Database
   - Click "Start collection"
   - Collection ID: `configuration`
   - Document ID: `accrualRules`
   - Add fields:
     ```
     regularDayMultiplier: 1.25 (number)
     restDayMultiplier: 1.30 (number)
     holidayMultiplier: 2.00 (number)
     monthlyAccrualCap: 40 (number)
     totalBalanceCap: 120 (number)
     expiryMonths: 12 (number)
     updatedAt: [current timestamp] (timestamp)
     ```

2. **Create Libraries Structure**
   - Create collection: `libraries`
   - Create document: `offices`
   - Inside `offices`, create subcollection: `items`
   - Add sample office documents with fields:
     ```
     id: "OFF_001" (string)
     name: "Main Office" (string)
     code: "MAIN" (string)
     isActive: true (boolean)
     createdAt: [current timestamp] (timestamp)
     ```
   - Repeat for `positions` document

3. **Verify Collections**
   - Confirm all collections are visible in Firestore
   - Test reading data from the modal (Configuration page)

### 2.2 Build Master Data Pages
**Duration:** 1 hour

1. **Test Libraries Page**
   - Open CompTime Tracker modal
   - Navigate to Master → Libraries
   - Add new office via UI
   - Add new position via UI
   - Verify items appear in Firestore

2. **Test Holidays Page**
   - Navigate to Master → Holidays
   - Add a holiday entry
   - Verify holiday appears in table
   - Test delete functionality

3. **Test System Configuration**
   - Navigate to Master → System Configuration
   - Modify multiplier values
   - Click "Save Configuration"
   - Verify updates in Firestore

### 2.3 Build & Test Employee Management
**Duration:** 1 hour

1. **Add Test Employees**
   - Navigate to "Employees" page
   - Click "Add Employee"
   - Fill in all required fields
   - Save and verify employee appears in table

2. **Test Employee Editing**
   - Click edit button on an employee
   - Modify information
   - Save and verify changes

3. **Verify Employee Dropdowns**
   - Navigate to COC → Log Overtime
   - Verify employee dropdown is populated
   - Check all other employee dropdowns across the app

### 2.4 Historical Balance Migration Tool
**Duration:** 45 minutes

1. **Test Migration Process**
   - Navigate to Master → Historical Balance
   - Select a test employee
   - Enter historical hours (e.g., 40.0)
   - Set "As of Date" to past date
   - Submit migration

2. **Verify Migration Results**
   - Check Firestore for new `creditBatches` document
   - Verify `isHistorical: true` flag is set
   - Check `ledger` collection for migration entry
   - Navigate to View Employee Ledger
   - Confirm historical balance appears

3. **Migrate All Existing Balances**
   - Prepare CSV/Excel with employee balances
   - Process each employee through migration tool
   - Document migration completion

---

## Phase 3: Implement Core COC Workflow

### 3.1 Overtime Logging
**Duration:** 1 hour

1. **Test logOvertime_SERVER Function**
   - Navigate to COC → Log Overtime
   - Select employee
   - Enter overtime details:
     - Date: Recent date
     - Hours: 4.0
     - Day Type: Regular
     - Overtime Type: Post-Shift
   - Submit form

2. **Verify Validations**
   - Test monthly cap (try adding >40 hours in same month)
   - Test total balance cap (try exceeding 120 hours)
   - Verify error messages display correctly

3. **Check Data Creation**
   - In Firestore, verify `overtimeLogs` document created
   - Verify `earnedHours` calculation is correct
   - Confirm `status` is "Uncertified"

### 3.2 Certificate Generation
**Duration:** 1.5 hours

1. **Test Certificate Generation**
   - Navigate to COC → Generate Certificate
   - Select employee with uncertified logs
   - Check all available logs
   - Review total selected hours
   - Click "Generate Certificate"

2. **Verify Certificate Process**
   - Check `certificates` collection for new document
   - Verify `overtimeLogs` status updated to "Certified"
   - Confirm `creditBatches` document created
   - Check expiry date is set correctly (12 months from now)
   - Verify `ledger` entry created with "Earned" type

3. **Test Edge Cases**
   - Try generating certificate with no logs selected
   - Try with already certified logs
   - Verify appropriate error messages

### 3.3 CTO Logging (Usage)
**Duration:** 1 hour

1. **Test logCto_SERVER Function**
   - Navigate to COC → Log CTO
   - Select employee with available balance
   - Note the displayed balance
   - Enter CTO date
   - Enter hours to use (less than balance)
   - Add remarks
   - Submit form

2. **Verify FIFO Deduction**
   - In Firestore, check `creditBatches`
   - Verify oldest batch was deducted first
   - Check `remainingHours` updated correctly
   - If batch depleted, verify status changed to "Depleted"

3. **Verify Ledger Entry**
   - Check `ledger` collection
   - Confirm "Used" transaction created
   - Verify `hoursChange` is negative
   - Check `balanceAfter` is correct

4. **Test Validation**
   - Try using more hours than available
   - Verify error message displays

### 3.4 Employee Ledger View
**Duration:** 30 minutes

1. **Test Ledger Display**
   - Navigate to COC → View Employee Ledger
   - Select employee
   - Verify all transactions display
   - Check balance calculation
   - Verify color coding (green for earned, red for used)

2. **Test Real-Time Updates**
   - Keep ledger open
   - In another tab, log new overtime for same employee
   - Generate certificate
   - Verify ledger updates automatically without refresh

---

## Phase 4: Reporting & Automation

### 4.1 Build Dashboard
**Duration:** 1 hour

1. **Test Dashboard Metrics**
   - Navigate to Dashboard
   - Verify all stat cards show correct values:
     - Total Liability
     - Active Employees
     - Uncertified Logs
     - Expiring Soon

2. **Test Alerts System**
   - Verify alerts display correctly
   - Create scenario with expiring credits (set past expiry date)
   - Check if warning alert appears

3. **Test Real-Time Updates**
   - Keep dashboard open
   - Perform actions (log overtime, generate cert)
   - Verify dashboard updates automatically

### 4.2 Implement Reports
**Duration:** 1.5 hours

1. **Test Liability Report**
   - Navigate to Reports page
   - Verify all employees with balances appear
   - Check calculations are correct
   - Verify earliest expiry date is accurate

2. **Test Sync to Sheet Function**
   - In Google Sheet menu, click "COC Admin" → "Sync Reports to Sheet"
   - Verify new sheet tab "COC Reports" is created
   - Check data accuracy
   - Verify formatting is correct

3. **Schedule Regular Sync** (Optional)
   - In Apps Script, go to Triggers (clock icon)
   - Add trigger for `syncReportsToSheet`
   - Event source: Time-driven
   - Type: Day timer
   - Time of day: Select preferred time
   - Save

### 4.3 Implement Automatic Forfeiture
**Duration:** 45 minutes

1. **Test dailyForfeitureTask Function**
   - Create test batch with past expiry date
   - Manually run `dailyForfeitureTask` from Apps Script
   - Check execution log
   - Verify batch status changed to "Expired"
   - Check ledger for forfeiture entry

2. **Set Up Daily Trigger**
   - In Apps Script, go to Triggers
   - Add trigger for `dailyForfeitureTask`
   - Event source: Time-driven
   - Type: Day timer
   - Time of day: 12am to 1am
   - Save trigger

3. **Monitor Trigger**
   - Check "Executions" in Apps Script
   - Verify trigger runs daily
   - Review logs for any errors

---

## Phase 5: Final Testing & Go-Live

### 5.1 User Acceptance Testing (UAT)
**Duration:** 1 week

1. **Create Test Scenarios**
   - Document 20+ test cases covering all features
   - Include happy paths and error scenarios
   - Assign test cases to HR staff

2. **Conduct UAT Sessions**
   - Schedule 3-4 testing sessions
   - Have HR staff perform actual workflows
   - Document all issues and feedback
   - Fix bugs and adjust UI based on feedback

3. **Regression Testing**
   - After fixes, re-test all features
   - Ensure no new bugs introduced
   - Get sign-off from stakeholders

### 5.2 Data Migration Validation
**Duration:** 2 days

1. **Verify All Historical Data**
   - Generate report of all migrated balances
   - Compare with old system
   - Resolve any discrepancies

2. **Audit Trail Check**
   - Review ledger entries for completeness
   - Verify all transactions have proper references
   - Check date/time stamps are correct

### 5.3 Training & Documentation
**Duration:** 3 days

1. **Create User Guide**
   - Document all features with screenshots
   - Include step-by-step workflows
   - Add troubleshooting section

2. **Conduct Training Sessions**
   - Schedule 2-hour training for HR staff
   - Demonstrate all features
   - Answer questions
   - Provide hands-on practice time

3. **Create Quick Reference**
   - One-page cheat sheet for common tasks
   - Distribute to all HR staff

### 5.4 Go-Live Preparation
**Duration:** 2 days

1. **Final Pre-Launch Checklist**
   - [ ] All test scenarios passed
   - [ ] Historical data migrated and verified
   - [ ] All triggers configured
   - [ ] Security rules deployed
   - [ ] Training completed
   - [ ] User guide distributed
   - [ ] Backup plan documented

2. **Soft Launch**
   - Enable system for limited group (3-5 employees)
   - Monitor for 1 week
   - Gather feedback
   - Make minor adjustments

3. **Full Launch**
   - Announce system launch to organization
   - Disable old system (keep read-only for 3 months)
   - Monitor system closely for first month
   - Schedule follow-up training after 2 weeks

### 5.5 Post-Launch Support
**Duration:** Ongoing

1. **Week 1-2: Intensive Monitoring**
   - Check system daily
   - Respond to issues within 4 hours
   - Collect feedback

2. **Month 1: Regular Check-ins**
   - Weekly meetings with HR staff
   - Review system usage metrics
   - Address any concerns

3. **Ongoing Maintenance**
   - Monthly review of system performance
   - Quarterly updates based on feedback
   - Annual policy review and system adjustments

---

## Success Criteria

### Technical
- [ ] All CRUD operations working
- [ ] Real-time updates functioning
- [ ] Security rules enforced
- [ ] Triggers running successfully
- [ ] No data loss or corruption

### Business
- [ ] 100% of historical balances migrated
- [ ] 100% of employees onboarded
- [ ] Daily overtime logging operational
- [ ] Certificate generation working
- [ ] CTO usage tracking accurate

### User Satisfaction
- [ ] 90%+ of HR staff comfortable using system
- [ ] <5 support tickets per week after month 1
- [ ] Positive feedback from management
- [ ] Time saved vs. spreadsheet method: 50%+

---

## Risk Mitigation

### Risk 1: Data Loss
**Mitigation:**
- Daily Firestore backups (automatic)
- Export to Sheet weekly via syncReportsToSheet
- Keep old system read-only for 3 months

### Risk 2: Authentication Issues
**Mitigation:**
- Test authentication with multiple users before launch
- Document troubleshooting steps
- Have IT support contact ready

### Risk 3: User Adoption Resistance
**Mitigation:**
- Involve HR staff in UAT phase
- Provide comprehensive training
- Offer ongoing support
- Highlight benefits over old system

### Risk 4: System Downtime
**Mitigation:**
- Use Google's 99.95% uptime SLA
- Have manual backup process documented
- Schedule maintenance during off-hours

---

## Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 0 | 1 day | Environment setup complete |
| Phase 1 | 1 day | Authentication working |
| Phase 2 | 2 days | Master data loaded, employees added |
| Phase 3 | 3 days | Core COC workflow operational |
| Phase 4 | 2 days | Reporting and automation complete |
| Phase 5 | 2 weeks | UAT, training, go-live |
| **Total** | **3-4 weeks** | **Full system operational** |

---

## Next Steps

1. **Immediate (Day 1):** Complete Phase 0 and Phase 1
2. **This Week:** Complete Phase 2 and start Phase 3
3. **Next Week:** Complete Phase 3 and Phase 4
4. **Week 3-4:** Phase 5 (UAT and go-live)

---

*Document Version: 1.0*  
*Last Updated: November 2025*  
*Next Review: After Go-Live*
