# CompTime Tracker - Google Apps Script Application

**Version:** 2.0  
**Architecture:** Hybrid Firebase-Google Sheets Modal SPA

---

## Quick Start

### 1. Setup Firebase
Follow **Firebase_Setup_Guide.md** for complete beginner-friendly setup instructions.

### 2. Deploy Files
- Copy **Code.gs** → Google Apps Script backend
- Copy **Main.html** → Apps Script HTML file
- Deploy **firestore.rules** → Firebase Console

### 3. Configure
Update these values in **Code.gs**:
- `FIRESTORE_PROJECT_ID`
- `FIRESTORE_EMAIL`
- `FIRESTORE_KEY`
- `FIREBASE_CONFIG`

**Note:** The firestore.rules file is pre-configured for authorized users:
- ad.dpwhro2@gmail.com
- dpwh.hrms@gmail.com

To add more users, edit the `isStaff()` function in firestore.rules.

### 4. Build
Follow **Project_Build_Plan.md** for complete implementation phases (Phase 0-5).

---

## Files

| File | Purpose |
|------|---------|
| **Code.gs** | Google Apps Script backend with secure server-side functions |
| **Main.html** | Bootstrap 5 modal SPA with Firebase SDK |
| **firestore.rules** | Firestore security rules (hybrid model) |
| **Firebase_Setup_Guide.md** | Step-by-step Firebase setup for beginners |
| **Project_Build_Plan.md** | Complete implementation roadmap |

---

## Architecture

**Frontend:** HTML Modal (Bootstrap 5) with Firebase SDK v9+ for real-time reads  
**Backend:** Google Apps Script with FirestoreApp for secure writes  
**Database:** Google Firestore with v2.0 schema  
**Security:** Client-read, server-write hybrid model

---

## Key Features

- **F1:** HR Workbench (Employees, Overtime, Certificates, CTO, Ledger)
- **F2:** Policy Engine (Holidays, Accrual Rules, 40/120 Caps, Auto-Expiration)
- **F3:** Reporting (Liability, Audit Trail, Dashboard)
- **F4:** Alerts & Real-time Updates

---

## Support

Refer to **Firebase_Setup_Guide.md** (Appendix) for troubleshooting and FAQs.

---

*Source of Truth: CompTime_Vision_Doc_v2.md*
