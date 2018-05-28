var request = require('request');
var cheerio = require('cheerio');
const constant = "node";


var url = "https://fr.wikipedia.org/wiki/Node.js";

request(url, function (error, response, body) {
  if (!error) {
    var cheerioPage = cheerio.load(body)

    var title = cheerioPage('title').text();
    var content = cheerioPage('p').text()
    //content =  content.split(",");
    //var content = $('body').text();
  //  var freeArticles = $('.central-featured-lang.lang1 a small').text()
    var arrayOfStrings = content.split(/[.,\/ -]/);
    //var arrayOfStrings = content.split(",");
    //console.log('URL: ' + url);
    //console.log('Title: ' + title);
    for (var i=0; i < arrayOfStrings.length; i++){
      if(arrayOfStrings[i] == constant){
        console.log('Le mot : "' + constant + '" a été trouvé dans la page :');
        console.log('URL: ' + url);
        console.log('Title: ' + title);
        console.log('------------------------------');
      }
    //console.log(arrayOfStrings[i]);
}
  //  console.log("le mot n'est pas dans l'URL");
    //console.log('Content: '+ content);
    //console.log('EN articles: ' + freeArticles);
  }
  else {
    console.log("We’ve encountered an error: " + error);
  }
});
