function doOptions() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // change if needed
    const body = JSON.parse(e.postData.contents || "{}");

    sheet.appendRow([
      new Date(),
      body.fullName || "",
      body.email || "",
      body.organization || "",
      body.title || "",
      body.topic || "",
      body.abstract || "",
      body.duration || "",
      body.bio || "",
      body.links || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
