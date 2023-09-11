const ff = require('../functions/file.functions')
var minify = require('html-minifier').minify;

module.exports = async () => {
    const contentFoleder = 'src/content/'
    const header = await ff.getContent(contentFoleder + 'header.html')
    const home = await ff.getContent(contentFoleder + 'pages/home.html')
    const footer = await ff.getContent(contentFoleder + 'footer.html')
    // console.log(header + home + footer)
    ff.writeContent('build/index.html', minify(header + home + footer, {
        trimCustomFragments: true,
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true
    }));
}