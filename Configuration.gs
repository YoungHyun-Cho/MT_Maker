function myFunction() {
  
}

// 시트 이름 지정
const SHEET_NAME_RAW_DATA       = "Step1";
const SHEET_NAME_EXTRACTED_DATA = "Step2";
const SHEET_NAME_RESULT         = "Result"

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

// 이하 전역 변수
let indent      = 0;
let opened      = false;
let closed      = true;
let typeName    = "";
let size        = -1;
let index       = 0;
let result      = "";
let MTname      = "";
let occurrences = null;

// 이하 전역 상수
const SHEET1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_RAW_DATA);
const SHEET2= SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_EXTRACTED_DATA);
const SHEET3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME_RESULT);