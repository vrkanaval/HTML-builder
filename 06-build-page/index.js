const fs = require('fs');
const path = require('path');

async function buildPage() {
    try {
        // Step1: Create project-dist directory   
        await fs.promises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

        // Step 2. Read, replace and write HTML-file
        const templateHtml = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');
        let resultHtml = templateHtml;
        const components = await fs.promises.readdir(path.join(__dirname, 'components'));
        for (const component of components) {
            const componentHtml = await fs.promises.readFile(path.join(__dirname, 'components', component), 'utf8');
            resultHtml = resultHtml.replace(new RegExp(`{{${component.replace('.html', '')}}}`, 'g'), componentHtml);
        }
        await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), resultHtml);

        // Step 3. Collect and write CSS-files
        const cssFiles = await fs.promises.readdir(path.join(__dirname, 'styles'));
        let css = '';
        for (const file of cssFiles) {
            css += await fs.promises.readFile(path.join(__dirname, 'styles', file), 'utf8');
        }
        await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), css);

        // Step 4. Copy assets
        await fs.promises.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });
        const assets = await fs.promises.readdir(path.join(__dirname, 'assets'));

        for (const asset of assets) {
            const oldPath = path.join(__dirname, 'assets', asset);
            const newPath = path.join(__dirname, 'project-dist', 'assets', asset);
            const stat = await fs.promises.stat(oldPath);

            if (stat.isFile()) {
                await fs.promises.copyFile(oldPath, newPath);
            }
            else if (stat.isDirectory()) {
                await fs.promises.mkdir(newPath, { recursive: true });
                const files = await fs.promises.readdir(oldPath);

                for (const file of files) {
                    const oldFilePath = path.join(oldPath, file);
                    const newFilePath = path.join(newPath, file);
                    await fs.promises.copyFile(oldFilePath, newFilePath);
                }
            }
        }

    } catch (err) {
        console.error(err);
    }
}

buildPage();