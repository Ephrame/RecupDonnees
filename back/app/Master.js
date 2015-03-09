/**
 * Created by ameli_000 on 03/03/2015.
 */

var fs = require('fs');
var process = require('child_process');
var EventEmitter = require('events').EventEmitter;
exports.ev = new EventEmitter();

exports.creationMaster = function (db, k, traitement){
    var monMaster = new master (db, k, traitement);
    return monMaster;
};

master = function ( db, id, traitement) {

    this.id = id;
    this.tabDonneeTmp = [];
    this.tabDonneeTmpSortie = [];
    this.donnerCP = {};
    this.donnerCP.traitement = traitement;
    this.nombreCP;

};

master.prototype = {

    creationCP : function () {
        var _this = this;
        var tmpCPNbr = 0;
        console.log("Creation du Master       "+this.id);
        this.nombreCP = this.tabDonneeTmp.length;
        //console.log(this.tabDonneeTmp);
        for(var i=0; i<this.tabDonneeTmp.length; i++) {

            var ls = process.fork("./process.js");
            //console.log(this.tabDonneeTmp[i]);
            this.donnerCP.donnees =this.tabDonneeTmp[i];
            this.donnerCP.idCP=i;
            ls.send(_this.donnerCP);

           ls.on ('message', function (m){
               _this.tabDonneeTmpSortie.push(m);
               console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
               //console.log("C'est fini pour le child process "+_this.donnerCP.idCP);
               tmpCPNbr++;
               if(tmpCPNbr == _this.nombreCP){
                   console.log(">>>>>>>>>>>>>>>>>>>>>>Je suis dans la condition<<<<<<<<<<<<<<<<<<<<<");
                   exports.ev.emit("FinMaster");
               }

            });

            ls.on('close', function (code) {
                console.log('child process exited with code ' + code);
            });


        }

        ls.on('exit', function (code) {
            console.log('Child process exited with exit code '+code);
        });
    }

};







