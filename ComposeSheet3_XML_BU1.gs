// function createMT() {
//   setMTname();
//   const result = create(read());
//   // console.log(result);
//   printMT(result);
// }

// const setMTname = () => {
//   if (MTname === "") MTname = SHEET2.getRange("B1").getValue();
// };

// let history = [];
// let latest;

// const create = data => {
  
//   const sequence = recurComplexType(schema, [ null, MTname ], true);
//   let ctName = "";
//   let parent = sequence;

//   for (let i = 0; i < data.length; i++) {

//     if (!opened) {
//       ctName = data[i][1];
//       opened = true;
//       switch (data[i][0]) {
//         case STRUCTURE : parent = recurComplexType(parent, data[i], true);  break;
//         case TABLE     : parent = recurComplexType(parent, data[i], false); break;
//       }
//     }
//     parent.addContent(createElement(data[i]));
    
//     if (opened) {
//       if (i + 1 === data.length || data[i + 1][1] !== ctName) {
//         opened = false;
//         ctName = "";
//         parent = sequence;
//       }
//     }
//   }

//   return XmlService.getPrettyFormat().format(XmlService.createDocument(schema));
// };

// const findTargets = (splitted) => {
//   let result = [ ...splitted ];
//   console.log("%% FIND TARGET HLIST : " + history.map(el => el.getAttribute("name")?.getValue()))
//   console.log("%% FIND TARGET R1 : " + result);

//   for (let i = 1; i < history.length; i++) {

//     console.log("%% FIND TARGET 1: " + history[i].getAttribute("name")?.getValue());
//     console.log("%% FIND TARGET 2: " + splitted[i - 1]);
//     console.log("%% FIND TARGET 3: " + (history[i].getAttribute("name")?.getValue() !== splitted[i - 1]));
//     if (history[i].getAttribute("name")?.getValue() !== splitted[i - 1]) {
//       result = result.filter((el, j) => {
//         console.log("%% FIND TARGET FILTER : " + (j >= i - 1));
//         if (j >= i - 1) return true;
//         else return false;
//       });
//       break;
//     }
//   }

//   console.log("%% FIND TARGET # RESULT: " + result)

//   if (latest === result[0]) result.shift();

//   return result;
// };

// const decideParent = (splitted, parent) => {
//   for (let i = 1; i < history.length; i++) {
//     console.log("#H : " + history.map(el => el.getAttribute("name")?.getValue()))
//     console.log("#H : " + history[i].getAttribute("name")?.getValue())
//     console.log("#S : " + splitted)
//     console.log("#S : " + splitted[i - 1])
//     console.log("#  : " + (history[i].getAttribute("name")?.getValue() !== splitted[i - 1]))

//     if (history[i].getAttribute("name")?.getValue() !== splitted[i - 1]) {
//       const foundParent = history[i - 1].getChildren()
//                                         .flatMap(child => child.getChildren())
//                                         .filter(grandChild => grandChild.getName() === "sequence")[0];
//       history = history.filter((el, j) => j <= i - 1);
//       return foundParent;
//     }

//     if (i === history.length - 1 && i - 1 < splitted.length - 1) {
//       for (let k = i; k < splitted.length; k++) {
//         if (splitted[k] !== history[i]) {
//           const foundParent = history[i].getChildren()
//                                         .flatMap(child => child.getChildren())
//                                         .filter(grandChild => grandChild.getName() === "sequence")[0];
//           return foundParent;
//         }
//       }
//     }
//   }
//   return parent;
// };

// const getElementName = el => el.getAttribute("name")?.getValue();

// const recurComplexType = (parent, content, isStructure) => {

//   const splitted = content[1].split("/");
//   const elNameList = findTargets(splitted);
//   console.log("@@ elNameList : " + elNameList)

//   const recur = (recurParent) => {
//     if (elNameList.length === 0) return recurParent;
    
//     const actualParent = decideParent(splitted, recurParent);
//     const sequence = openComplexType(actualParent, elNameList.shift(), isStructure);
//     const element = sequence.getParentElement().getParentElement();

//     // T_GEN이 두 번 들어가는 문제 및 결과물에 T_GEN이 한 번 더 붙는 문제가 있음. 
//     history.push(element);
//     latest = getElementName(element);
//     console.log("### PUSHED : " + history.map(el => el.getAttribute("name")?.getValue()))
    
//     return recur(sequence);
//   };
//   return recur(parent);
// };

// const openComplexType = (parent, name, isStructure) => {

//   const element     = isStructure ? 
//                       XmlService.createElement("element", xsdns).setAttribute("name", name) : 
//                       XmlService.createElement("element", xsdns).setAttribute("name", name)
//                                                                 .setAttribute("minOccurs", "0")
//                                                                 .setAttribute("maxOccurs", "unbounded");
//   const complexType = XmlService.createElement("complexType", xsdns);
//   const sequence    = XmlService.createElement("sequence", xsdns);

//   parent.addContent(element);
//   element.addContent(complexType);
//   complexType.addContent(sequence);

//   return sequence;
// };

// const createElement = (element) => {
//   return XmlService.createElement("element", xsdns)
//     .setAttribute("name", element[2])
//     .setAttribute("type", "xsd:string")
//     .setAttribute("minOccurs", element[3])
//     .setAttribute("maxOccurs", element[4]);
// };

// const read = () => {
//   return SHEET2.getRange("A4:F" + lastRow).getValues();
// };

// const printMT = (result) => {
//   SHEET3.getRange("A1").setValue(result);
// };


