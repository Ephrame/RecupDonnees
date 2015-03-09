
var mongoose = require('mongoose');//mongoose

var connection = function () {
   console.log("Je suis dans la base Twitter ======================================");
    if (mongoose.connection.readyState == 0) {
        mongoose.connect('mongodb://localhost/twitter', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("----------------Connexion à la Base Twitter -------------");
            }
        });
    }
};

connection();

var schemaTT = mongoose.Schema({
    name: {type: String, unique: true},
    formate: {type: String},
    tweets: {type: String},
    tabTweets:[],
    motsClefs: [],
    date: Date
});

var modelTrending = mongoose.model('Trending', schemaTT);

//---------------------------------------------------------------

exports.supprimerTout = function () {
    modelTrending.remove("*", function (err) {
        if (err)
            console.log('Erreur ');
        else
            console.log('Achete toi des lunettes !!!!!!!');
    });

};


//-----------------------------------------------------------------
exports.trouverTout = function (cb) // todo passer cb en arg pr une valeur de retour
{
    modelTrending.find("*", function (err, rep) {
        if (err) {
            console.log(err);
            //return false ;
        } else {
            if (rep == null) {
                console.log("pas de reponse ! ");
                //return false ;
            } else {
                //console.log(rep);
               cb(rep);
            }
        }

    });

};


//----------------------------------------------------------------------
exports.sauvegarder = function (obj) {
    var Trending = new modelTrending(obj);
    Trending.save(function (err) {
        if (err) {
          //  console.log(err);
            console.log("Enregistrement en Base Twitter non possible");
        } else {
            console.log("=================================== Enregistrement en Base Twitter ============================");
        }

    });

};


//----------------------------------------------------------------------
exports.miseAJour = function (obj) {
    var Trending = new modelTrending(obj);
    Trending.update({"motsClefs": obj.motsClefs}, function (err) {
        if (err) {
            console.log("C'est pas bon");
        } else {
            console.log("------------------------------- Mise à jour de la base Twitter -------------------------");
        }

    });

};
//exports.supprimerTout();
//console.log("------------Demarrage de la base twitter-----------------------");
//var json = {};
//exports.trouverTout(function(json){console.log(json)});