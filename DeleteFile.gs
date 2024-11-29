const deleteFile = () => {
  try {
    var file = DriveApp.getFileById(getFileId());
    
    file.setTrashed(true); 
    
    Logger.log("파일이 삭제되었습니다: " + file.getName());
  } catch (e) {
    Logger.log("파일 삭제 중 오류 발생: " + e.message);
  }
};

const getFileId = () => SHEET3.getRange("A1").getValue().split("id=")[1];