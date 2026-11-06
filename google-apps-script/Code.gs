/**
 * =========================================================================
 * HEALTHTRAVO - PRIVATE & SECURE GOOGLE SHEETS FORM INTEGRATION
 * Account: dushyanttchauhan@gmail.com
 * =========================================================================
 * 
 * FEATURES:
 * 1. REAL FILE UPLOADS: Uploaded medical records (PDF, scans, images) are
 *    automatically saved to a dedicated "HealthTravo Patient Records" folder
 *    in Google Drive, and linked as clickable HYPERLINKS in Google Sheet!
 * 2. NO #ERROR! BUG: Phone numbers with leading '+' are properly escaped as
 *    text so Google Sheets never displays formula parse errors.
 * 3. SIDE-BY-SIDE + DEDICATED TABS:
 *    - "All_Inquiries_SideBySide": Left side = Consultation, Right side = Media.
 *    - "Consultations": Dedicated clinical consultation inquiries.
 *    - "HealthTravo_Media": Dedicated media and podcast applications.
 * 4. INSTANT EMAIL NOTIFICATIONS: Detailed alert sent to dushyanttchauhan@gmail.com
 *    with a direct button to view the attached medical file.
 * =========================================================================
 */

// Owner & Notification Email
var NOTIFICATION_EMAIL = "dushyanttchauhan@gmail.com";

// Consultation Columns (Left Side)
var CONSULTATION_HEADERS = [
  "Timestamp (IST)",
  "Full Name",
  "Phone / WhatsApp",
  "Email",
  "Country & City",
  "Preferred Hospital",
  "Specialty",
  "Services Required",
  "Medical Query / History",
  "Attached File Name / Link"
];

// HealthTravo Media Columns (Right Side)
var MEDIA_HEADERS = [
  "Timestamp (IST)",
  "Collaboration Type",
  "Full Name / Speaker",
  "Designation",
  "Organization / Hospital / Brand",
  "Phone / WhatsApp",
  "Email",
  "Website / LinkedIn",
  "Proposed Topic / Showcase",
  "Key Message / Talking Points",
  "Preferred Filming Mode"
];

