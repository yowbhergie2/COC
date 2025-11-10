// ============================
// FIREBASE CONFIGURATION
// ============================

const FIRESTORE_PROJECT_ID = 'comptime-tracker-97857';
const FIRESTORE_EMAIL = 'firestore-admin@comptime-tracker-97857.iam.gserviceaccount.com';
const FIRESTORE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/Z9yW+t8TR9Va\nqOKiuafWHsXwtAW+o3cxpzejfZpIgGtAWMm7ZolxwhiBAjc2nShL6G2B/N2tOiov\nCuwA5h+5UcihV97EdmtFiryUjbwU3fVQ8Sfyl3RNZLsyyJ0Q30RXwjV0AI9v1uCQ\nOb6Dg3U4r32Y4IZDgVdc14yD+TYf3mEzzsNIzOhKQlO2wlo5h30zaGu5K2H/5RqF\nQPoKjFReFf71WaaZjoHW4dRnOOAoqkz2zun96qRpjwOGrjo+yvBihrg5CJ9c8pAf\nVqWkII1YICG4JB34HMjXLkzIctcVfSZCUMXc3c98oal/Df6yX0TyDyCoRYsoxo8U\nxaCMaVp7AgMBAAECggEAJKkXgqGFZZN+JXGwivtlTqkxP3Ozn/p+Q3fkO7+8c8OJ\nB1eaN/chPzUubVNH0QGT7MoVY27T5LB90OnWHyv0ipHEDEcgx19pF3ZFvWxSSGrk\n6D5waNIieAphoo3zK36f//EWPOQ4lPLCq00sFNNyect/Em96t+ZHneQ5KTPr7nlb\n5F+tMtiYV8ife0/UpUEjdU7JpNGNqo9PFyd8qAG5FiIHs6OqAvzCmc/0h+mKYCh3\nBIme2L3w63ZVMd1yn6/gWyzEVBbAU4q4rYkH/anARkJMlk5Ep24Mhrrx63BfhviU\n1jTZg48R67Q7s0Q8kd3O3JppBvYaZPhrGfTO9G1p2QKBgQDxpZi9pRoa2uYJnhop\nittwl+ohqj+6C+tKlsaFs9TG5hhTo4vTLkdsMe2wEq1ewnK8qMzKSlqGW/TcC9jQ\nfSirh1FeT3nWn23WNe8TBtVQNfNpgFOIy7lyP/wwXR0BSNZ1zYSCMK1JUMUMNwX+\n/97ZS1YbhCUcJ++w+b+aa0XRswKBgQDKxlCAqvkmH02e2KnSlMFYyAeQifnZ0JzP\nmyKhTFa35u8KJlite4QnUyQAHNN921hS2KgLXGGn4Uzthnc42RZc5nF0ClmommDG\n1iXnAzB2WYDHLNXa/+TFl2E/3fSqwAj2nfsA8bZPuRmDizDsZFUmNdg9vPBYwGWj\nAVvtPligGQKBgF5FKww4/7EgWoPAARbZy/fl2/ocL9ZF1hn4LiR03nplw3HFqMPP\nFx/3bnG1J5uDIj3FYHc+gIhQEXtSx9e2LAqWtMClIrP+6FucGNOEY+1xzq8G2A/S\n4lrW6Wx4ttsMblXwwlQD52ZlsymrwZQUf/ynbkU3zT5puhGBrSTx2oAPAoGAXj9w\n2W0eYq64CDXSMRN9DoPiqDbJT4kb6Y7EuM3fnJiU0FXkb7XyRcjp+bdsQZo64j7b\nVHR622nntJsEPQMB1uoxH2tUIv6mLqUIduhPlSKirXDUcXbw4TosNGA4wUiCogXp\nzZWLVGDHUBHZCnbT8O+j84Ym/ElotCwEiy+oR7kCgYEAmHXhgodnywFht3HeQ/WG\nXggb1aImYa1i0tvSL7RRRbCwNGWT5nyxaXvvR7UYgydX15xDE6sMDKwt2VhucKUt\nI95K0Bc5aX/OjMLwwuUBpLKoS5hE4kPk3m5nhRNZB1sLBzdWC5n0+urP4TgOj4nD\n/p23eqMuKHrA+ijlvuI7qBI=\n-----END PRIVATE KEY-----\n';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBCxM58B1TRg6HBo9ZNqWtMziliX2N5YZA",
  authDomain: "comptime-tracker-97857.firebaseapp.com",
  projectId: "comptime-tracker-97857",
  storageBucket: "comptime-tracker-97857.firebasestorage.app",
  messagingSenderId: "119022135793",
  appId: "1:119022135793:web:c3f931343d01645c747c50"
};

