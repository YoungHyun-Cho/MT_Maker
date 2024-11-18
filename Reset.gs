function resetAll() {
    resetSheet1();
    resetSheet2();
    resetSheet3();
}

const resetSheet1 = () => {
  SHEET1.getRange("A1:E1000").clear()
  SHEET1.getRange("H1").clearContent();
};

const resetSheet2 = () => {

  SHEET2.getRange("B1:C1").clearContent();  

  for (let i = 0; i < 1000; i++) {
    SHEET2.getRange("A" + (4 + i)).setValue(SELECT);
    SHEET2.getRange("B" + (4 + i)).clearContent();
    SHEET2.getRange("C" + (4 + i)).clearContent();
    SHEET2.getRange("D" + (4 + i)).setValue("0");
    SHEET2.getRange("E" + (4 + i)).setValue("1");
  }
};

const resetSheet3 = () => {
  SHEET3.getRange("A1").clearContent();
};


