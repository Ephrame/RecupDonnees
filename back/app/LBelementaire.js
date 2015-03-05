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

console.log("===================================================================================================================");

exports.recupCode = function (resp){

   // console.log(resp.traitement.length);
    var LB = new LBelem(resp.traitement.length, resp);
    //LB.gestionProcess();
};

LBelem = function ( nbMaster,resp) {

    this.tableauTraitement = [];
    this.tabMasterP2 = [];
    this.nombreMasterLance = 0;
    this.nbMaster = nbMaster;
    console.log(this.tabMasterP2.length);
    for (k = 0; k < this.nbMaster; k++) {
        this.tableauTraitement[k] = resp.traitement[k];
        this.tabMasterP2[k] = master.creationMaster(resp.db, k, resp.traitement[k]);
        //console.log(this.tabMasterP2);
    }

    this.initialisationDonneeProcess("P2");
   // console.log(this.tabMasterP2);

};

LBelem.prototype = {

    initialisationDonneeProcess : function(process){
        console.log("Initialisation LB++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        var _this = this;
        if (process == "P2") {

            var db = require('./twitter');

            db.trouverTout(function (tmpJson) {
                var tab = [];
                for (i in tmpJson) {
                    tab[i] = tmpJson[i];
                }
                _this.tabMasterP2[0].tabDonneeTmp=tab;
                //console.log(_this.tabMasterP2);
            });
            if(_this.tabMasterP2[0].construction==1){
                console.log("++++++++++++++++++++++++++++++++++++++++++++");
                this.tabMasterP2[0].tabDonneeTmp=_this.tabMasterP2[0].tabDonneeTmp;
                console.log(this.tabMasterP2);
            }

        }else{
           // TODO les autres process
        }

    },

    gestionProcess : function () {
        if(this.nombreMasterLance == 0){
            this.tabMasterP2[this.nombreMasterLance].creationCP();
            this.nombreMasterLance++;
            console.log("_____________________________Fin Traitement 1 _____________________________");
            console.log(this.tabMasterP2[0].tabDonneeTmp);
        }
        if (this.tabMasterP2[(this.nombreMasterLance)-1].traitementFini == true){
            this.tabMasterP2[this.nombreMasterLance].creationCP();
            this.nombreMasterLance++;
            console.log("_____________________________Fin Traitement 2 _____________________________");
            console.log(this.tabMasterP2[1].tabDonneeTmp);
        }
        if (this.tabMasterP2[(this.nombreMasterLance)-1].traitementFini == true){
            this.tabMasterP2[this.nombreMasterLance].creationCP();
            this.nombreMasterLance++;
            console.log("_____________________________Fin Traitement 3 _____________________________");
            console.log(this.tabMasterP2[2].tabDonneeTmp);
        }
        this.gestionProcess();
    }


};







