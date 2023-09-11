const { baseUrl, siteTitle } = require('../configs/app.config')
const ff = require('../functions/file.functions')

const contentFoleder = 'src/content/'
async function generate(title, fileName, dir = false) {
    const header = await ff.getContent(contentFoleder + 'header.html')
    const home = await ff.getContent(contentFoleder + `pages/${fileName}.html`)
    const footer = await ff.getContent(contentFoleder + 'footer.html')
    const content = (header + home + footer)
        .replaceAll('${title}', title)
        .replaceAll('${baseUrl}', baseUrl)
        .replaceAll('${siteTitle}', siteTitle)
    if (dir) {
        ff.writeMinifiedHtml(content, 'index', fileName + "/", true)
    } else {
        ff.writeMinifiedHtml(content, fileName)
    }
}

module.exports = async () => {
    generate("Home", 'index')
    generate("About", 'about', true)
    generate("Contact", 'contact', true)
}