var util = require("util");
var url = require("url");
var fs = require("fs");
var http = require("http");

var master = require("./Master");
var EventEmitter = require('events').EventEmitter;
exports.ev2 = new EventEmitter();
var ev1 = new EventEmitter();
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

exports.start = function ( tabPost){
    var tabReturn = [];
    for(var i=0;i<tabPost.length; i++ ) {
        var fou = new post(tabPost[i], i);
    }
    ev1.on("Push", function(data){
        console.log("je rempli le tableau");
        console.log(data);
        tabReturn.push(data);
        if(tabReturn.length ==tabPost.length ){
            console.log("j'envoie le return");
            exports.ev2.emit("Return", tabReturn);
        }
    });



};

var post = function(js) {
    this.data2 = {};
    var moi = this;
	console.log(":::::::::::::::::::::::::::: Le LB envoie une requete de configuration! :::::::::::::::::::::::::::::::");
    moi.envoie(js, function (res){
        console.log("************************** Une reponse de configuration a ete recue .************************************");
        var data = "";
        var test = {};
        if(res.statusCode == 200) {
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                data = JSON.parse(data);
                moi.data2 = data;
                console.log("Je vais envoyer");
                ev1.emit("Push",moi.data2);

            });

        }

    });


};

post.prototype = {

    envoie : function(json, callback){
        var req = http.request(options, callback);
        req.write(JSON.stringify(json));
        req.end();
    }

};

