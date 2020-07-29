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

const parseFileDataAsJson = (fileData = '') => fileData.toString().split('\n');

module.exports = {
  getFileData,
  parseFileDataAsJson,
};
