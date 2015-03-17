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

recupCode = function (resp){
    demande.ev3.on("Debut", function(data){
        console.log(data);
        var config = JSON.parse(data);
        var LoadB = new LoadBalanceur(config);
    });
};
tab = [];
tab.push({code : "config"});
var test = demande.start0(tab[0]);
recupCode(test);

LoadBalanceur = function(config)  {

    this.pileRecuperation= config.recuperation;
    this.pileTraitements = [];
    this.frequence= config.frequence;
    this.LBelem = [];
    this.donneeCp = [];
    this.reponse = [];
    this.tableau = [];

    this.programme();
    //this.lancementProgramme()
};
LoadBalanceur.prototype = {

    programme : function (){
        var tableau = [];
        var _this = this;
        for (k=0; k<this.pileRecuperation.length; k++){
            this.tableau.push({code : this.pileRecuperation[k]});

        }
        var i = 0;
        demande.requette(this.tableau[0]);
        demande.ev2.on("Bonjour", function(tabReturn){
                _this.pileTraitements.push(tabReturn);
                i++;
                console.log(tabReturn);
                if (i < _this.tableau.length){
                    console.log("*************************** Je suis dans le if ****************");
                    demande.requette(_this.tableau[i]);
                }else{
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>jai fini<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                     _this.lancementProgramme();
                }
        });
    },

    lancementProgramme : function (){
        var _this = this;
        console.log("Creation du Master");
        this.nombreCP = this.pileRecuperation.length;
        for(var i=0; i<this.pileRecuperation.length; i++) {

            var ls = process.fork("./LBelementaire.js");
            ls.send(_this.pileTraitements[i]);
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

