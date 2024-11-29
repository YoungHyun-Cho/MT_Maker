function createMT() {
  setMTname();
  setLastRow();
  const result = create(read());
  console.log(result);
  printMT(result);
}

const setMTname = () => {
  if (MTname === "") MTname = SHEET2.getRange("B1").getValue();
};

let history = [];
let latest;

const create = data => {
  
  const sequence = openComplexType(schema, MTname, true);
  let parent = sequence;
  let currentEl = null;

  for (let i = 0; i < data.length; i++) {

    if (currentEl !== data[i][1]) {
      parent = sequence;
      currentEl = data[i][1];
      const elList = data[i][1].split("/");
      
      for (let j = 0; j < elList.length; j++) {
        const foundEl = findElementByName(parent, elList[j]);
        if (foundEl) {
          parent = findSequence(foundEl);
        }
        else {
          if (data[i][0] === STRUCTURE) parent = openComplexType(parent, elList[j], true);
          else if (data[i][0] === TABLE) parent = openComplexType(parent, elList[j], false);
        }
      }
    }
    parent.addContent(createElement(data[i]));
  }

  return XmlService.getPrettyFormat().format(XmlService.createDocument(schema));
};

const openComplexType = (parent, name, isStructure) => {

  const element     = isStructure ? 
                      XmlService.createElement("element", xsdns).setAttribute("name", name) : 
                      XmlService.createElement("element", xsdns).setAttribute("name", name)
                                                                .setAttribute("minOccurs", "0")
                                                                .setAttribute("maxOccurs", "unbounded");
  const complexType = XmlService.createElement("complexType", xsdns);
  const sequence    = XmlService.createElement("sequence", xsdns);

  parent.addContent(element);
  element.addContent(complexType);
  complexType.addContent(sequence);

  return sequence;
};

const createElement = (element) => {
  return XmlService.createElement("element", xsdns)
    .setAttribute("name", element[2])
    .setAttribute("type", "xsd:string")
    .setAttribute("minOccurs", element[3])
    .setAttribute("maxOccurs", element[4]);
};

const read = () => SHEET2.getRange("A4:F" + lastRow).getValues();

const getElementName = el => el.getAttribute("name")?.getValue();

const printMT = (result) => {
  SHEET3.getRange("A1").setValue(result);
};

const findElementByName = (element, nameValue) => {

  if (element.getAttribute("name")?.getValue() === nameValue) return element;

  const children = element.getChildren();
  for (let i = 0; i < children.length; i++) {
    const found = findElementByName(children[i], nameValue);
    if (found) return found;
  }
  return null;
};

const findSequence = (element) => {
  const children = element.getChildren();

  for (let i = 0; i < children.length; i++) {
    const grandchildren = children[i].getChildren();

    for (let j = 0; j < grandchildren.length; j++) {
      if (grandchildren[j].getName() === "sequence") {
        return grandchildren[j];
      }
    }
  }
  return null;
};























