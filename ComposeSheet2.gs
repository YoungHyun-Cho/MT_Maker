function readData() {
    setSheet2(getRawData());
    setLastRow();
}

const getRawData = () => {
  const data = SHEET1.getDataRange().getValues();
  
  let type = ""; 
  let typeName = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i][0]) type = data[i][0];
    else data[i][0] = type;

    if (data[i][0].replace(/\s+/g, "").toUpperCase() === IFD_FIELD) data[i][1] = data[i][0];

    if (data[i][1]) typeName = data[i][1];
    else data[i][1] = typeName;
  }

  return data;
};

const setSheet2 = (rawData) => {
  MTname = SHEET1.getRange("H1").getValue();
  SHEET2.getRange("B1").setValue(MTname);

  for (let i = 0; i < rawData.length; i++) {
    setA(rawData, i);
    setB(rawData, i);
    setC(rawData, i);
  }
};

const setA = (rawData, i) => {
  const cell = SHEET2.getRange("A" + (4 + i) );

  switch (rawData[i][1].replace(/\s+/g, "").toUpperCase()) {
    case IFD_FIELD:     cell.setValue(FIELD); break;
    case IFD_STRUCTURE: cell.setValue(STRUCTURE); break;
    case IFD_TABLE:     cell.setValue(TABLE); break;
  }
};

const setB = (rawData, i) => {
  const type = rawData[i][0];
  if (type === IFD_FIELD) return;
  const cell = SHEET2.getRange("B" + (4 + i) );

  cell.setValue(type);
};

const setC = (rawData, i) => {
  const cell = SHEET2.getRange("C" + (4 + i) );

  cell.setValue(rawData[i][3].replace(/\s+/g, ""));
};

const getLastRow = () => {
  const startRow = 4; 
  const column = 3; 

  const data = SHEET2.getRange(startRow, column, SHEET2.getLastRow() - startRow + 1).getValues();

  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i][0] !== "") return startRow + i;
  }
  return null;
};

const setLastRow = () => {
  lastRow = getLastRow();
};