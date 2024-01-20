const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

function copyDir(src, dest) {
    fs.mkdir(dest, { recursive: true }, (err) => {
        if (err) throw err;

        // destination directory
        fs.readdir(dest, (err, destFiles) => {
            if (err) throw err;

            // source directory
            fs.readdir(src, (err, srcFiles) => {
                if (err) throw err;

                // remove all files in destination that are not in the source
                destFiles.forEach(file => {
                    if (!srcFiles.includes(file)) {
                        fs.unlink(path.join(dest, file), err => {
                            if (err) throw err;
                        });
                    }
                });

                // copy all files from the source to the destination
                srcFiles.forEach(file => {
                    const srcFile = path.join(src, file);
                    const destFile = path.join(dest, file);

                    fs.stat(srcFile, (err, stat) => {
                        if (err) throw err;

                        if (stat.isDirectory()) {
                            copyDir(srcFile, destFile);
                        } else {
                            fs.copyFile(srcFile, destFile, err => {
                                if (err) throw err;
                            });
                        }
                    });
                });
            });
        });
    });
}

copyDir(sourcePath, destPath);