const ff = require('../functions/file.functions')
var minify = require('html-minifier').minify;

module.exports = async () => {
    const contentFoleder = 'src/content/'
    const header = await ff.getContent(contentFoleder + 'header.html')
    const home = await ff.getContent(contentFoleder + 'pages/home.html')
    const footer = await ff.getContent(contentFoleder + 'footer.html')
    const content = (header + home + footer)
        .replaceAll('${title}', "Home")
    ff.writeContent('build/index.html', minify(content, {
        trimCustomFragments: true,
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
    }));
}