// ============================
// JWT TOKEN CREATION
// ============================

function createJWT() {
  const now = Math.floor(Date.now() / 1000);
  const userEmail = Session.getActiveUser().getEmail();
  
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };
  
  const payload = {
    iss: FIRESTORE_EMAIL,
    sub: FIRESTORE_EMAIL,
    aud: 'https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit',
    iat: now,
    exp: now + 3600,
    uid: FIRESTORE_EMAIL,
    claims: {
      email: userEmail
    }
  };
  
  const encodedHeader = Utilities.base64EncodeWebSafe(JSON.stringify(header)).replace(/=+$/, '');
  const encodedPayload = Utilities.base64EncodeWebSafe(JSON.stringify(payload)).replace(/=+$/, '');
  
  const signatureInput = encodedHeader + '.' + encodedPayload;
  
  const signature = Utilities.computeRsaSha256Signature(signatureInput, FIRESTORE_KEY);
  const encodedSignature = Utilities.base64EncodeWebSafe(signature).replace(/=+$/, '');
  
  return signatureInput + '.' + encodedSignature;
}

// ============================
// MENU & UI
// ============================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('COC Admin')
    .addItem('Open CompTime Tracker', 'showAppModal')
    .addSeparator()
    .addItem('Initialize Libraries (One-time)', 'initializeLibraries')
    .addItem('Sync Reports to Sheet', 'syncReportsToSheet')
    .addToUi();
}

function initializeLibraries() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Initialize Libraries',
    'This will create:\n• 9 Offices\n• 45 Positions\n\n⏱️ Expected time: 30-60 seconds\n⚠️ Run this only ONCE\n\nContinue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response == ui.Button.YES) {
    const startTime = new Date();
    const result = initializeLibraries_SERVER();
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000);
    
    if (result.success) {
      ui.alert(
        '✓ Libraries Initialized Successfully!',
        `Offices created: ${result.officesCreated}\nPositions created: ${result.positionsCreated}\n\nCompleted in ${duration} seconds.\n\nYou can now view them in:\nCompTime Tracker → Master → Libraries`,
        ui.ButtonSet.OK
      );
    } else {
      ui.alert('✗ Error', result.error, ui.ButtonSet.OK);
    }
  }
}

function showAppModal() {
  const html = HtmlService.createHtmlOutputFromFile('Main')
    .setWidth(1400)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, 'CompTime Tracker');
}

// ============================
// CLIENT-SIDE CONFIG & TOKEN
// ============================

function getFirebaseConfigAndToken() {
  try {
    const customToken = createJWT();
    const userEmail = Session.getActiveUser().getEmail();
    
    return {
      config: FIREBASE_CONFIG,
      token: customToken,
      userEmail: userEmail
    };
  } catch (error) {
    throw new Error('Failed to create authentication token: ' + error.toString());
  }
}

// ============================
// FIRESTORE INITIALIZATION
// ============================

function getFirestore() {
  return FirestoreApp.getFirestore(FIRESTORE_EMAIL, FIRESTORE_KEY, FIRESTORE_PROJECT_ID);
}

// ============================
// SERVER-SIDE FUNCTIONS
// ============================

