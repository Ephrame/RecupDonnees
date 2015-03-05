
var util = require("util");
var https = require('https');
var fs = require("fs");
var db = require("./article");
var demande = require("./post");
/*var EventEmitter = require('events').EventEmitter;
exports.ev2 = new EventEmitter();*/

var date = {};
date.aujourdui = new Date();
date.uneSemaine = 604800000;
date.heure = 3600000;
date.tmp = 2 * 3600000;
date.minute = 60000;

var server = {};
server.api = {
    "lepoint": "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Fwww.lepoint.fr%2Frss.xml'&format=json&diagnostics=true",
    "leParisien": "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Fwww.leparisien.fr%2Fune%2Frss.xml'&format=json&diagnostics=true",
    "lemonde": "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Ffr.news.yahoo.com%2Frss%2Ffrance'&format=json&diagnostics=true",
    "yahoo_culture_medias": "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Ffr.news.yahoo.com%2Frss%2Fculture-medias'&format=json&diagnostics=true",
    "yahoo_culture_people": "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Ffr.news.yahoo.com%2Frss%2Fpeople'&format=json&diagnostics=true",
    "yahoo_culture_sport": "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Ffr.news.yahoo.com%2Frss%2Fsports'&format=json&diagnostics=true"
};



//---------------Fonction de récupération des articles a partir du lien YQL------------------------
server.get = function (api, nom) {
    var b = "";
    util.log("-------------------Recuperation des articles, source : "+nom +" --------------");
    https.get(api, function (r) {
        r.on("data", function (d) {
            b += d;
        });
        r.on("end", function () {
            b = JSON.parse(b);
            if (b.query.results) {
                server.miseEnForme(b);
            }
        });
    });

};

//Fonction de mise en forme des articles
server.miseEnForme = function (flux) {
    var articles = [];
    for (i in flux.query.results.item) {
        var tmp = {};
        tmp.provenance = flux.query.diagnostics.url.content;
        tmp.titre = flux.query.results.item[i].title;
        tmp.date = new Date(flux.query.results.item[i].pubDate);
        tmp.description = flux.query.results.item[i].description;
        tmp.image = flux.query.results.item[i].enclosure;
        tmp.lien = flux.query.results.item[i].link;
        articles[i] = tmp;
        //demande.p
        //db.sauvegarder(tmp);
    }
};

// Lancement de la récupération d'articles, avec evenement lorsque c'est fini.
var start = function () {
    setInterval(function () {
     //   server.get(server.api.lepoint, "Le point");
        server.get(server.api.leParisien, "Le Parisien");
      //  server.get(server.api.lemonde);
     //   server.get(server.api.yahoo_culture_medias, "Les medias");
       // server.get(server.api.yahoo_culture_people, "Les peoples");
        //server.get(server.api.yahoo_culture_sport, "Le sport");
/*		setInterval(function () {
		console.log("+++++++++++++++++++++++Evenement : Fin articles ++++++++++++++++++++++++++++++++");

		exports.ev2.emit("finArticles");
            exports.ev2 = new EventEmitter();
		}, date.minute);*/

    }, date.minute)
	// ********************************** Suppression toutes les semaines ********************************************************
	setInterval(function () {
    db.supprimer();
    console.log("=========================================================================");
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	}, date.uneSemaine);
	
};
start();
