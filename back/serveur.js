/**
 * Created by ameli_000 on 24/02/2015.
 */
var recup_Twitter = require("./app/recup_Twitter.js");
//var traitement = require("./app/Traitement.js");

//var recup_article = require("./app/fluxArticles.js");


var http = require("http");
var util = require("util");
router = require("./app/router.js");
requette = require("./app/requettes.js");

/* Création d'un objet serveur stockant les variables et methodes */
var server = {};
server.port = 1337;
server.address = "127.0.0.1";

//fonction qui va etre appeler a chaque requette a passer en argument lors de la creation du server
server.receive_request = function (request, response) {
    router.route(request, response);
};

http.createServer(server.receive_request).listen(server.port, server.address);

util.log("INFO - Demarrage du serveur, listening " + server.address + " : " + server.port);


//var matching = require("./app/matching.js");
/*
var http = require("http");
var util = require("util");
var server = {};
server.r = require("./app/router.js");
server.port = 12345;
server.address = "0.0.0.0";

*/
/**
 * This method is called each times a request arrives on the server
 * @param req (Object) request object for this request
 * @param resp (Object) response object for this request
 *//*

server.receive_request = function (req, resp) {
    server.r.router(req, resp);
};

http.createServer(server.receive_request).listen(server.port, server.address);
util.log("INFO - Server started, listening " + server.address + ":" + server.port);*/