function logOvertime_SERVER(data) {
  try {
    const db = getFirestore();
    
    const configDoc = db.getDocument('configuration/accrualRules');
    const config = configDoc.obj;
    
    const multiplierMap = {
      'Regular': config.regularDayMultiplier || 1.25,
      'RestDay': config.restDayMultiplier || 1.30,
      'Holiday': config.holidayMultiplier || 2.00
    };
    
    const multiplier = multiplierMap[data.dayType] || 1.25;
    const earnedHours = parseFloat(data.hoursWorked) * multiplier;
    
    const overtimeDate = new Date(data.overtimeDate);
    const month = overtimeDate.getMonth();
    const year = overtimeDate.getFullYear();
    
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    
    const monthLogsQuery = db.query('overtimeLogs')
      .where('employeeId', '==', data.employeeId)
      .where('overtimeDate', '>=', monthStart.toISOString())
      .where('overtimeDate', '<=', monthEnd.toISOString())
      .where('status', '==', 'Uncertified')
      .execute();
    
    let monthTotal = earnedHours;
    monthLogsQuery.forEach(doc => {
      monthTotal += doc.obj.earnedHours;
    });
    
    const monthlyAccrualCap = config.monthlyAccrualCap || 40;
    if (monthTotal > monthlyAccrualCap) {
      return {
        success: false,
        error: `Monthly accrual cap exceeded. Current month total: ${monthTotal.toFixed(2)} hours. Cap: ${monthlyAccrualCap} hours.`
      };
    }
    
    const batchesQuery = db.query('creditBatches')
      .where('employeeId', '==', data.employeeId)
      .where('status', '==', 'Active')
      .execute();
    
    let currentBalance = 0;
    batchesQuery.forEach(doc => {
      currentBalance += doc.obj.remainingHours;
    });
    
    const totalBalanceCap = config.totalBalanceCap || 120;
    if (currentBalance + earnedHours > totalBalanceCap) {
      return {
        success: false,
        error: `Total balance cap exceeded. Current balance: ${currentBalance.toFixed(2)} hours. Cap: ${totalBalanceCap} hours.`
      };
    }
    
    const logId = 'LOG_' + Utilities.getUuid();
    
    const logData = {
      logId: logId,
      employeeId: data.employeeId,
      overtimeDate: data.overtimeDate,
      hoursWorked: parseFloat(data.hoursWorked),
      dayType: data.dayType,
      multiplier: multiplier,
      earnedHours: earnedHours,
      overtimeType: data.overtimeType,
      status: 'Uncertified',
      remarks: data.remarks || '',
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('overtimeLogs/' + logId, logData);
    
    return {
      success: true,
      logId: logId,
      earnedHours: earnedHours
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function generateCertificate_SERVER(data) {
  try {
    const db = getFirestore();
    
    if (!data.selectedLogIds || data.selectedLogIds.length === 0) {
      return {
        success: false,
        error: 'No overtime logs selected'
      };
    }
    
    let totalEarnedHours = 0;
    const logs = [];
    
    data.selectedLogIds.forEach(logId => {
      const logDoc = db.getDocument('overtimeLogs/' + logId);
      if (logDoc && logDoc.obj.status === 'Uncertified' && logDoc.obj.employeeId === data.employeeId) {
        logs.push(logDoc.obj);
        totalEarnedHours += logDoc.obj.earnedHours;
      }
    });
    
    if (logs.length === 0) {
      return {
        success: false,
        error: 'No valid uncertified logs found'
      };
    }
    
    const certificateId = 'CERT_' + Utilities.getUuid();
    const batchId = 'BATCH_' + Utilities.getUuid();
    const ledgerId = 'LEDGER_' + Utilities.getUuid();
    
    const configDoc = db.getDocument('configuration/accrualRules');
    const expiryMonths = configDoc.obj.expiryMonths || 12;
    
    const issueDate = new Date();
    const expiryDate = new Date(issueDate);
    expiryDate.setMonth(expiryDate.getMonth() + expiryMonths);
    
    const certData = {
      certificateId: certificateId,
      employeeId: data.employeeId,
      totalEarnedHours: totalEarnedHours,
      issueDate: issueDate.toISOString(),
      logIds: data.selectedLogIds,
      createdAt: issueDate.toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('certificates/' + certificateId, certData);
    
    data.selectedLogIds.forEach(logId => {
      db.updateDocument('overtimeLogs/' + logId, {
        status: 'Certified',
        certificateId: certificateId,
        certifiedAt: issueDate.toISOString(),
        certifiedBy: Session.getActiveUser().getEmail()
      });
    });
    
    const batchData = {
      batchId: batchId,
      employeeId: data.employeeId,
      certificateId: certificateId,
      earnedHours: totalEarnedHours,
      remainingHours: totalEarnedHours,
      issueDate: issueDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: 'Active',
      isHistorical: false,
      createdAt: issueDate.toISOString()
    };
    
    db.createDocument('creditBatches/' + batchId, batchData);
    
    const batchesQuery = db.query('creditBatches')
      .where('employeeId', '==', data.employeeId)
      .where('status', '==', 'Active')
      .execute();
    
    let balanceAfter = 0;
    batchesQuery.forEach(doc => {
      balanceAfter += doc.obj.remainingHours;
    });
    
    const ledgerData = {
      ledgerId: ledgerId,
      employeeId: data.employeeId,
      transactionDate: issueDate.toISOString(),
      transactionType: 'Earned',
      referenceId: certificateId,
      hoursChange: totalEarnedHours,
      balanceAfter: balanceAfter,
      remarks: `Certificate ${certificateId} issued`,
      createdAt: issueDate.toISOString()
    };
    
    db.createDocument('ledger/' + ledgerId, ledgerData);
    
    return {
      success: true,
      certificateId: certificateId,
      totalEarnedHours: totalEarnedHours
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function logCto_SERVER(data) {
  try {
    const db = getFirestore();
    
    const hoursUsed = parseFloat(data.hoursUsed);
    
    const batchesQuery = db.query('creditBatches')
      .where('employeeId', '==', data.employeeId)
      .where('status', '==', 'Active')
      .orderBy('expiryDate', 'asc')
      .execute();
    
    let availableBalance = 0;
    const batches = [];
    batchesQuery.forEach(doc => {
      batches.push({id: doc.name.split('/').pop(), data: doc.obj});
      availableBalance += doc.obj.remainingHours;
    });
    
    if (hoursUsed > availableBalance) {
      return {
        success: false,
        error: `Insufficient balance. Available: ${availableBalance.toFixed(2)} hours, Requested: ${hoursUsed.toFixed(2)} hours`
      };
    }
    
    let remainingToUse = hoursUsed;
    const usedBatches = [];
    
    for (let i = 0; i < batches.length && remainingToUse > 0; i++) {
      const batch = batches[i];
      const available = batch.data.remainingHours;
      const toUse = Math.min(available, remainingToUse);
      
      usedBatches.push({
        batchId: batch.id,
        hoursUsed: toUse,
        newRemaining: available - toUse
      });
      
      remainingToUse -= toUse;
    }
    
    const ctoId = 'CTO_' + Utilities.getUuid();
    const ctoDate = new Date(data.ctoDate);
    
    usedBatches.forEach(usage => {
      const newStatus = usage.newRemaining === 0 ? 'Depleted' : 'Active';
      
      db.updateDocument('creditBatches/' + usage.batchId, {
        remainingHours: usage.newRemaining,
        status: newStatus,
        lastUsedDate: ctoDate.toISOString(),
        lastUsedBy: Session.getActiveUser().getEmail()
      });
    });
    
    const newBalance = availableBalance - hoursUsed;
    
    const ledgerId = 'LEDGER_' + Utilities.getUuid();
    const ledgerData = {
      ledgerId: ledgerId,
      employeeId: data.employeeId,
      transactionDate: ctoDate.toISOString(),
      transactionType: 'Used',
      referenceId: ctoId,
      hoursChange: -hoursUsed,
      balanceAfter: newBalance,
      remarks: data.remarks || `CTO on ${ctoDate.toISOString().split('T')[0]}`,
      createdAt: new Date().toISOString()
    };
    
    db.createDocument('ledger/' + ledgerId, ledgerData);
    
    return {
      success: true,
      ctoId: ctoId,
      hoursUsed: hoursUsed,
      newBalance: newBalance
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addEmployee_SERVER(data) {
  try {
    const db = getFirestore();
    
    const allEmployees = db.getDocuments('employees');
    const count = allEmployees.length;
    const nextNumber = count + 1;
    const employeeId = 'EMP_' + String(nextNumber).padStart(3, '0');
    
    const employeeData = {
      employeeId: employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      suffix: data.suffix || '',
      office: data.office,
      position: data.position,
      isActive: data.isActive !== false,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('employees/' + employeeId, employeeData);
    
    return {
      success: true,
      employeeId: employeeId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateEmployee_SERVER(employeeId, data) {
  try {
    const db = getFirestore();
    
    const updateData = {
      employeeId: employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName || '',
      suffix: data.suffix || '',
      office: data.office,
      position: data.position,
      isActive: data.isActive !== false,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument('employees/' + employeeId, updateData);
    
    return {
      success: true,
      employeeId: employeeId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addHoliday_SERVER(data) {
  try {
    const db = getFirestore();
    
    const holidayId = 'HOL_' + Utilities.getUuid();
    
    const holidayData = {
      holidayId: holidayId,
      date: data.date,
      name: data.name,
      type: data.type,
      isRecurring: data.isRecurring || false,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('holidays/' + holidayId, holidayData);
    
    return {
      success: true,
      holidayId: holidayId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteHoliday_SERVER(holidayId) {
  try {
    const db = getFirestore();
    db.deleteDocument('holidays/' + holidayId);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function addLibraryItem_SERVER(libraryType, data) {
  try {
    const db = getFirestore();
    
    const itemId = Utilities.getUuid();
    const path = `libraries/${libraryType}/items/${itemId}`;
    
    const itemData = {
      id: itemId,
      name: data.name,
      createdAt: new Date().toISOString(),
      createdBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument(path, itemData);
    
    return {
      success: true,
      itemId: itemId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateLibraryItem_SERVER(libraryType, itemId, data) {
  try {
    const db = getFirestore();
    
    const path = `libraries/${libraryType}/items/${itemId}`;
    
    const updateData = {
      name: data.name,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument(path, updateData);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteLibraryItem_SERVER(libraryType, itemId) {
  try {
    const db = getFirestore();
    
    const path = `libraries/${libraryType}/items/${itemId}`;
    db.deleteDocument(path);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function initializeLibraries_SERVER() {
  try {
    const db = getFirestore();
    
    const offices = [
      'Administrative Division',
      'Construction Division',
      'Equipment Management Division',
      'Finance Division',
      'Maintenance Division',
      'Office of the Regional Director',
      'Planning and Design Division',
      'Quality Assurance and Hydrology Division',
      'Right-of-Way Acquisition and Legal Division'
    ];
    
    const positions = [
      'Accountant I',
      'Accountant II',
      'Accountant III',
      'Accountant IV',
      'Administrative Aide III',
      'Administrative Aide IV',
      'Administrative Aide V',
      'Administrative Aide VI',
      'Administrative Assistant I',
      'Administrative Assistant II',
      'Administrative Assistant III',
      'Administrative Officer I',
      'Administrative Officer II',
      'Administrative Officer III',
      'Administrative Officer IV',
      'Administrative Officer V',
      'Architect II',
      'Assistant Regional Director',
      'Attorney III',
      'Attorney IV',
      'Attorney V',
      'Automotive Equipment Inspector II',
      'Chemist II',
      'Chief Administrative Officer',
      'Computer Programmer II',
      'District Engineer',
      'Engineer II',
      'Engineer III',
      'Engineer IV',
      'Engineer V',
      'Engineering Assistant',
      'Environmental Management Specialist II',
      'Geologist II',
      'Heavy Equipment Operator I',
      'Information Technologist Officer I',
      'Laboratory Technician I',
      'Laboratory Technician II',
      'Laboratory Technician Il',
      'Legal Assistant III',
      'Metal Worker I',
      'OIC - Assistant Regional Director',
      'Regional Director',
      'Supervising Administrative Officer',
      'Surveyman',
      'Welder I'
    ];
    
    const timestamp = new Date().toISOString();
    
    offices.forEach(office => {
      const itemId = Utilities.getUuid();
      const path = `libraries/offices/items/${itemId}`;
      const itemData = {
        id: itemId,
        name: office,
        createdAt: timestamp,
        createdBy: 'SYSTEM_INIT'
      };
      db.createDocument(path, itemData);
    });
    
    positions.forEach(position => {
      const itemId = Utilities.getUuid();
      const path = `libraries/positions/items/${itemId}`;
      const itemData = {
        id: itemId,
        name: position,
        createdAt: timestamp,
        createdBy: 'SYSTEM_INIT'
      };
      db.createDocument(path, itemData);
    });
    
    return {
      success: true,
      officesCreated: offices.length,
      positionsCreated: positions.length,
      message: 'Libraries initialized successfully!'
    };
    
  } catch (error) {
    Logger.log('Error initializing libraries: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function migrateHistoricalBalance_SERVER(data) {
  try {
    const db = getFirestore();
    
    const cocEarned = parseFloat(data.cocEarned);
    const cocUsed = parseFloat(data.cocUsed) || 0;
    const monthYear = data.monthYear;
    const dateOfIssuance = new Date(data.dateOfIssuance);
    
    const [year, month] = monthYear.split('-').map(Number);
    const earnedMonth = month;
    const earnedYear = year;
    
    if (cocEarned > 40) {
      return {
        success: false,
        error: 'COC Earned cannot exceed 40 hours per month (Monthly Accrual Cap)'
      };
    }
    
    if (cocUsed > cocEarned) {
      return {
        success: false,
        error: 'COC Used cannot exceed COC Earned'
      };
    }
    
    const lastDayOfEarnedMonth = new Date(earnedYear, earnedMonth, 0);
    const lastDayOfNextMonth = new Date(earnedYear, earnedMonth + 1, 0);

    // Date range validation - allows December to span into next year
    if (dateOfIssuance < lastDayOfEarnedMonth || dateOfIssuance > lastDayOfNextMonth) {
      return {
        success: false,
        error: `Date of Issuance must be between ${lastDayOfEarnedMonth.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})} and ${lastDayOfNextMonth.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'})}`
      };
    }
    
    const duplicateQuery = db.getDocuments('creditBatches');
    for (let i = 0; i < duplicateQuery.length; i++) {
      const batch = duplicateQuery[i];
      if (batch.fields.employeeId && batch.fields.employeeId.stringValue === data.employeeId &&
          batch.fields.isHistorical && batch.fields.isHistorical.booleanValue === true &&
          batch.fields.earnedMonth && batch.fields.earnedMonth.integerValue == earnedMonth &&
          batch.fields.earnedYear && batch.fields.earnedYear.integerValue == earnedYear) {
        return {
          success: false,
          error: `Historical balance for ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} already exists for this employee`
        };
      }
    }
    
    const remainingHours = cocEarned - cocUsed;
    
    const batchesQuery = db.getDocuments('creditBatches');
    let currentBalance = 0;
    
    batchesQuery.forEach(doc => {
      const batch = doc.obj;
      if (batch.employeeId === data.employeeId && batch.status === 'Active') {
        currentBalance += batch.remainingHours || 0;
      }
    });
    
    const logsQuery = db.getDocuments('overtimeLogs');
    logsQuery.forEach(doc => {
      const log = doc.obj;
      if (log.employeeId === data.employeeId && log.status === 'Uncertified') {
        currentBalance += log.earnedHours || 0;
      }
    });
    
    if (currentBalance + remainingHours > 120) {
      return {
        success: false,
        error: `Total balance cap exceeded. Current balance: ${currentBalance.toFixed(2)} hours. Adding ${remainingHours.toFixed(2)} hours would exceed 120-hour cap.`
      };
    }
    
    const expiryDate = new Date(dateOfIssuance);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    expiryDate.setDate(expiryDate.getDate() - 1);
    
    const status = remainingHours > 0 ? 'Active' : 'Used';
    
    const batchId = 'BATCH_' + Utilities.getUuid();
    const ledgerEarnedId = 'LEDGER_' + Utilities.getUuid();
    const ledgerUsedId = 'LEDGER_' + Utilities.getUuid();
    
    const batchData = {
      batchId: batchId,
      employeeId: data.employeeId,
      certificateId: 'HISTORICAL',
      source: 'Historical',
      initialHours: cocEarned,
      earnedHours: cocEarned,
      usedHours: cocUsed,
      remainingHours: remainingHours,
      monthYear: monthYear,
      dateOfIssuance: dateOfIssuance.toISOString(),
      issueDate: dateOfIssuance.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: status,
      isHistorical: true,
      earnedMonth: earnedMonth,
      earnedYear: earnedYear,
      migratedAt: new Date().toISOString(),
      migratedBy: Session.getActiveUser().getEmail()
    };
    
    db.createDocument('creditBatches/' + batchId, batchData);
    
    const ledgerEarnedData = {
      ledgerId: ledgerEarnedId,
      employeeId: data.employeeId,
      transactionDate: dateOfIssuance.toISOString(),
      transactionType: 'Earned',
      referenceId: batchId,
      hoursChange: cocEarned,
      balanceAfter: currentBalance + cocEarned,
      remarks: `Historical balance - ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} (Initial Balance)`,
      createdAt: new Date().toISOString()
    };
    
    db.createDocument('ledger/' + ledgerEarnedId, ledgerEarnedData);
    
    if (cocUsed > 0) {
      const ledgerUsedData = {
        ledgerId: ledgerUsedId,
        employeeId: data.employeeId,
        transactionDate: dateOfIssuance.toISOString(),
        transactionType: 'Used',
        referenceId: batchId,
        hoursChange: -cocUsed,
        balanceAfter: currentBalance + remainingHours,
        remarks: `Historical balance - ${new Date(earnedYear, earnedMonth - 1).toLocaleDateString('en-US', {month: 'long', year: 'numeric', timeZone: 'Asia/Manila'})} (Initial Balance)`,
        createdAt: new Date().toISOString()
      };
      
      db.createDocument('ledger/' + ledgerUsedId, ledgerUsedData);
    }
    
    return {
      success: true,
      batchId: batchId,
      cocEarned: cocEarned,
      cocUsed: cocUsed,
      remainingHours: remainingHours,
      validUntil: expiryDate.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'}),
      status: status
    };
    
  } catch (error) {
    Logger.log('Historical balance migration error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function saveConfiguration_SERVER(data) {
  try {
    const db = getFirestore();
    
    const configData = {
      regularDayMultiplier: data.regularDayMultiplier,
      restDayMultiplier: data.restDayMultiplier,
      holidayMultiplier: data.holidayMultiplier,
      monthlyAccrualCap: data.monthlyAccrualCap,
      totalBalanceCap: data.totalBalanceCap,
      expiryMonths: data.expiryMonths,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    };
    
    db.updateDocument('configuration/accrualRules', configData);
    
    return {
      success: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function updateHistoricalBalance_SERVER(data) {
  try {
    const db = getFirestore();

    const cocEarned = parseFloat(data.cocEarned);
    const cocUsed = parseFloat(data.cocUsed) || 0;
    const monthYear = data.monthYear;
    const dateOfIssuance = new Date(data.dateOfIssuance);
    const batchId = data.batchId;

    const [year, month] = monthYear.split('-').map(Number);
    const earnedMonth = month;
    const earnedYear = year;

    // Get existing document to preserve ALL fields
    const existingDoc = db.getDocument('creditBatches/' + batchId);
    if (!existingDoc) {
      return {
        success: false,
        error: 'Historical balance not found'
      };
    }
    const existing = existingDoc.obj;

    // Same validations as create
    if (cocEarned > 40) {
      return {
        success: false,
        error: 'COC Earned cannot exceed 40 hours per month (Monthly Accrual Cap)'
      };
    }

    if (cocUsed > cocEarned) {
      return {
        success: false,
        error: 'COC Used cannot exceed COC Earned'
      };
    }

    const remainingHours = cocEarned - cocUsed;

    const expiryDate = new Date(dateOfIssuance);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    expiryDate.setDate(expiryDate.getDate() - 1);

    const status = remainingHours > 0 ? 'Active' : 'Used';

    // Merge: Start with ALL existing fields, then override only what we're updating
    const updateData = Object.assign({}, existing, {
      initialHours: cocEarned,
      earnedHours: cocEarned,
      usedHours: cocUsed,
      remainingHours: remainingHours,
      monthYear: monthYear,
      dateOfIssuance: dateOfIssuance.toISOString(),
      issueDate: dateOfIssuance.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: status,
      earnedMonth: earnedMonth,
      earnedYear: earnedYear,
      updatedAt: new Date().toISOString(),
      updatedBy: Session.getActiveUser().getEmail()
    });

    db.updateDocument('creditBatches/' + batchId, updateData);

    return {
      success: true,
      batchId: batchId,
      cocEarned: cocEarned,
      cocUsed: cocUsed,
      remainingHours: remainingHours,
      validUntil: expiryDate.toLocaleDateString('en-US', {timeZone: 'Asia/Manila'}),
      status: status
    };

  } catch (error) {
    Logger.log('Historical balance update error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function deleteHistoricalBalance_SERVER(batchId) {
  try {
    const db = getFirestore();
    db.deleteDocument('creditBatches/' + batchId);

    return {
      success: true
    };

  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

function checkEmployeeHasOvertimeLogs_SERVER(employeeId) {
  try {
    const db = getFirestore();

    const logsQuery = db.query('overtimeLogs')
      .where('employeeId', '==', employeeId)
      .execute();

    const hasLogs = logsQuery.length > 0;

    return {
      success: true,
      hasLogs: hasLogs
    };

  } catch (error) {
    return {
      success: false,
      hasLogs: false,
      error: error.toString()
    };
  }
}

function dailyForfeitureTask() {
  try {
    const db = getFirestore();
    const today = new Date();
    
    const expiredQuery = db.query('creditBatches')
      .where('status', '==', 'Active')
      .where('expiryDate', '<', today.toISOString())
      .execute();
    
    let forfeitedCount = 0;
    let totalForfeitedHours = 0;
    
    expiredQuery.forEach(doc => {
      const batch = doc.obj;
      const batchId = doc.name.split('/').pop();
      
      db.updateDocument('creditBatches/' + batchId, {
        status: 'Expired',
        expiredAt: today.toISOString()
      });
      
      const ledgerId = 'LEDGER_' + Utilities.getUuid();
      const ledgerData = {
        ledgerId: ledgerId,
        employeeId: batch.employeeId,
        transactionDate: today.toISOString(),
        transactionType: 'Forfeited',
        referenceId: batchId,
        hoursChange: -batch.remainingHours,
        balanceAfter: 0,
        remarks: `Batch ${batchId} expired`,
        createdAt: today.toISOString()
      };
      
      db.createDocument('ledger/' + ledgerId, ledgerData);
      
      forfeitedCount++;
      totalForfeitedHours += batch.remainingHours;
    });
    
    Logger.log(`Forfeiture task completed. ${forfeitedCount} batches expired. Total: ${totalForfeitedHours} hours`);
    
    return {
      success: true,
      forfeitedCount: forfeitedCount,
      totalForfeitedHours: totalForfeitedHours
    };
    
  } catch (error) {
    Logger.log('Forfeiture task error: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

function syncReportsToSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('COC Reports');
    
    if (!sheet) {
      sheet = ss.insertSheet('COC Reports');
    } else {
      sheet.clear();
    }
    
    const db = getFirestore();
    
    sheet.appendRow(['COC Liability Report', '', '', '', '']);
    sheet.appendRow(['Generated:', new Date().toLocaleString('en-US', {timeZone: 'Asia/Manila'}), '', '', '']);
    sheet.appendRow(['']);
    sheet.appendRow(['Employee ID', 'Name', 'Total Balance (hrs)', 'Active Batches', 'Earliest Expiry']);
    
    const employeesQuery = db.query('employees')
      .where('isActive', '==', true)
      .orderBy('lastName')
      .execute();
    
    const reportData = [];
    
    employeesQuery.forEach(empDoc => {
      const emp = empDoc.obj;
      
      const batchesQuery = db.query('creditBatches')
        .where('employeeId', '==', emp.employeeId)
        .where('status', '==', 'Active')
        .orderBy('expiryDate', 'asc')
        .execute();
      
      let totalBalance = 0;
      let activeBatches = 0;
      let earliestExpiry = '';
      
      batchesQuery.forEach(batchDoc => {
        const batch = batchDoc.obj;
        totalBalance += batch.remainingHours;
        activeBatches++;
        
        if (!earliestExpiry && batch.expiryDate) {
          earliestExpiry = new Date(batch.expiryDate).toLocaleDateString('en-US', {timeZone: 'Asia/Manila'});
        }
      });
      
      if (totalBalance > 0) {
        reportData.push([
          emp.employeeId,
          `${emp.lastName}, ${emp.firstName}`,
          totalBalance.toFixed(2),
          activeBatches,
          earliestExpiry
        ]);
      }
    });
    
    if (reportData.length > 0) {
      sheet.getRange(5, 1, reportData.length, 5).setValues(reportData);
    } else {
      sheet.appendRow(['No active COC balances found']);
    }
    
    sheet.autoResizeColumns(1, 5);
    
    const headerRange = sheet.getRange(1, 1, 1, 5);
    headerRange.setFontWeight('bold').setFontSize(14);
    
    const columnHeaderRange = sheet.getRange(4, 1, 1, 5);
    columnHeaderRange.setFontWeight('bold').setBackground('#667eea').setFontColor('white');
    
    SpreadsheetApp.getUi().alert('Reports synced successfully to "COC Reports" sheet!');
    
    return {
      success: true,
      recordCount: reportData.length
    };
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error syncing reports: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}