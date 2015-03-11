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

demande.start({code : "P2T"});
//demande.start({code : "P4T"});
demande.start({});
exports.recupCode = function (resp){
    var LB = new LBelem(resp.traitement.length, resp);
};

LBelem = function ( nbMaster,resp) {

    this.tableauTraitement = [];
    this.tabMasterP2 = [];
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
        var  dbEntree = require("./"+_this.dbEntree+".js");

        db.trouverTout(function (tmpJson) {
            var tab = [];
            for (i in tmpJson) {
                tab[i] = tmpJson[i];
            }
            _this.tabMasterP2[0].tabDonneeTmp = tab;
            cb();
        });
        function cb() {
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
                for (tt in _this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie) {
                    var dbSortie = require("./" + _this.dbSortie + ".js");
                    dbSortie.sauvegarderOuMAJ(_this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie[tt]);
                }
            }
        });
    }
};







