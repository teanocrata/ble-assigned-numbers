const fs = require('fs');
const pdf = require('pdf-parse');
 
let dataBuffer = fs.readFileSync('16-bit UUID Numbers Document.pdf');

pdf(dataBuffer).then(function(data) {
 
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    const regex = /(^.*)(\dx\w{4})(?:\n?)(.*)/gm;
    // console.log(data.text);
    let m;

    const result = [];
    while ((m = regex.exec(data.text)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });

        result.push({
            type: m[1],
            UUID: m[2],
            for: m[3]
        })
    }

    console.log(result);
    fs.writeFileSync('dist/16-bit UUID Numbers Document.json', JSON.stringify(result, null, 2));

});