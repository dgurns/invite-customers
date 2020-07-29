const fs = require('fs');
const util = require('util');

const getFileData = async (file) => {
  const readFile = util.promisify(fs.readFile);
  try {
    const fileData = await readFile(file);
    return fileData;
  } catch {
    return;
  }
};

const parseFileDataAsArray = (fileData) => {
  const fileDataAsString = fileData.toString();
  if (!fileDataAsString) {
    return;
  }
  const fileDataAsArray = fileDataAsString.split('\n');
  try {
    return fileDataAsArray.map((item) => JSON.parse(item));
  } catch {
    return;
  }
};

module.exports = {
  getFileData,
  parseFileDataAsArray,
};
