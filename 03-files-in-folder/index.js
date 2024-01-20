const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true })
  .then(files => {
    files.forEach(file => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        fs.stat(filePath)
          .then(fileStat => {
            const fileSizeKb = fileStat.size / 1024;
            const fileNameExt = path.parse(file.name).ext.slice(1);
            const fileName = path.parse(file.name).name;
            
            console.log(`${fileName} - ${fileNameExt} - ${fileSizeKb}kb`);
          })
          .catch(console.error);
      }
    });
  })
  .catch(console.error);