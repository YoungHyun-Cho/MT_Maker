function createTestData () {
  readData();
  const data = read();
  const testData = generateEach(data);
  const result = multiply(data, testData);
  printJSON(download(result));
}

const generateEach = data => {

  const testData = {};
  let index = "0";

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "Field") {
      if (data[i][5] === "PK") testData[data[i][2]] = index;
      else if (data[i][5] === "Date") testData[data[i][2]] = formatCurrentDate(dateFormat);
      else if (data[i][5] === "Timestamp") testData[data[i][2]] = formatCurrentDate(timestampFormat);
      else testData[data[i][2]] = DUMMY_VALUE;
    }
    else if (data[i][0] === "Table") {
      if (!testData[data[i][1]]) testData[data[i][1]] = [{}];
      if (data[i][5] === "PK") testData[data[i][1]][0][data[i][2]] = index;
      else if (data[i][5] === "Date") testData[data[i][1]][0][data[i][2]] = formatCurrentDate(dateFormat);
      else if (data[i][5] === "Timestamp") testData[data[i][1]][0][data[i][2]] = formatCurrentDate(timestampFormat);
      else testData[data[i][1]][0][data[i][2]] = DUMMY_VALUE;
    }
    else if (data[i][0] === "Structure") {
      if (!testData[data[i][1]]) testData[data[i][1]] = {};
      if (data[i][5] === "PK") testData[data[i][1]][data[i][2]] = index;
      else if (data[i][5] === "Date") testData[data[i][1]][data[i][2]] = formatCurrentDate(dateFormat);
      else if (data[i][5] === "Timestamp") testData[data[i][1]][data[i][2]] = formatCurrentDate(timestampFormat);
      else testData[data[i][1]][data[i][2]] = DUMMY_VALUE;
    }
  }
  return testData;
};

const multiply = (data, testData) => {

  const tableList = getTableList(data);
  let pkList = [];
  
  for (let i = 0; i < tableList.length; i++) {
    pkList = getPkList(data, tableList[i]);
    for (let index = 1; index < tableCount; index++) {
      testData[tableList[i]].push(copy(testData[tableList[i]][testData[tableList[i]].length - 1], pkList, index));
    }
  }

  return testData;
};

const copy = (obj, pkList, index) => {
  const objKeys = Object.keys(obj);
  const copied = {};

  for (let i = 0; i < objKeys.length; i++) {
    if (pkList.includes(objKeys[i])) copied[objKeys[i]] = index + "";
    else copied[objKeys[i]] = obj[objKeys[i]];
  }

  return copied;
};

const getTableList = data => {
  const tableList = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "Table" && !tableList.includes(data[i][1])) {
      tableList.push(data[i][1]);
    }
  }
  return tableList;
};

const getPkList = (data, table) => {
  const pkList = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === table && data[i][5] === "PK") {
      pkList.push(data[i][2]);
    }
  }
  return pkList;
};

const getCount = (data, table) => {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] === table) count++;
  }
  return count;
};

const formatCurrentDate = format => {
    const now = new Date();

    const components = {
        YYYY: now.getFullYear(),
        MM: String(now.getMonth() + 1).padStart(2, '0'),
        DD: String(now.getDate()).padStart(2, '0'),
        HH: String(now.getHours()).padStart(2, '0'),
        mm: String(now.getMinutes()).padStart(2, '0'),
        SS: String(now.getSeconds()).padStart(2, '0')
    };

    return format.replace(/YYYY|MM|DD|HH|mm|SS/g, (match) => components[match]);
}

const download = result => {
  try {
   
    let fileContent = JSON.stringify(result);
    
    let fileName = "TEST_DATA_" + formatCurrentDate("YYYYMMDD") + ".json";
    
    let file = DriveApp.createFile(fileName, fileContent, MimeType.PLAIN_TEXT);
    
    let fileId = file.getId();
    let downloadLink = "https://drive.google.com/uc?export=download&id=" + fileId;
    
    Logger.log("파일이 생성되었습니다: " + file.getName());
    Logger.log("다운로드 링크: " + downloadLink);
    
    return downloadLink; // 필요에 따라 다운로드 링크 반환
  } catch (e) {
    Logger.log("파일 생성 중 오류 발생: " + e.message);
    return null;
  }
};

const printJSON = result => {
  SHEET3.getRange("A1").setValue(result);
};