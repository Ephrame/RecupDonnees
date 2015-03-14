/**
 * Created by ameli_000 on 13/03/2015.
 */
/**
 * Created by ameli_000 on 05/03/2015.
 */
/**
 * Created by ameli_000 on 03/03/2015.
 */
//demande.start({code : "P2T"});
//demande.start({code : "P4T"});
//demande.start({code : "P3T"});
//demande.start({code : "P3T"});
//demande.start({code : "P3_2T"});
//demande.start({code : "P1T"});
//demande.start({code : "P1_2T"});
//demande.start({code : "config"});
var fs = require('fs');
var db = require('./twitter');
var master = require('./Master');
var demande = require("./requettes");
var LBelem = require("./LBelementaire");
var process = require('child_process');

/*exports.recupCode = function (resp){
    var config = JSON.parse(resp);
    var LoadB = new LoadBalanceur(config);

};*/



LoadBalanceur = function(config)  {

    this.pileRecuperation= config.recuperation;
    this.pileTraitements = config.traitement;
    this.frequence= config.frequence;
    this.LBelem = [];
    this.donneeCp = [];
    this.reponse = [];

   // this.programme();
    this.lancementProgramme()
};
LoadBalanceur.prototype = {

    programme : function (){

        for (k=0; k<this.pileRecuperation.length; k++){
            var _this = this;
            console.log(this.pileRecuperation[k]);
            /*demande.recuperation({code : this.pileRecuperation[k]});
            exports.recupLBelem = function (resp){
                _this.reponse.push(resp);
                console.log(_this.reponse);
                console.log("_____________________________________________________");
                if (k == (_this.pileRecuperation.length)-1){
                    console.log("je vais faire cb");
                    cb();
                }
                //LBelem.recupCode(resp, _this.frequence[k],""+k);

            };
*/
            //pileRecuperation.on()
        }

        function cb(){
            console.log(_this.reponse);
           // _this.lancementProgramme()
        }


    },

    lancementProgramme : function (){
        var _this = this;
        console.log("Creation du Master");
        this.nombreCP = this.pileRecuperation.length;
        for(var i=0; i<this.pileRecuperation.length; i++) {

            var ls = process.fork("./LBelementaire.js");
            console.log(_this.pileRecuperation[i]);
            this.donneeCp =_this.pileRecuperation[i];
            //this.donnerCP.idCP=i;
            console.log(_this.donneeCp);
            //ls.send(_this.donneeCp);

            ls.on ('message', function (m){
                console.log(m);
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
/*



    initialisationDonneeProcess : function(){
        var _this = this;
        console.log(_this.dbEntree);
        if (_this.dbEntree != ""){
            console.log("Sara est trop moche !!!!! ");
            var  dbEntree = require("./"+_this.dbEntree+".js");

            dbEntree.trouverTout(function (tmpJson) {
                var tab = [];
                for (i in tmpJson) {
                    //console.log(tmpJson);
                    tab[i] = tmpJson[i];
                }
                _this.tabMasterP2[0].tabDonneeTmp = tab;
                //tODO pensez à supprimer Twitter !
                cb();
            });
            function cb() {
                _this.gestionProcess();
            }
        }else{
            _this.tabMasterP2[0].tabDonneeTmp = ["vide"];
            console.log("Amelie est incroyablement magnifique et intelligente !!! ");
            _this.gestionProcess();
        }


    },
    gestionProcess : function () {
        var _this = this;
        var numeroProcess = 0;
        this.tabMasterP2[0].creationCP();
        master.ev.on("FinMaster", function () {
            numeroProcess++;
            if (numeroProcess < _this.nbMaster) {
                _this.tabMasterP2[numeroProcess].tabDonneeTmp = _this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie;
                _this.tabMasterP2[numeroProcess].creationCP();
            } else {
                //console.log(_this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie[0]);
                for (tt in _this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie) {
                    var dbSortie = require("./" + _this.dbSortie + ".js");

                    dbSortie.sauvegarderOuMAJ(_this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie[tt]);
                }
            }
        });
    }
};



*/

var config = demande.start({code : "config"});
var configu = demande.recuperation({code : "R1T"});
var test = demande.recuperation({code : "R2T"});
//var config = demande.recupCode();

setInterval(function () {
    console.log(config);
    console.log(configu);
    console.log(test);
   // console.log(configu.data1);
}, 1000);
//var LoadB = new LoadBalanceur(config);