/**
 * Handle incoming POST requests from HealthTravo Website
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000); // 30 sec lock to prevent concurrent write collisions

  try {
    var rawData = {};
    
    // Parse JSON body or form parameters
    if (e && e.postData && e.postData.contents) {
      try {
        rawData = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        rawData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      rawData = e.parameter;
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");
    var formType = (rawData.type || rawData.formType || "").toLowerCase();

    // Guard: If payload is empty (e.g. clicking "Run" on doPost inside Apps Script editor)
    if (!rawData.fullName && !rawData.phone && !rawData.email && !rawData.topicTitle) {
      Logger.log("doPost called with empty payload. If testing, run testConsultationSubmission() instead.");
      return ContentService.createTextOutput(JSON.stringify({
        status: "ignored",
        message: "No data payload received. To test, please run testConsultationSubmission() in the editor."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Make sure Side-by-Side sheet exists
    var sideBySideSheet = getOrCreateSideBySideSheet(ss);

    // Format phone with leading single quote to avoid Google Sheets #ERROR! arithmetic formula bug
    var formattedPhone = rawData.phone ? "'" + rawData.phone : "";

    // =======================================================================
    // 1. HEALTHTRAVO MEDIA SUBMISSION
    // =======================================================================
    if (formType.indexOf("media") !== -1 || formType.indexOf("healthtalk") !== -1) {
      var mediaSheet = getOrCreateSheet(ss, "HealthTravo_Media", MEDIA_HEADERS, "#071A41");
      var mediaRow = [
        timestamp,
        rawData.collabType || "Podcast",
        rawData.fullName || "",
        rawData.designation || "",
        rawData.organization || "",
        formattedPhone,
        rawData.email || "",
        rawData.website || "",
        rawData.topicTitle || "",
        rawData.message || "",
        rawData.filmingMode || "Remote"
      ];
      mediaSheet.appendRow(mediaRow);
      formatLastRow(mediaSheet);

      // Append to Right Side of All_Inquiries_SideBySide (Cols L to V, starting col 12)
      appendMediaToSideBySide(sideBySideSheet, mediaRow);

      // Send Instant Email Alert to dushyanttchauhan@gmail.com
      sendMediaEmailNotification(mediaRow);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        sheet: "HealthTravo_Media & SideBySide",
        message: "Media proposal recorded securely and emailed to " + NOTIFICATION_EMAIL
      })).setMimeType(ContentService.MimeType.JSON);

    } else {
      // =====================================================================
      // 2. CLINICAL CONSULTATION SUBMISSION (WITH REAL FILE UPLOAD)
      // =====================================================================
      var consultSheet = getOrCreateSheet(ss, "Consultations", CONSULTATION_HEADERS, "#1877F2");

      var servicesList = "";
      if (Array.isArray(rawData.services)) {
        servicesList = rawData.services.join(", ");
      } else if (rawData.services) {
        servicesList = rawData.services.toString();
      }

      // Process Attached File (Save into Google Drive & build Hyperlink)
      var fileCellContent = "None";
      var fileUrl = "";

      if (rawData.fileBase64 && rawData.fileName) {
        try {
          var folder = getOrCreateRecordsFolder("HealthTravo Patient Records");
          var decodedBytes = Utilities.base64Decode(rawData.fileBase64);
          var mimeType = rawData.fileMimeType || "application/octet-stream";
          var blob = Utilities.newBlob(decodedBytes, mimeType, rawData.fileName);
          var savedFile = folder.createFile(blob);

          // Allow view access to the file
          savedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fileUrl = savedFile.getUrl();

          // HYPERLINK formula so clicking filename opens the file directly
          fileCellContent = '=HYPERLINK("' + fileUrl + '", "' + rawData.fileName.replace(/"/g, '""') + '")';
        } catch (uploadErr) {
          Logger.log("Error saving file to Drive: " + uploadErr);
          fileCellContent = rawData.fileName + " (Upload Error: " + uploadErr.message + ")";
        }
      } else if (rawData.fileName) {
        fileCellContent = rawData.fileName;
      }

      var consultRow = [
        timestamp,
        rawData.fullName || "",
        formattedPhone,
        rawData.email || "",
        rawData.country || "",
        rawData.preferredHospital || "General Recommendation",
        rawData.specialty || "General Inquiry",
        servicesList,
        rawData.medicalQuery || "",
        fileCellContent
      ];

      consultSheet.appendRow(consultRow);
      formatLastRow(consultSheet);

      // Append to Left Side of All_Inquiries_SideBySide (Cols A to J, starting col 1)
      appendConsultToSideBySide(sideBySideSheet, consultRow);

      // Send Instant Email Alert to dushyanttchauhan@gmail.com
      sendConsultEmailNotification(consultRow, fileUrl, rawData.fileName);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        sheet: "Consultations & SideBySide",
        fileUrl: fileUrl,
        message: "Consultation inquiry and medical records recorded securely and emailed to " + NOTIFICATION_EMAIL
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/**
 * Creates or retrieves the dedicated Google Drive folder for patient records
 */
function getOrCreateRecordsFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

/**
 * Creates or gets the unified Side-by-Side sheet:
 * Left side: Consultation Data
 * Middle: Divider
 * Right side: HealthTravo Media Data
 */
function getOrCreateSideBySideSheet(spreadsheet) {
  var sheetName = "All_Inquiries_SideBySide";
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName, 0); // Put as first tab
  }

  if (sheet.getLastRow() === 0) {
    // Row 1: Super Headers
    sheet.getRange(1, 1, 1, 10).merge()
      .setValue("🏥 CLINICAL CONSULTATIONS (LEFT SIDE)")
      .setBackground("#1877F2")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setFontSize(12)
      .setHorizontalAlignment("center");

    sheet.getRange(1, 11).setValue(" ")
      .setBackground("#CBD5E1"); // Divider column

    sheet.getRange(1, 12, 1, 11).merge()
      .setValue("🎙️ HEALTHTRAVO MEDIA & PODCASTS (RIGHT SIDE)")
      .setBackground("#071A41")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setFontSize(12)
      .setHorizontalAlignment("center");

    sheet.setRowHeight(1, 32);

    // Row 2: Column Headers
    // Left: Consultation Headers
    for (var i = 0; i < CONSULTATION_HEADERS.length; i++) {
      var cell = sheet.getRange(2, i + 1);
      cell.setValue(CONSULTATION_HEADERS[i]);
      cell.setBackground("#0A2540");
      cell.setFontColor("#FFFFFF");
      cell.setFontWeight("bold");
      cell.setFontSize(10);
      cell.setHorizontalAlignment("center");
      sheet.setColumnWidth(i + 1, 140);
    }

    // Divider
    sheet.getRange(2, 11).setValue("|").setBackground("#E2E8F0").setFontColor("#94A3B8").setHorizontalAlignment("center");
    sheet.setColumnWidth(11, 24);

    // Right: Media Headers
    for (var j = 0; j < MEDIA_HEADERS.length; j++) {
      var mCell = sheet.getRange(2, 12 + j);
      mCell.setValue(MEDIA_HEADERS[j]);
      mCell.setBackground("#1E293B");
      mCell.setFontColor("#FFFFFF");
      mCell.setFontWeight("bold");
      mCell.setFontSize(10);
      mCell.setHorizontalAlignment("center");
      sheet.setColumnWidth(12 + j, 140);
    }

    sheet.setRowHeight(2, 28);
    sheet.setFrozenRows(2);
  }

  return sheet;
}

