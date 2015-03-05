/**
 * Created by ameli_000 on 03/03/2015.
 */

var fs = require('fs');
var process = require('child_process');

exports.creationMaster = function (db, k, traitement){
    var monMaster = new master (db, k, traitement);
    return monMaster;
};

master = function ( db, id, code) {

    this.id = id;
    this.tabDonneeTmp = [];
    this.nombreCP = this.tabDonneeTmp.length;
    this.traitementFini = false;
    this.construction = 0;
};

master.prototype = {

    creationCP : function () {
        for(var i=0; i<this.tabDonneeTmp.length; i++) {
            var a=2;
            var tmpCPNbr = 0;
            var ls = process.fork("./app/process.js", a);
            ls.send(this.tableau[i]);
           // ls.send(this.tableau.donnees[i]));
            ls.on ('message', function (m){
                    this.tabDonneeTmp.push(m);
                    tmpCPNbr++;
                    console.log(this.tabDonneeTmp);
            });
            ls.on('close', function (code) {
                console.log('child process exited with code ' + code);
            });
            if(tmpCPNbr == this.nombreCP){
                this.traitementFini = true;
            }

        }

        ls.on('exit', function (code) {
            console.log('Child process exited with exit code '+code);
        });
    }

};







