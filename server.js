// pour lancer sur UTC : 
// "node index.js env TZ='UTC'"


//L'application requiert l'utilisation du module Express.
//La variable express nous permettra d'utiliser les fonctionnalités du module Express.  
const express = require('express');

// module necessaire
const bodyParser = require("body-parser");

// Nous définissons ici les paramètres du serveur.
let hostname = 'localhost';
let port = 8080;
// Nous créons un objet de type Express. 
let app = express();
//Afin de faciliter le routage (les URL que nous souhaitons prendre en charge dans notre API), nous créons un objet Router.
//C'est à partir de cet objet router, que nous allons implémenter les méthodes. 
let router = express.Router();


// urlencoded is for bodies that have UTF-8 encoding.
// {extended: true} to use nested objects.
app.use(bodyParser.urlencoded({ extended: true }));
// Parse json with body-parser
app.use(bodyParser.json());

const dict = {
      1: "Pouce vers le haut",
      2: "Pouce vers le bas",
};


router.post("/Signe", (request, response, next) => {
      if (dict[request.body.id] === undefined) {
            console.log("Ce signe n'existe pas")
            response.status(404).json({
                  erreur: "Aucun signe correspondant"
            });
          
      }
      else {
            
            response.status(200).json({
                  "Signe": dict[request.body.id]
            });            
            console.log(dict[request.body.id])
      }

});


// Nous demandons à l'application d'utiliser notre routeur
app.use(router);

// Démarrer le serveur 
app.listen(port, hostname, function () {
      console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});