/**
 * Appends Consultation row to Left side of Side-by-Side Sheet
 */
function appendConsultToSideBySide(sheet, rowData) {
  var col1Values = sheet.getRange("A:A").getValues();
  var nextRow = 3;
  for (var r = col1Values.length - 1; r >= 2; r--) {
    if (col1Values[r][0] !== "" && col1Values[r][0] !== null) {
      nextRow = r + 2;
      break;
    }
  }

  sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
  sheet.getRange(nextRow, 1).setHorizontalAlignment("center");
  sheet.getRange(nextRow, 11).setValue("|").setBackground("#E2E8F0").setFontColor("#94A3B8").setHorizontalAlignment("center");
  sheet.setRowHeight(nextRow, 26);
}

/**
 * Appends Media row to Right side of Side-by-Side Sheet
 */
function appendMediaToSideBySide(sheet, rowData) {
  var col12Values = sheet.getRange("L:L").getValues();
  var nextRow = 3;
  for (var r = col12Values.length - 1; r >= 2; r--) {
    if (col12Values[r][0] !== "" && col12Values[r][0] !== null) {
      nextRow = r + 2;
      break;
    }
  }

  sheet.getRange(nextRow, 12, 1, rowData.length).setValues([rowData]);
  sheet.getRange(nextRow, 12).setHorizontalAlignment("center");
  sheet.getRange(nextRow, 11).setValue("|").setBackground("#E2E8F0").setFontColor("#94A3B8").setHorizontalAlignment("center");
  sheet.setRowHeight(nextRow, 26);
}

/**
 * Standard Helper for Individual Tabs
 */
function getOrCreateSheet(spreadsheet, sheetName, headers, brandColor) {
  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground(brandColor || "#071A41");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);

    for (var col = 1; col <= headers.length; col++) {
      sheet.setColumnWidth(col, 150);
    }
  }

  return sheet;
}

function formatLastRow(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow <= 1) return;

  var rowRange = sheet.getRange(lastRow, 1, 1, lastCol);
  rowRange.setFontFamily("Calibri");
  rowRange.setFontSize(10);
  rowRange.setVerticalAlignment("middle");
  sheet.setRowHeight(lastRow, 28);

  if (lastRow % 2 === 0) {
    rowRange.setBackground("#F8FAFC");
  } else {
    rowRange.setBackground("#FFFFFF");
  }

  sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
}

/**
 * =========================================================================
 * INSTANT EMAIL NOTIFICATION FUNCTIONS
 * Sends an immediate alert to dushyanttchauhan@gmail.com with file link
 * =========================================================================
 */
