let request = require('request');
let cheerio = require('cheerio');
const randomPageUrl = 'https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard';  // url for random wikipedia page
const word = 'président';  // coulld any word but (spoiler alert!) "président" appears pretty often.
const maxCalls = 100;
//let bool = false;
let nb = 0;
let count =0;

//do{
//boucle arret si boucle infini et arret si boolean = true
while(nb<maxCalls || count == 1){
  //va sur URL
request(randomPageUrl, function (error, response, body) {
  if (!error) {
    let cheerioPage = cheerio.load(body)

    //chargement du html
    let title = cheerioPage('title').text();
    let content = cheerioPage('p').text();

    //parser en string propre
    let arrayOfStrings = content.split(/[.,\/ -]/);
    let url = title.replace(/— Wikipédia/i, '');

    //boucle de recherche du mot dans le string propre
    for (let i=0; i < arrayOfStrings.length; i++){
      //si le mot alors log
      if(arrayOfStrings[i] == word){
        //bool = true;
        count =1;
        console.log('--------WIKIPEDIA SCRAPE--------');
        console.log('The word : "' + word + '" is in the page :');
        console.log('URL : https://fr.wikipedia.org/wiki/' + url);
        console.log('Title : ' + title);
        console.log('--------------------------------');

        break;
      }
      if(count == 1){break};
    }
  }else {
    console.log("Error: " + error);
  }
});
nb++;
}
