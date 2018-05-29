var request = require('request');
var cheerio = require('cheerio');
const randomPageUrl = 'https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard';  // url for random wikipedia page
const word = 'président';  // coulld any word but (spoiler alert!) "président" appears pretty often.
const maxCalls = 100;
var bool = false;
var nb = 0;
var count =0;

//do{
//boucle arret si boucle infini et arret si boolean = true
while(nb<maxCalls || count == 1){
  //va sur URL
request(randomPageUrl, function (error, response, body) {
  if (!error) {
    var cheerioPage = cheerio.load(body)

    //chargement du html
    var title = cheerioPage('title').text();
    var content = cheerioPage('p').text();

    //parser en string propre
    var arrayOfStrings = content.split(/[.,\/ -]/);
    var url = title.replace(/— Wikipédia/i, '');

    //boucle de recherche du mot dans le string propre
    for (var i=0; i < arrayOfStrings.length; i++){
      //si le mot alors log
      if(arrayOfStrings[i] == word){
        bool = true;
        count =1;
        console.log('the word : "' + word + '" is in the page :');
        console.log('URL: https://fr.wikipedia.org/wiki/' + url);
        console.log('Title: ' + title);
        console.log('-------------------------');
        break;
      }
    }
  }else {
    console.log("We’ve encountered an error: " + error);
  }
});
console.log(count);
nb++;
}
//while(bool != true && nb<maxCalls);
