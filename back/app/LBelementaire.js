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

    for (k = 0; k < this.nbMaster; k++) {
        this.tableauTraitement[k] = resp.traitement[k];
        this.tabMasterP2[k] = master.creationMaster(resp.db, k, resp.traitement[k]);
        console.log("<<<<<<<<<<<<<<<<<<<<<  Creation du Master numero "+k+  "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    }
    this.initialisationDonneeProcess("P2");
};

LBelem.prototype = {

    initialisationDonneeProcess : function(process){
        console.log(">>>>>>>>>>>>>>>>>>>>>>>> Initialisation des donnees du master 1 du process en question >>>>>>>>>>>>>>>>>>>>>>>");
        var _this = this;
        if (process == "P2") {

            var db = require('./twitter');

            db.trouverTout(function (tmpJson) {
                var tab = [];
                for (i in tmpJson) {
                    tab[i] = tmpJson[i];
                }
                _this.tabMasterP2[0].tabDonneeTmp=tab;
                bob();
            });

            function bob() {

                console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                _this.gestionProcess();
            }


        }else{
           // TODO les autres process
        }

    },

    gestionProcess : function () {
       // console.log(this.tabMasterP2[0].tabDonneeTmp);
         this.tabMasterP2[0].creationCP();
         //this.nombreMasterLance++;

        if(this.tabMasterP2[0].traitementFini == true){
            console.log("_____________________________Fin Traitement 1 _____________________________");
        }

        // console.log(this.tabMasterP2[0].tabDonneeTmp);

/*         if (this.tabMasterP2[(this.nombreMasterLance)-1].traitementFini == true){
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
         }*/
         //this.gestionProcess();
         }

};







