const fs = require('fs')
const minify = require('html-minifier').minify;

function getContent(src) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                console.error(err);
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}
async function writeContent(src, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(src, content, { flag: 'w' }, (err, data) => {
            if (err) {
                console.error(err);
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}
async function mkdir(dirName) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirName, (err, data) => {
            if (err) {
                console.error('mkdir error', err);
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}
async function rm(dirName) {
    return new Promise((resolve, reject) => {
        fs.rm(dirName, {
            recursive: true
        }, (err, data) => {
            if (err) {
                console.error('rm error : ', err);
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}
async function writeMinifiedHtml(content, fileName, dirName = "", removePreviousDir = false) {
    const actualDirName = `build/${dirName}`
    let dirExists = fs.existsSync(actualDirName)
    if (dirName) {
        if (dirExists && removePreviousDir) {
            await rm(actualDirName)
            dirExists = false
        }
        if (!dirExists) {
            await mkdir(actualDirName)
        }
    }
    return writeContent(actualDirName + fileName + '.html', minify(content, {
        trimCustomFragments: true,
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
    }))
}

module.exports = {
    getContent, writeContent, writeMinifiedHtml
}