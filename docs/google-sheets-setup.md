# 📊 Professional Google Sheets Setup Guide for CureSpare HealthPoint

Connect your website lead booking form directly to a Google Sheet with **automatic professional formatting, executive layout styling, formulas, and auto-wrapped patient descriptions**!

---

## 🚀 Step 1: Prepare Your Google Sheet

1. Open [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Title it: `CureSpare HealthPoint - Patient Leads`.

---

## ⚡ Step 2: Paste Executive Apps Script Code

1. In your Google Sheet top menu, click **Extensions** ➔ **Apps Script**.
2. Select all existing text in `Code.gs`, delete it, and **paste the code below**:

```javascript
/**
 * CureSpare HealthPoint - Executive Google Sheets Lead Management Automation
 * Features:
 * - Executive Brand Header Styling (Emerald #0B4336 theme)
 * - Auto-wrapped, formatted clinical description section
 * - Interactive Lead Status dropdowns & conditional formatting rules
 * - Auto-formatted incoming leads on every POST submit
 * - Live lead counter formulas & automated sheet setup menu
 */

// 1. Setup Custom Menu in Google Sheets
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('🏥 CureSpare Leads')
    .addItem('✨ Format Sheet & Apply Formulas', 'setupSheet')
    .addToUi();
}

// 2. Executive Sheet Formatter & Formula Setup
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set Sheet Name
  sheet.setName('Patient Leads');
  
  // Title / Stats Header Block (Rows 1 & 2)
  sheet.getRange("A1:K1").merge()
       .setValue("🏥 CureSpare HealthPoint — Patient Leads & Clinical Consultations Dashboard")
       .setBackground("#07382D")
       .setFontColor("#FFFFFF")
       .setFontWeight("bold")
       .setFontSize(13)
       .setHorizontalAlignment("center")
       .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 40);

  // Summary Formula Bar (Row 2)
  sheet.getRange("A2").setValue("TOTAL LEADS:");
  sheet.getRange("B2").setFormula("=COUNTA(A4:A)");
  sheet.getRange("C2").setValue("NEW LEADS:");
  sheet.getRange("D2").setFormula('=COUNTIF(J4:J, "*New Lead*")');
  sheet.getRange("E2").setValue("CONTACTED:");
  sheet.getRange("F2").setFormula('=COUNTIF(J4:J, "*Contacted*")');
  sheet.getRange("G2").setValue("SCHEDULED:");
  sheet.getRange("H2").setFormula('=COUNTIF(J4:J, "*Scheduled*")');

  var statsRange = sheet.getRange("A2:H2");
  statsRange.setBackground("#F0F6F4")
            .setFontWeight("bold")
            .setFontSize(9)
            .setFontColor("#0B4336")
            .setVerticalAlignment("middle");
  sheet.setRowHeight(2, 28);

  // Table Column Headers (Row 3)
  var headers = [
    "Booking Ref",
    "Submitted Date & Time",
    "Patient Full Name",
    "Phone Number",
    "Email (Optional)",
    "Requested Service / Specialty",
    "Preferred Date",
    "Time Slot",
    "Clinical Notes & Symptoms (Description)",
    "Lead Status",
    "Coordinator Follow-up Notes"
  ];

  var headerRange = sheet.getRange("A3:K3");
  headerRange.setValues([headers])
             .setBackground("#0B4336")
             .setFontColor("#FFFFFF")
             .setFontWeight("bold")
             .setFontSize(10)
             .setHorizontalAlignment("center")
             .setVerticalAlignment("middle");
  sheet.setRowHeight(3, 35);
  sheet.setFrozenRows(3);

  // Column Width Optimizations
  sheet.setColumnWidth(1, 140); // Ref ID
  sheet.setColumnWidth(2, 170); // Submitted Time
  sheet.setColumnWidth(3, 180); // Full Name
  sheet.setColumnWidth(4, 140); // Phone Number
  sheet.setColumnWidth(5, 180); // Email
  sheet.setColumnWidth(6, 210); // Service
  sheet.setColumnWidth(7, 130); // Date
  sheet.setColumnWidth(8, 180); // Time Slot
  sheet.setColumnWidth(9, 320); // Clinical Notes (Wide for description readability)
  sheet.setColumnWidth(10, 160); // Status
  sheet.setColumnWidth(11, 240); // Follow-up Notes

  // Enable Text Wrapping on Description & Notes Columns (Col I & K)
  sheet.getRange("I4:I1000").setWrap(true);
  sheet.getRange("K4:K1000").setWrap(true);

  // Apply Status Dropdown Rule for Column J
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "🆕 New Lead",
      "📞 Contacted",
      "🗓️ Scheduled",
      "✅ Completed",
      "❌ Cancelled"
    ], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("J4:J1000").setDataValidation(statusRule);

  SpreadsheetApp.getUi().alert("✅ CureSpare Lead Sheet Formatted Successfully!\n\nAll columns, description wrapping, status dropdowns, and live count formulas are active.");
}

// 3. Webhook POST Handler (Receives Leads from Website)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patient Leads') ||
                SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var bookingId = data.bookingId || ("CSP-" + Math.floor(100000 + Math.random() * 900000));
    var submittedAt = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var fullName = data.fullName || "Valued Patient";
    var phone = "'" + String(data.phone || "").trim(); // Keep leading zero / format as string
    var email = data.email || "—";
    var service = data.serviceId || data.conditionName || "General Consultation";
    var prefDate = data.preferredDate || "Asap";
    var prefTime = data.preferredTime || "Any Slot";
    var message = data.message ? data.message.trim() : "No initial notes provided.";
    var status = "🆕 New Lead";
    var followUp = "";

    // Append Formatted Row
    sheet.appendRow([
      bookingId,
      submittedAt,
      fullName,
      phone,
      email,
      service,
      prefDate,
      prefTime,
      message,
      status,
      followUp
    ]);

    // Format newly added row
    var lastRow = sheet.getLastRow();
    var newRowRange = sheet.getRange(lastRow, 1, 1, 11);
    
    newRowRange.setFontSize(10)
               .setVerticalAlignment("middle");
               
    // Center Align Ref, Date, Phone, Pref Date, Time Slot, Status
    sheet.getRange(lastRow, 1).setHorizontalAlignment("center").setFontWeight("bold");
    sheet.getRange(lastRow, 2).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 4).setHorizontalAlignment("center").setFontWeight("bold");
    sheet.getRange(lastRow, 7).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 8).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 10).setHorizontalAlignment("center");

    // Left Align & Wrap Description / Message Field (Col 9)
    sheet.getRange(lastRow, 9).setWrap(true).setHorizontalAlignment("left");
    sheet.getRange(lastRow, 11).setWrap(true).setHorizontalAlignment("left");

    // Soft border
    newRowRange.setBorder(true, true, true, true, false, false, "#DDE3DE", SpreadsheetApp.BorderStyle.SOLID);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Lead recorded cleanly." }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 4. Webhook GET Handler (Fast Fetch)
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Patient Leads') ||
                SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    if (rows.length < 4) {
      return ContentService.createTextOutput(JSON.stringify({ status: "success", leads: [] })).setMimeType(ContentService.MimeType.JSON);
    }
    var headers = rows[2];
    var data = [];
    for (var i = 3; i < rows.length; i++) {
      var row = rows[i];
      var record = {};
      for (var j = 0; j < headers.length; j++) {
        record[headers[j]] = row[j];
      }
      data.push(record);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", leads: data }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 🌐 Step 3: Deploy & Run Initial Formatting

1. In Google Apps Script, click **Save** 💾.
2. Click **Run** with `setupSheet` selected to initialize column widths, headers, and formulas on your sheet right away!
3. Click **Deploy ➔ Manage Deployments ➔ Edit ✏️**.
4. Set **Who has access**: **`Anyone`**, select **New Version**, and click **Deploy**.

---

## ✨ Features Added to Your Google Sheet
1. 🎨 **Executive Brand Header**: Styled in CureSpare Deep Emerald (`#0B4336`) with clear headers and frozen top rows.
2. 📊 **Live Lead Formulas**: Automated count formulas (`TOTAL LEADS`, `NEW LEADS`, `CONTACTED`, `SCHEDULED`).
3. 📝 **Formatted Description Section**: Column I ("Clinical Notes & Symptoms") is wide (320px) with **auto text-wrapping (`setWrap(true)`)** so multiline patient notes display clearly without getting cut off.
4. 📞 **Smart Phone Formatting**: Phone numbers are stored as exact strings to prevent Excel/Sheets from truncating starting `0`s or turning numbers into scientific notation.
5. 🏷️ **Interactive Status Dropdown**: Each new row includes a status selector:
   - `🆕 New Lead`
   - `📞 Contacted`
   - `🗓️ Scheduled`
   - `✅ Completed`
   - `❌ Cancelled`
