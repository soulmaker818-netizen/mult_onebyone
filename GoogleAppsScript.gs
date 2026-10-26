/** 小二乘法挑戰王 Google Sheets 龍虎榜 API */
const SHEET_NAME = 'Scores';
const HEADERS = ['名字', '班別', '分數'];
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}
function doGet(e) {
  const callback = e && e.parameter ? String(e.parameter.callback || '') : '';
  let result;
  try {
    const sheet = getSheet_(), last = sheet.getLastRow();
    const values = last > 1 ? sheet.getRange(2, 1, last - 1, 3).getValues() : [];
    const rows = values.filter(r => String(r[0]).trim() && String(r[1]).trim() && r[2] !== '')
      .map(r => ({name:String(r[0]), className:String(r[1]), score:Number(r[2])}))
      .filter(r => Number.isFinite(r.score) && r.score >= 0 && r.score <= 10)
      .sort((a,b) => b.score-a.score || a.name.localeCompare(b.name));
    result = {ok:true, rows};
  } catch (err) { result = {ok:false, rows:[]}; }
  const json = JSON.stringify(result);
  if (callback && /^[A-Za-z_$][0-9A-Za-z_$\.]*$/.test(callback))
    return ContentService.createTextOutput(callback+'('+json+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
function doPost(e) {
  try {
    const p = JSON.parse(e.postData.contents || '{}');
    const name = String(p.name || '').trim().slice(0,24), cls = String(p.className || '').trim().slice(0,12), score = Number(p.score);
    if (p.action !== 'submit' || !name || !cls || !Number.isInteger(score) || score < 0 || score > 10) return output_({ok:false});
    const lock = LockService.getScriptLock(); lock.waitLock(10000);
    try {
      const sheet = getSheet_(), last = sheet.getLastRow(), rows = last > 1 ? sheet.getRange(2,1,last-1,3).getValues() : [];
      let target = -1;
      for (let i=0;i<rows.length;i++) if (String(rows[i][0]).trim().toLowerCase()===name.toLowerCase() && String(rows[i][1]).trim().toLowerCase()===cls.toLowerCase()) {target=i+2;break;}
      if (target < 0) sheet.appendRow([name,cls,score]); else if (score > Number(sheet.getRange(target,3).getValue())) sheet.getRange(target,3).setValue(score);
    } finally { lock.releaseLock(); }
    return output_({ok:true});
  } catch (err) { return output_({ok:false}); }
}
function output_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
