var util = require("util");
var url = require("url");
var fs = require("fs");
var http = require("http");

var master = require("./Master");
var EventEmitter = require('events').EventEmitter;
exports.ev2 = new EventEmitter();
exports.ev3 = new EventEmitter();
var ev1 = new EventEmitter();
//var ev2 = new EventEmitter();
var host ="192.168.1.45"; //"192.168.43.1";//"127.0.0.1";//"192.168.1.45";//"pc-Sara"//"127.0.0.1";
//var fileport = 1338; 192;168,1,59 / 139
var port =12345;//1337;//5599;// 1337//28337;
var data1 = {};
var data2 = {};
var options = {
    hostname: host,
    port: port,
    path: '/',
    method: 'POST',
    headers: {"Content-Type": "application/json;charset=UTF-8"}
};

/*exports.start = function ( tabPost){
    var tabReturn = [];
    for(var i=0;i<tabPost.length; i++ ) {
        var fou = new post(tabPost[i]);
    }
    ev2.on("Push", function(data){
        tabReturn.push(data);
       // console.log(tabReturn.length);
       // console.log(tabPost.length);
        if(tabReturn.length ==tabPost.length ){

            exports.ev2.emit("Return", tabReturn);
        }
    });

};*/

exports.start0 = function ( js){
    var fou = new postdeux(js);
    ev1.on("Push", function(data){
        exports.ev3.emit("Debut", data);

    });

};

exports.requette = function (js){
    var foufou = new post(js);

};

var post = function(js) {
    var moi = this;
	console.log(":::::::::::::::::::::::::::: Le LB envoie une requete au serveur de Code ! :::::::::::::::::::::::::::::::");
    moi.envoie(js, function (res){
        console.log("************************** Une reponse avec le code a ete recu .************************************");

        if(res.statusCode == 200) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                data = JSON.parse(data);
                moi.data2= {};
                moi.data2 = data;
                exports.ev2.emit("Bonjour",moi.data2);

            });

        }else{console.log("erreur pas 200");}

    });


};
var postdeux = function(js) {
    this.data2 = {};
    var moi = this;
    console.log(":::::::::::::::::::::::::::: Le LB envoie une requete de configuration! :::::::::::::::::::::::::::::::");
    moi.envoie(js, function (res){
        console.log("************************** Une reponse de configuration a ete recue .************************************");
        var data = "";
        if(res.statusCode == 200) {
            res.on('data', function (chunk) {

                data += chunk;
            });
            res.on('end', function () {
                data = JSON.parse(data);
                moi.data2 = data;
                ev1.emit("Push",moi.data2);

            });

        }else {console.log("erreur");}

    });


};
post.prototype = {

    envoie : function(json, callback){
        var req = http.request(options, callback);
        req.write(JSON.stringify(json));
        req.end();
    }

};

postdeux.prototype = {

    envoie : function(json, callback){
        var req = http.request(options, callback);
        req.write(JSON.stringify(json));
        req.end();
    }

};
