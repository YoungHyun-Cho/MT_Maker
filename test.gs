function manipulateXML() {
  // 네임스페이스 정의
  const xsdNamespace = XmlService.getNamespace("xsd", "http://www.w3.org/2001/XMLSchema");

  // 루트 요소 생성: <xsd:schema>
  const schema = XmlService.createElement("schema", xsdNamespace);

  // <xsd:element> 추가
  const element = XmlService.createElement("element", xsdNamespace)
    .setAttribute("name", "ExampleElement");
  schema.addContent(element);

  // <xsd:complexType> 추가
  const complexType = XmlService.createElement("complexType", xsdNamespace);
  const sequence = XmlService.createElement("sequence", xsdNamespace);
  complexType.addContent(sequence);
  element.addContent(complexType);

  // <xsd:element> 내부에 하위 요소 추가
  const childElement = XmlService.createElement("element", xsdNamespace)
    .setAttribute("name", "ChildElement")
    .setAttribute("type", "xsd:string")
    .setAttribute("minOccurs", "1")
    .setAttribute("maxOccurs", "unbounded");
  sequence.addContent(childElement);

  // XML 문서 생성
  const document = XmlService.createDocument(schema);

  // XML 문자열로 변환 및 출력
  const xmlString = XmlService.getPrettyFormat().format(document);
  console.log(xmlString);
}
