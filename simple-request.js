var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

var categoryId = [];

request('https://www.bankmega.com/promolainnya.php', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
//   fs.writeFileSync('output.html', body);

    var $ = cheerio.load(body);
    var test = $('#subcatpromo').children().contents().each((i, value) => {
        // console.log(value.attribs.id);
        categoryId.push(value.attribs.id);
    }); 

    var trimmedBody = body.replace(/\s/g,"").replace(/[\n\t\r]/g,"");
    // console.log(trimmedBody);

    fs.writeFileSync('outputtrim.txt', trimmedBody);

    var testText = trimmedBody.match(
        /\$\("#dailyneeds"\).click\(function\(\){\$\("#contentpromolain2"\).load\("ajax.promolainnya.php(\?.[^"]*)/
    );
    console.log(testText[1]);

});