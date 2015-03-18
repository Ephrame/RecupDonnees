var util = require("util");
var mongoose = require('mongoose');
//var article = require("./db.js");
var date = {};
date.aujourdui = new Date();
date.uneSemaine = date.aujourdui - 604800000;
date.unJour = date.aujourdui - 86400000;
date.heure = date.aujourdui - 3600000;

//mongoose.createConnection('mongodb://127.0.0.1:27017/articles', function(err) {
var connection = function () {

    if (mongoose.connection.readyState == 0) {
        mongoose.connect('mongodb://127.0.0.1:27017/projet', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("----------------connexion db Base Articles-------------");
            }
        });
    }
};
connection();

var schemaArticle = mongoose.Schema({
    titre: {type: String, unique: true},
    date: {type: Date, default: Date.now},
    description: {type: String},
    image: {type: String},
    lien: {type: String},
    provenance: {type: String}
});

var modelTrending = mongoose.model('article', schemaArticle);
//------------------------------------------------------------------------
exports.supprimerTout = function () {
    modelTrending.remove("*", function (err) {
        if (err)
            console.log('Erreur ');
        else
            console.log('Achete toi des lunettes !!!!!!!    article');
    });

};
//-----------------------------------------------------------------------
exports.sauvegarderOuMAJ = function (obj) {
    var Trending = new modelTrending(obj);
    Trending.save(function (err) {
        if (err) {
            //  console.log(err);
            console.log("Enregistrement en Base Article non possible");
        } else {
            console.log("=================================== Enregistrement en Base Article ============================");
        }

    });

};
//------------------------------------------------------------------------
exports.supprimer = function () {
    modelTrending.remove().where("date").gte(date.uneSemaine).exec(function (err) {
        if (err) {
            console.log(err);
        }
        console.log("----------supression des articles---------------");
    });
};
//-----------------------------------------------------------------
exports.trouverToutsansCB = function ()
{
    modelTrending.find("*", function (err, rep) {
        if (err) {
            console.log(err);
        } else {
            if (rep == null) {
                console.log("pas de reponse ! ");
            } else {
                console.log(rep);
                //cb(rep);
            }
        }

    });

};
//--------------------------------------------------------------------------
exports.trouverTout = function (cb)
{
    modelTrending.find("*", function (err, rep) {
        if (err) {
            console.log(err);
        } else {
            if (rep == null) {
                console.log("pas de reponse ! ");
            } else {
                cb(rep);
            }
        }

    });


};
//--------------------------------------------------------------------------
exports.articlesDuJour = function ()
{
    modelTrending.find().where("date").gte(date.unJour).exec(function (err, rep) {
        if (err) {
            console.log(err);
        }
        console.log(rep);
    });

};
//--------------------------------------------------------------------------
exports.articlesheure = function ()
{
    modelTrending.find().where("date").gte(date.heure).exec(function (err, rep) {
        if (err) {
            console.log(err);
        }
        console.log(rep);
    });

};
//--------------------------------------------------------------------------
exports.sauvegarder = function (obj) {
    var Trending = new modelTrending(obj);
    Trending.save(function (err) {
        if (err) {
            //console.log("Echec de l'enregistrement en Base Articles");
        } else {
            console.log("---------------------Enregistrement en base Articles-------------------------");
        }

    });


};
//console.log("------------Demarrage de la base articles-----------------------");
/*var json = {};
exports.trouverTout(function(json){
    for( i in json){
        console.log(json[i]);
    }

});*/
//exports.supprimerTout();
//-----------------------------------------------------------------------------------/**

