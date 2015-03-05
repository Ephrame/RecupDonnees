/**
 * Created by ameli_000 on 03/03/2015.
 */

var fs = require('fs');
var process = require('child_process');

exports.creationMaster = function (db, k, traitement){
    var monMaster = new master (db, k, traitement);
    return monMaster;
};

master = function ( db, id, traitement) {

    this.id = id;
    this.tabDonneeTmp = [];
    this.donnerCP = {};
    this.donnerCP.traitement = traitement;
    this.nombreCP;
    this.traitementFini = false;
};

master.prototype = {

    creationCP : function () {
        var _this = this;
        var tmpCPNbr = 0;
        console.log("Creation du Master1");
        this.nombreCP = this.tabDonneeTmp.length;
        for(var i=0; i<this.tabDonneeTmp.length; i++) {

            var ls = process.fork("./process.js");
            this.donnerCP.donnees =this.tabDonneeTmp[i];
            this.donnerCP.idCP=i;
            ls.send(_this.donnerCP);

           ls.on ('message', function (m){
               //this.tabDonneeTmp.push(m);
               console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
               //console.log(m);
               //console.log("C'est fini pour le child process "+_this.donnerCP.idCP);
               tmpCPNbr++;
               if(tmpCPNbr == _this.nombreCP){
                   console.log(">>>>>>>>>>>>>>>>>>>>>>Je suis dans la condition<<<<<<<<<<<<<<<<<<<<<")
                   _this.traitementFini = true;
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







