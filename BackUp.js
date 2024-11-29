// function create() {
//   setSheet2(getRawData());
//   createMT(read(getLastRow()), MTname);
//   printMT();
// }

// const getRawData = () => {
//   const data = SHEET1.getDataRange().getValues();
  
//   let type = ""; 
//   let typeName = "";

//   for (let i = 0; i < data.length; i++) {
//     if (data[i][0]) type = data[i][0];
//     else data[i][0] = type;

//     if (data[i][0].replace(/\s+/g, "").toUpperCase() === IFD_FIELD) data[i][1] = data[i][0];

//     if (data[i][1]) typeName = data[i][1];
//     else data[i][1] = typeName;
//   }

//   return data;
// };

// const setSheet2 = (rawData) => {
//   MTname = SHEET1.getRange("H1").getValue();
//   SHEET2.getRange("B1").setValue(MTname);

//   for (let i = 0; i < rawData.length; i++) {
//     setA(rawData, i);
//     setB(rawData, i);
//     setC(rawData, i);
//   }
// };

// const setA = (rawData, i) => {
//   const cell = SHEET2.getRange("A" + (4 + i) );

//   switch (rawData[i][1].replace(/\s+/g, "").toUpperCase()) {
//     case IFD_FIELD:     cell.setValue(FIELD); break;
//     case IFD_STRUCTURE: cell.setValue(STRUCTURE); break;
//     case IFD_TABLE:     cell.setValue(TABLE); break;
//   }
// };

// const setB = (rawData, i) => {
//   const type = rawData[i][0];
//   if (type === IFD_FIELD) return;
//   const cell = SHEET2.getRange("B" + (4 + i) );

//   cell.setValue(type);
// };

// const setC = (rawData, i) => {
//   const cell = SHEET2.getRange("C" + (4 + i) );

//   cell.setValue(rawData[i][3].replace(/\s+/g, ""));
// };

// const getLastRow = () => {
//   const startRow = 4; 
//   const column = 3; 

//   const data = SHEET2.getRange(startRow, column, SHEET2.getLastRow() - startRow + 1).getValues();

//   for (let i = data.length - 1; i >= 0; i--) {
//     if (data[i][0] !== "") return startRow + i;
//   }
//   return null;
// };

// const read = (lastRow) => {
//   return SHEET2.getRange("A4:C" + lastRow).getValues();
// };

// const resetValues = () => {
//   index = 0;
//   typeName = "";
//   size = -1;
// };

// const startDoc = MTname => {
//   result += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
//   result += applyIndent("<xsd:schema xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n", indent++);
//   result += applyIndent("<xsd:element name=\"" + MTname + "\">\n", indent++);
//   result += applyIndent("<xsd:complexType>\n", indent++);
//   result += applyIndent("<xsd:sequence>\n", indent++);
// };

// const endDoc = () => {
//   result += applyIndent("</xsd:sequence>\n", --indent);
//   result += applyIndent("</xsd:complexType>\n", --indent);
//   result += applyIndent("</xsd:element>\n", --indent);
//   result += applyIndent("</xsd:schema>\n", --indent);
// };

// const createMT = data => {

//   console.log(data)
  
//   startDoc(MTname);

//   for (let i = 0; i < data.length; i++) {

//     if (data[i][0] !== FIELD) {
//       index++;
//       if (!opened) {
//         if (data[i][0] === STRUCTURE) result += openElement(data[i], false);
//         else if (data[i][0] === TABLE) result += openElement(data[i], true);
//         typeName = data[i][1];
//         size = getSize(data, i, typeName);
//       }
//     }

//     insertElement(data[i]);

//     if (data[i][0] !== FIELD && index === size) {
//         result += closeElement();
//         resetValues();
//     }
//   }

//   endDoc();

//   console.log(result);
// };

// const applyIndent = (str, indent) => {
//   while (indent-- > 0) {
//     str = "    " + str;
//   }
//   return str;
// };

// const openElement = (row, isTable) => {
//   let opening = "";
//   opening += applyIndent(
//     ("<xsd:element name=\"" + row[1] + "\" minOccurs=\"0\"") + (isTable ? " maxOccurs=\"unbounded\"" : "") + ">\n", 
//     indent++
//   );
//   opening += applyIndent("<xsd:complexType>\n", indent++);
//   opening += applyIndent("<xsd:sequence>\n", indent++);

//   opened = true;
//   closed = false;
//   return opening;
// };

// const closeElement = () => {
//   let closing = "";
//   closing += applyIndent("</xsd:sequence>\n", --indent);
//   closing += applyIndent("</xsd:complexType>\n", --indent);
//   closing += applyIndent("</xsd:element>\n", --indent);

//   opened = false;
//   closed = true;
//   return closing;
// };

// const insertElement = row => {
//   const str = "<xsd:element name=\"" + row[2].replace(/\s+/g, "") + "\" type=\"xsd:string\" minOccurs=\"0\"/>\n";
//   result += applyIndent(str, indent);
// };

// const getSize = (data, i, typeName) => {
//   let size = 0;
//   while (i < data.length) {
//     if (data[i++][1] === typeName) size++;
//   }
//   return size;
// };

// const printMT = () => {
//   SHEET3.getRange("A1").setValue(result);
// };


