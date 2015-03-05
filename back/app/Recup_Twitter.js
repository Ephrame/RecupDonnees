var fs = require('fs');
var timeout_time  = 60000; //nombre de millisecondes dans une heure
var https = require('https') ;
var OAuth2 = require('oauth').OAuth2;
//var db = require('./twitter');

var date = {};
date.heure = 60000;


var donnee ={}
donnee.access_token ;
donnee.key = 'xBCCHoLhtMr7tcPd9FyflzbMp';
donnee.secret = 'DCDo8wGH4X85yoH1QlUdt18g4F0h9iVihORbHIQImqo4dGeDHn';
donnee.Oauth2 = new OAuth2(donnee.key, donnee.secret, 'https://api.twitter.com/', null, 'oauth2/token', null);


donnee.autorisationConnextion = function () {
    donnee.Oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function (e, access_token) {
        donnee.option1 = {
            hostname: 'api.twitter.com',
            path: '/1.1/trends/place.json?id=23424819',
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        };
        donnee.option2 = donnee.option1;
        donnee.getTrends();

    });

} ;
//-----------------------------------------------------------------------------------
donnee.getTrends = function(){
    https.get(donnee.option1, function(result){
        var buffer = '';
        result.setEncoding('utf8');
        result.on('data', function(data){
            buffer += data;
        });
        result.on('end', function(){
            donnee.formater(JSON.parse(buffer));
        });
    });
}
//------------------------------------------------------------------------------------
donnee.formater = function(topics){
    var trends = [];
    var date = new Date();
    for (tt in topics[0].trends) {
        var new_tt ={};
        new_tt.name = topics[0].trends[tt].name;
        new_tt.formate = new_tt.name.replace(/#/g,"");
        new_tt.formate = new_tt.formate.replace(/ /g,"");
        new_tt.formate = new_tt.formate.replace(/[àâ]/g,"a");
        new_tt.formate = new_tt.formate.replace(/[éèê]/g,"e");
        new_tt.formate = new_tt.formate.replace(/[î]/g,"i");
        new_tt.formate = new_tt.formate.replace(/[ûù]/g,"u");
        new_tt.formate = new_tt.formate.replace(/[ô]/g,"o");
        new_tt.formate = new_tt.formate.replace(/[ç]/g,"c");
        new_tt.formate = new_tt.formate.replace(/'/g,"");
        new_tt.date = date;

        donnee.getTweets(new_tt);
        //trends[tt] = new_tt;
        //new_tt.tweets = topics[0].trends[tt].name;
    }
    //db.trouverUnMorceau();
    //todo evenement ou appel de fonction
}
donnee.getTweets = function(new_tt){
    donnee.option2.path =  '/1.1/search/tweets.json?q=%23'+new_tt.formate+'&lang=fr';
    https.get(donnee.option2, function(result){
        var buffer = '';
        var tweets = []
        result.setEncoding('utf8');
        result.on('data', function(data){
            buffer += data;
        });
        result.on('end', function(){
            if(buffer.indexOf("statuses")>=0){
              //  console.log(buffer);
                var topics = JSON.parse(buffer);
                for (tt in topics.statuses) {

                    tweets[tt] = topics.statuses[tt].text;
                }

                new_tt.tweets = [];
                new_tt.tweets = tweets;

                new_tt.tabTweets = [];
                new_tt.tabTweets = tweets;

                db.sauvegarder(new_tt) ;

            }else{console.log("pas de tweets")}
        });
    });
}
//lancement toutes les heures du rafraichement des trending topics 
//setInterval(function () {

// donnee.autorisationConnextion();
//}, date.heure);
//db.supprimerTout();
//start();
