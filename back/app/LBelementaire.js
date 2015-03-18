/**
 * Created by ameli_000 on 05/03/2015.
 */
/**
 * Created by ameli_000 on 03/03/2015.
 */
var EventEmitter = require('events').EventEmitter;
exports.event = new EventEmitter();
var fs = require('fs');
var db = require('./twitter');
var master = require('./Master');
var demande = require("./requettes");

process.on('message', function(resp) {
    var LB = new LBelem(resp.traitement.length, resp);
});

exports.recupCode = function (resp, frequence, nom){

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
    for (l = 0; l < this.nbMaster; l++) {
        this.tableauTraitement[l] = resp.traitement[l];
        this.tabMasterP2[l] = master.creationMaster(resp.db, l, resp.traitement[l]);
        console.log("<<<<<<<<<<<<<<<<<<<<<  Creation du Master numero "+l+  "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }

    this.initialisationDonneeProcess();

};

LBelem.prototype = {

    initialisationDonneeProcess : function(){
        var _this = this;
        console.log(_this.dbEntree);
        if (_this.dbEntree != ""){
            var  dbEntree = require("./"+_this.dbEntree+".js");

            dbEntree.trouverTout(function (tmpJson) {
                var tab = [];
                for (i in tmpJson) {
                    //console.log(tmpJson);
                    tab[i] = tmpJson[i];
                }
                _this.tabMasterP2[0].tabDonneeTmp = tab;
                if(_this.tabMasterP2[0].tabDonneeTmp.length > 0){
                    cb();
                }else{
                    console.log("%%%%%%%%%%%%%%%% Mon tableau est vide !%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                }
                //tODO pensez à supprimer Twitter !

            });
            function cb() {
                _this.gestionProcess();
            }
        }else{
            _this.tabMasterP2[0].tabDonneeTmp = ["vide"];
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
                    //console.log(_this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie[tt]);
                    //console.log("*********************************************************");
                    dbSortie.sauvegarderOuMAJ(_this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie[tt]);
                }
                console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
            }
        });

    }
};






