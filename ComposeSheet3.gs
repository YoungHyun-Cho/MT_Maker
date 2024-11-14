function createMT() {
  create(read(getLastRow()));
  printMT();
}

const create = data => {
  
  startDoc();

  for (let i = 0; i < data.length; i++) {

    if (data[i][0] !== FIELD) {
      index++;
      if (!opened) {
        if (data[i][0] === STRUCTURE) result += openElement(data[i], false);
        else if (data[i][0] === TABLE) result += openElement(data[i], true);
        typeName = data[i][1];
        size = getSize(data, i, typeName);
      }
    }

    insertElement(data[i]);

    if (data[i][0] !== FIELD && index === size) {
        result += closeElement();
        resetValues();
    }
  }

  endDoc();
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

const read = (lastRow) => {
  return SHEET2.getRange("A4:E" + lastRow).getValues();
};

const resetValues = () => {
  index = 0;
  typeName = "";
  size = -1;
};

const startDoc = () => {
  result += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
  result += applyIndent("<xsd:schema xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n", indent++);
  result += applyIndent("<xsd:element name=\"" + MTname + "\">\n", indent++);
  result += applyIndent("<xsd:complexType>\n", indent++);
  result += applyIndent("<xsd:sequence>\n", indent++);
};

const endDoc = () => {
  result += applyIndent("</xsd:sequence>\n", --indent);
  result += applyIndent("</xsd:complexType>\n", --indent);
  result += applyIndent("</xsd:element>\n", --indent);
  result += applyIndent("</xsd:schema>\n", --indent);
};

const applyIndent = (str, indent) => {
  while (indent-- > 0) {
    str = "    " + str;
  }
  return str;
};

const openElement = (row, isTable) => {
  let opening = "";
  opening += applyIndent(
    ("<xsd:element name=\"" + row[1] + "\" minOccurs=\"" + MIN_OCCURS + "\"") + " maxOccurs=\"" + 
    (isTable ? TABLE_MAX_OCCURS : STRUCTURE_MAX_OCCURS) + "\">\n", 
    indent++
  );
  opening += applyIndent("<xsd:complexType>\n", indent++);
  opening += applyIndent("<xsd:sequence>\n", indent++);

  opened = true;
  closed = false;
  return opening;
};

const closeElement = () => {
  let closing = "";
  closing += applyIndent("</xsd:sequence>\n", --indent);
  closing += applyIndent("</xsd:complexType>\n", --indent);
  closing += applyIndent("</xsd:element>\n", --indent);

  opened = false;
  closed = true;
  return closing;
};

const insertElement = row => {
  const str = "<xsd:element name=\"" + row[2].replace(/\s+/g, "") + "\" type=\"xsd:string\" minOccurs=\"" + 
  row[3] + "\"" + " maxOccurs=\"" + row[4] + "\"/>\n";
  result += applyIndent(str, indent);
};

const getSize = (data, i, typeName) => {
  let size = 0;
  while (i < data.length) {
    if (data[i++][1] === typeName) size++;
  }
  return size;
};

const printMT = () => {
  SHEET3.getRange("A1").setValue(result);
};


