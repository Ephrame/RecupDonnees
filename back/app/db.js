
var mongoose = require("mongoose");
var article = require('./article.js');
var twitter = require('./twitter.js');

//var SchemaArticle = mongoose.Schema;

var flux = {};

var start = function () {
    exports.sauvegarder = flux["sauvegarder"];
    //exports.supprimerTout = flux["supprimerTout"];
    //exports.lectureTable  = flux["lectureTable"];
    console.log("------- Demarrage du la base de donnee---------");
};


exports.set_db = function (base) {
    if (base == "article") {
        flux.db = article.db;
    } else if (base == "twitter") {
        flux.db = twitter.db;
    }

};

//--------------------------------------------------------------SAUVEGARDE------------------------------------------

flux.sauvegarder = function (obj) {
    var monShema = new flux.db(obj);
    monShema.save(function (err, d) {
        if (err) {
            console.log("------------------erreur de sauvegarde--------------------------------------");
        } else {
            console.log("------------------------------sanvegarde-------------------------------------");
        }
    });

};

flux.trouverTout = function () {

    modelTrending.find("*", function (err, rep) {
        if (err) {
            console.log(err);
        } else {
            if (rep == null) {
                console.log("pas de reponse ! ");
            } else {
                console.log(rep);
            }
        }
    });

};

//---------------------------------------------------SUPPRESSION-------------------------------------------
//start(); //a decommenter/**

