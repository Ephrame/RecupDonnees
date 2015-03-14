/**
 * Created by ameli_000 on 05/03/2015.
 */
/**
 * Created by ameli_000 on 03/03/2015.
 */

var fs = require('fs');
var db = require('./twitter');
var master = require('./Master');
var demande = require("./requettes");

process.on('message', function(req) {
    demande.recuperation({code : req});
    var resp = demande.recupLBelem();
    var LB = new LBelem(resp.traitement.length, resp);
    process.send("j'ai fait un Lb");


});

exports.recupCode = function (resp, frequence, nom){

    console.log("coucou");
    console.log(nom);
    var LB = new LBelem(resp.traitement.length, resp);

};



LBelem = function ( nbMaster,resp) {

    this.tabMasterP2 = [];
    this.tableauTraitement = [];
    this.nombreMasterLance = 0;
    this.nbMaster = nbMaster;
    this.dbSortie = resp.dbSortie;
    this.dbEntree = resp.dbEntree;
    for (k = 0; k < this.nbMaster; k++) {
        this.tableauTraitement[k] = resp.traitement[k];
        this.tabMasterP2[k] = master.creationMaster(resp.db, k, resp.traitement[k]);
        console.log("<<<<<<<<<<<<<<<<<<<<<  Creation du Master numero "+k+  "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }

    this.initialisationDonneeProcess();

};

LBelem.prototype = {

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






