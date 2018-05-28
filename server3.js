var request = require('request');
var cheerio = require('cheerio');
const randomPageUrl = 'https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard';  // url for random wikipedia page
const word = 'président';  // coulld any word but (spoiler alert!) "président" appears pretty often.
const maxCalls = 100;
var bool = false;
var nb = 0;

loop: do{
request(randomPageUrl, function (error, response, body) {
  if (!error) {
    var cheerioPage = cheerio.load(body)

    var title = cheerioPage('title').text();
    var content = cheerioPage('p').text();
    var arrayOfStrings = content.split(/[.,\/ -]/);

    for (var i=0; i < arrayOfStrings.length; i++){
      if(arrayOfStrings[i] == word){

        //var url = ('URL: https://fr.wikipedia.org/wiki/' + url)
        //title.remove(" — Wikipédia");
        bool = true;
        console.log('Le mot : "' + word + '" a été trouvé dans la page :');
        console.log('URL: https://fr.wikipedia.org/wiki/' + title);
        console.log('Title: ' + title);
        console.log('-------------------------');
        break;
        return;
      }
      //break loop;
}

  }else {
    console.log("We’ve encountered an error: " + error);
  }
});
if (nb==6) {
  console.log('while break');
  break loop
}
nb++;
}while(nb<maxCalls & bool != true);
