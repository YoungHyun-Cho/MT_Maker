function resetAll() {
    setDataLength();
    resetSheet1();
    resetSheet2();
    resetSheet3();
}

const setDataLength = () => {
  lastDataIndex = SHEET1.getDataRange().getValues().length;
  console.log(lastDataIndex);
};

const resetSheet1 = () => {
  SHEET1.getRange("A1:E" + lastDataIndex).clear();
  SHEET1.getRange("H1").clearContent();
};

const resetSheet2 = () => {

  SHEET2.getRange("B1:C1").clearContent();  
  const fieldCol = SHEET2.getRange("C4:C" + lastDataIndex + 3);
  fieldCol.setBorder(true, true, true, true, true, true, "#D9D9D9", SpreadsheetApp.BorderStyle.SOLID);
  fieldCol.setBackground("#FFFFFF");

  for (let i = 0; i < lastDataIndex + 3; i++) {
    SHEET2.getRange("A" + (4 + i)).setValue(SELECT);
    SHEET2.getRange("B" + (4 + i)).clearContent();
    SHEET2.getRange("C" + (4 + i)).clearContent();
    SHEET2.getRange("D" + (4 + i)).setValue("0");
    SHEET2.getRange("E" + (4 + i)).setValue("1");
    SHEET2.getRange("F" + (4 + i)).setValue("-");
  }
};

const resetSheet3 = () => {
  SHEET3.getRange("A1").clearContent();
};


