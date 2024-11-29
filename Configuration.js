function myFunction() {
  
}

// 시트 이름 지정
const SHEET_NAME_RAW_DATA       = "Step1";
const SHEET_NAME_EXTRACTED_DATA = "Step2";
const SHEET_NAME_RESULT         = "Result";

// Configuration 범위 지정
const CONFIGURATION_START = "24";
const CONFIGURATION_END   = "26";

// 시트 내의 데이터 타입 식별명(==드롭다운 값) 정의
const FIELD         = "Field";
const STRUCTURE     = "Structure";
const TABLE         = "Table";
const SELECT        = "- Select -"

// 인터페이스 정의서에서 사용된 타입 식별명 정의
const IFD_FIELD     = "단일필드";
const IFD_STRUCTURE = "STRUCTURE";
const IFD_TABLE     = "TABLE";

// Occurrence 설정
const MIN_OCCURS = "0";
const STRUCTURE_MAX_OCCURS = "1";
const TABLE_MAX_OCCURS = "unbounded";

// 테스트 데이터에 사용될 더미 값
const DUMMY_VALUE = "1";

// 이하 전역 변수
let indent          = 0;
let opened          = false;
let closed          = true;
let typeName        = "";
let size           =  -1;
let index           = 0;
let result          = "";
let MTname          = "";
let occurrences     = null;
let lastRow         = -1;
let lastDataIndex   = 0;

// 네임스페이스 정의
const xsdns = XmlService.getNamespace("xsd", "http://www.w3.org/2001/XMLSchema");
// 루트 요소 생성: <xsd:schema>
const schema = XmlService.createElement("schema", xsdns);

// 설정값
let dateFormat  = "";
let timestampFormat = "";
let tableCount      = -1;

// 시트
const SHEET1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_RAW_DATA);
const SHEET2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_EXTRACTED_DATA);
const SHEET3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_RESULT);

const configure = (() => {
  const configurationValues = SHEET1.getRange("F" + CONFIGURATION_START + ":" + "H" + CONFIGURATION_END).getValues();
  configurationValues.forEach(config => {
    switch (config[0]) {
      case "Timestamp Format" : timestampFormat = config[2]; break;
      case "Date Format"      : dateFormat = config[2]; break;
      case "Table Count"      : tableCount = config[2]; break;
    }
  });
})();





















