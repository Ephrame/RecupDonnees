var util = require("util");
var url = require("url");
var fs = require("fs");
var http = require("http");
var LB= require("./LBelementaire");
var master = require("./Master");
var host ="192.168.1.45"; //"192.168.43.1";//"127.0.0.1";//"192.168.1.45";//"pc-Sara"//"127.0.0.1";
//var fileport = 1338; 192;168,1,59 / 139
var port =12345;//1337;//5599;// 1337//28337;

var options = {
    hostname: host,
    port: port,
    path: '/',
    method: 'POST',
    headers: {"Content-Type": "application/json;charset=UTF-8"}
};

exports.start = function (js){
    var fou =  new post(js);
}
var post = function(js) {

    var moi = this;
	console.log("envoie");
    moi.envoie(js, function (res){
        console.log("je recois");
        console.log(res.statusCode);
        var data = "";
        var test = {};
        if(res.statusCode == 200) {
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
            //    console.log("coucou");
              //  test = JSON.parse(data);
               //console.log(typeof(data));
                data = JSON.parse(data);
             //   console.log(data.code);
                LB.recupCode(data);
                //console.log(typeof(data));
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

//var fou =  new post();