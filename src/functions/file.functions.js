const fs = require('fs')

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
        fs.writeFile(src, content, (err, data) => {
            if (err) {
                console.error(err);
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

module.exports = {
    getContent, writeContent
}