function sendConsultEmailNotification(data, fileUrl, rawFileName) {
  if (!NOTIFICATION_EMAIL) return;
  try {
    var subject = "🏥 New Clinical Consultation: " + data[1] + " (" + data[4] + ")";
    var cleanPhone = (data[2] || "").replace(/[^0-9]/g, '');

    var fileHtml = data[9];
    if (fileUrl && fileUrl.indexOf("http") === 0) {
      fileHtml = "<a href='" + fileUrl + "' target='_blank' style='display: inline-block; background-color: #1877F2; color: #FFFFFF; padding: 7px 16px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 12px;'>View Attached File (" + (rawFileName || "Medical Record") + ") 📄</a>";
    }

    var body = 
      "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 12px;'>" +
      "<h2 style='color: #1877F2; margin-top: 0;'>New Patient Consultation Inquiry</h2>" +
      "<p style='color: #475569; font-size: 14px;'>A new patient has submitted an inquiry on the HealthTravo portal:</p>" +
      "<table style='width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 15px;'>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Patient Name:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[1] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Phone / WhatsApp:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'><a href='https://wa.me/" + cleanPhone + "'>" + data[2] + "</a></td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Email:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + (data[3] || "N/A") + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Location:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[4] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Preferred Hospital:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[5] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Specialty:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[6] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Services Required:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[7] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Medical Query:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + (data[8] || "None") + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Attached Medical File:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + fileHtml + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B;'>Received At:</td><td style='padding: 8px;'>" + data[0] + "</td></tr>" +
      "</table>" +
      "<div style='margin-top: 20px; text-align: center;'>" +
      "<a href='https://wa.me/" + cleanPhone + "' style='display: inline-block; background-color: #25D366; color: white; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold; font-size: 13px;'>Reply on WhatsApp</a>" +
      "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: body
    });
  } catch (err) {
    Logger.log("Email notification error: " + err);
  }
}

function sendMediaEmailNotification(data) {
  if (!NOTIFICATION_EMAIL) return;
  try {
    var subject = "🎙️ New HealthTravo Media Proposal: " + data[2] + " (" + data[4] + ")";
    var cleanPhone = (data[5] || "").replace(/[^0-9]/g, '');

    var body = 
      "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 12px;'>" +
      "<h2 style='color: #071A41; margin-top: 0;'>New HealthTravo Media & Podcast Application</h2>" +
      "<p style='color: #475569; font-size: 14px;'>A speaker / brand has submitted a collaboration proposal:</p>" +
      "<table style='width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 15px;'>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Collaboration Type:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9; text-transform: uppercase; font-weight: bold; color: #4F46E5;'>" + data[1] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Speaker / Applicant:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[2] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Designation:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[3] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Organization:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[4] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Phone / WhatsApp:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'><a href='https://wa.me/" + cleanPhone + "'>" + data[5] + "</a></td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Official Email:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[6] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Website / Profile:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'><a href='" + data[7] + "'>" + (data[7] || "N/A") + "</a></td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Proposed Topic:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9; font-weight: bold;'>" + data[8] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Core Message:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[9] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B; border-bottom: 1px solid #F1F5F9;'>Filming Mode:</td><td style='padding: 8px; border-bottom: 1px solid #F1F5F9;'>" + data[10] + "</td></tr>" +
      "<tr><td style='padding: 8px; font-weight: bold; color: #1E293B;'>Received At:</td><td style='padding: 8px;'>" + data[0] + "</td></tr>" +
      "</table>" +
      "</div>";

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: body
    });
  } catch (err) {
    Logger.log("Email notification error: " + err);
  }
}

/**
 * =========================================================================
 * 1-CLICK DRIVE PERMISSION AUTHORIZATION FUNCTION
 * Run this function ONCE inside Google Apps Script editor to authorize Google Drive:
 * 1. Select 'authorizeDriveAndUploads' from the dropdown at the top of the editor.
 * 2. Click 'Run'.
 * 3. Click 'Review permissions' -> Choose dushyanttchauhan@gmail.com -> Advanced -> Allow!
 * That's it! Drive access will be 100% granted.
 * =========================================================================
 */
function authorizeDriveAndUploads() {
  var folder = getOrCreateRecordsFolder("HealthTravo Patient Records");
  Logger.log("✅ Google Drive permission granted successfully! Folder name: " + folder.getName());
}

/**
 * Quick local test inside Apps Script editor
 */
function testConsultationSubmission() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        type: "Doctor & Clinical Consultation",
        fullName: "Dr. Rajesh Sharma (Test Patient)",
        phone: "+91 9999089087",
        email: "patient.test@gmail.com",
        country: "Nairobi, Kenya",
        preferredHospital: "Fortis Escorts Heart Institute",
        specialty: "Cardiac Sciences & Robotic Surgery",
        services: ["Doctor Second Opinion", "Hospital Cost & Package Estimate"],
        medicalQuery: "Testing side-by-side automatic logging, phone fix, and email notification.",
        fileName: "cardiac_report.pdf"
      })
    }
  };
  var res = doPost(mockEvent);
  Logger.log(res.getContent());
}
