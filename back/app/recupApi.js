/**
 * Created by ameli_000 on 11/03/2015.
 */
var db = require('./api');
var api = [];

var jsonTmp1 = {};
jsonTmp1.nom = "lepoint";
jsonTmp1.url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Fwww.lepoint.fr%2Frss.xml'&format=json&diagnostics=true";
api.push(jsonTmp1);
db.sauvegarder(api[0]);

var jsonTmp2 = {};
jsonTmp2.nom = "leParisien";
jsonTmp2.url ="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'http%3A%2F%2Fwww.leparisien.fr%2Fune%2Frss.xml'&format=json&diagnostics=true";
api.push(jsonTmp2);
db.sauvegarder(api[1]);

var jsonTmp3 = {};
jsonTmp3.nom = "lemonde";
jsonTmp3.url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Ffr.news.yahoo.com%2Frss%2Ffrance'&format=json&diagnostics=true";
api.push(jsonTmp3);
db.sauvegarder(api[2]);

var jsonTmp4 = {};
jsonTmp4.nom = "yahoo_culture_medias";
jsonTmp4.url ="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Ffr.news.yahoo.com%2Frss%2Fculture-medias'&format=json&diagnostics=true";
api.push(jsonTmp4);
db.sauvegarder(api[3]);

var jsonTmp5 = {};
jsonTmp5.nom = "yahoo_culture_people";
jsonTmp5.url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Ffr.news.yahoo.com%2Frss%2Fpeople'&format=json&diagnostics=true";
api.push(jsonTmp5);
db.sauvegarder(api[4]);

var jsonTmp6 = {};
jsonTmp6.nom = "yahoo_culture_sport";
jsonTmp6.url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D'https%3A%2F%2Ffr.news.yahoo.com%2Frss%2Fsports'&format=json&diagnostics=true";
api.push(jsonTmp6);
db.sauvegarder(api[5]);