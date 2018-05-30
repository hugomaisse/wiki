let request = require('request');
let cheerio = require('cheerio');
var rp = require('request-promise');
const randomPageUrl = 'https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard';  // url for random wikipedia page
const word = 'président';  // coulld any word but (spoiler alert!) "président" appears pretty often.
const maxCalls = 100;
let nb = 0;
let count =0; //Marche comme un Boolean

async function parser(){
  //boucle arret si boucle infini et arret si boolean = true
    while(nb<maxCalls && count != 1){
await rp(randomPageUrl)
        .then(function (body) {
            //scrape + parse la page HTML du wikipedia aléa
            let cheerioPage = cheerio.load(body)
            let title = cheerioPage('title').text();
            let content = cheerioPage('p').text();
            //modifier en string propre
            //on créé une array avec tout les mots venant des balise <p> du html
            let arrayOfStrings = content.split(/[.,\/ -]/);
            //netoyage du title pour avoir l'url de wikipedia
            let url = title.replace(/— Wikipédia/i, '');
            //boucle de recherche du mot dans notre array
            for (let i=0; i < arrayOfStrings.length; i++){
              //si le mot est == alors OK
              if(arrayOfStrings[i] == word){
                count =1;
                let message = ('\n--------WIKIPEDIA SCRAPE--------\n'
                + 'The word : "' + word + '" is in the page :\n'
                + 'URL : https://fr.wikipedia.org/wiki/' + url +'\n'
                + 'Title : ' + title +'\n'
                + '--------------------------------');
                console.log(message);
                //si il en trouve un break du if
                break;
              }
              //si il en trouve un break du for
              if(count == 1){break};
            }
        })
        //gestion des erreurs
        .catch(function (err) {
            console.log("Error: " + error);
        });
        //iteration <100
        nb++;
        //si dépasse le nb 100 alors log
        if (nb == 100){console.log('try again please')}
        //message de suivi pour l'avancement du scrape et parse
        if(count != 1){
            console.log('No result for the URL : ' + nb);
        };
        }
  }

//lancement de la fonction parser
  parser();
