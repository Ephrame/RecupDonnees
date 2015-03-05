/**
 * Created by ameli_000 on 24/02/2015.
 */

//var recup_Twitter = require("./recup_Twitter.js");
//var recup_article = require("./fluxArticles.js");

var twitter = require("./twitter");
var articles = require("./article");
var tweetsArticles = require("./tweetsArticles");

var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

var traitements = {};
traitements.tweetsArticles = {};

var date = {};
date.heure = 80000;//3600000;60000

traitements.start = function () {
    console.log("Je vais faire le matching");
    // Récupération dans les deux bases de données : Articles, Twitter
   // traitements.recupDbArticles();
    traitements.recupDbTwitter();

};

// Récupération en base
traitements.recupDbTwitter = function () {
    twitter.trouverTout(function (twitter) {
        for( i in twitter ){
            traitements.finDeRecupTwitter(twitter[i]);
        }

    });

};
//--------------------------------------------------------------------
traitements.finDeRecupTwitter = function (twitter){
    var tabArticle = [];
    var stringTabArticle = "";
    articles.trouverTout(function (article) {
        for (i in article) {
            tabArticle[i] = article[i];
            tabArticle[i] = JSON.stringify(tabArticle[i]);
        }
        traitements.preMatching(twitter, tabArticle);

    });

    //traitements.preMatching(twitter, tabArticle);

};

//Enregistrement en base apres le traitement de matching
traitements.preMatching = function (trend, tabArticle) {
    //console.log(trend);
    //console.log(tabArticle);
    var tabBonArticles = [];

    for (i in tabArticle) {
        traitements.matching(trend, tabArticle[i], tabBonArticles);
    }
    traitements.tweetsArticles.nom = trend.name;
    traitements.tweetsArticles.tweets = trend.tabTweets;
    traitements.tweetsArticles.formate = trend.formate;
    traitements.tweetsArticles.date = trend.date;
    traitements.tweetsArticles.image = trend.image;
    if (tabBonArticles.length != 0) {
        console.log("J'ai trouvé un matching");
        traitements.tweetsArticles.tabArticles = tabBonArticles;
        //console.log(traitements.tweetsArticles.nom);
       tweetsArticles.sauvegarderOuMAJ(traitements.tweetsArticles);

    }
};

//Fonction de matching, fait par trend. (en parrallèle )
traitements.matching = function (trend, tabArticle, tabBonArticles) {
    var poidTotal = 0;
    var poidTotalArticle = 0;
    var pourcentage = 0;

    var tab = [];
    if (trend.motsClefs){
        for (k = 0; k < trend.motsClefs.length; k++) {

            poidTotal += +(trend.motsClefs[k].poids);
            if (tabArticle.indexOf(trend.motsClefs[k].mot) > 0) {
                poidTotalArticle += +(trend.motsClefs[k].poids);
            }
        }

        pourcentage = (poidTotalArticle / poidTotal) * 100;
        if (pourcentage > 50) {
            bonTabArticle = JSON.parse(tabArticle);
            tabBonArticles.push(bonTabArticle);
            //todo faire un push
        }
    }

};


//tweetsArticles.trouverToutsansCB();
//tweetsArticles.supprimerTout();
/*recup_article.ev2.on("finArticles", function () {
 console.log("µµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµ Matching articles ******************************************");
 recup_article.ev2.removeAllListeners("finArticles");
 recup_Twitter.ev.on("TwitterFin", function () {
 console.log("+++++++++++++++++++++++++++++++++++++++Je commence le matching++++++++++++++++++++++++++++++++++++++");
 recup_Twitter.ev.removeAllListeners("TwitterFin");
 traitements.start();
 });
 });*/


setInterval(function () {
    traitements.start();
}, date.heure);

