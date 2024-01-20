const fs = require('fs').promises;
const path = require('path');

const sourcePath = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(sourcePath)
.then(files => {
    const promises = files.map(file => {
        if(path.extname(file) === '.css'){
            const cssFilePath = path.join(sourcePath, file);
            return fs.stat(cssFilePath)
            .then(stat => {
                if (stat.isFile()) {
                    return fs.readFile(cssFilePath, 'utf-8');
                }
            });
        }
    });

    return Promise.all(promises);
})
.then(cssFilesData => {
    return fs.writeFile(bundleFile, cssFilesData.join('\n'));
})
.then(() => console.log('The bundle.css file has been saved!'))
.catch(err => console.error(err));