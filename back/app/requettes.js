var util = require("util");
var url = require("url");
var fs = require("fs");
var http = require("http");

var master = require("./Master");
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

exports.start = function (js){
    var fou =  new post(js);
    return fou;
};
exports.recuperation = function(js){
    var foufou = new deuxPost(js);
    return foufou;
};

var deuxPost = function(js){
    this.data1 = {};
    var moi = this;
    console.log(":::::::::::::::::::::::::::: Le LB envoie une requete a un de ses Serveurs ! :::::::::::::::::::::::::::::::");
    this.envoie(js, function (res){
        console.log("************************** Une donnee a ete recue par le LB.************************************");
        var data = "";
        var test = {};
        if(res.statusCode == 200) {
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                data = JSON.parse(data);
               // LB.recupLBelem(data);
                moi.data1 = data;
                moi.recoi(data);
            });
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
               // LB.recupCode(data);
                //console.log(data);
                moi.data2 = data;
                moi.recoi(data);
                //return (data);
                //console.log(moi.data2);
/*                exports.recupCode = function(){
                    var _this = this;
                    console.log(_this.data2);
                    return data2;
                };*/
            });

        }
    });

};

post.prototype = {

    envoie : function(json, callback){
        var req = http.request(options, callback);
        req.write(JSON.stringify(json));
        req.end();
    },
    recoi : function(data) {
            return data;
    }


};
deuxPost.prototype = {

    envoie : function(json, callback){
        var req = http.request(options, callback);
        req.write(JSON.stringify(json));
        req.end();
    },
    recoi : function(data) {
        return data;
    }
};

//var fou =  new post();