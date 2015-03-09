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


//demande.start({code : "P2T"});
demande.start({code : "P4T"});

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
    this.initialisationDonneeProcess("P4");
};

LBelem.prototype = {

    initialisationDonneeProcess : function(process){

        var _this = this;
        // <<<<<<<<<<<<<<<<<<<<<<<< Pour le Process 2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        if (process == "P2") {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>> Initialisation des donnees du master 1 du process 2 >>>>>>>>>>>>>>>>>>>>>>>");
            // Todo Appeler les db du meme nom que les process !
            var db = require('./twitter');

            db.trouverTout(function (tmpJson) {
                var tab = [];
                for (i in tmpJson) {
                    tab[i] = tmpJson[i];
                }
                _this.tabMasterP2[0].tabDonneeTmp = tab;
                cb();
            });

            function cb() {

                console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                _this.gestionProcess();
            }
        }
        // <<<<<<<<<<<<<<<<<<<<<<<< Pour le Process 1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        else if (process == "P1")    {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>> Initialisation des donnees du master 1 du process 1 >>>>>>>>>>>>>>>>>>>>>>>");
            //todo faire une base sale twiiter et des process nul ? ou faire des process de recuperation specifiquemenet
            var db = require('./twitter');

        }
        // <<<<<<<<<<<<<<<<<<<<<<<< Pour le Process 3 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        else if (process == "P3")    {
            // todo : base sale pour aller en base propre
            // todo : recuperer les articles par api. --> parrallèle.
            var db = require('./articles');
            console.log(">>>>>>>>>>>>>>>>>>>>>>>> Initialisation des donnees du master 1 du process 3 >>>>>>>>>>>>>>>>>>>>>>>");
        }
       // <<<<<<<<<<<<<<<<<<<<<<<< Pour le Process 4 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        else if (process == "P4")    {
            console.log("Je suis dans P4");
            // todo : base sale pour aller en base propre
            var twitter = require('./twitter');
            twitter.trouverTout(function (tmpJson) {
                var tab = [];
                for (i in tmpJson) {
                    tab[i] = tmpJson[i];
                }
                _this.tabMasterP2[0].tabDonneeTmp=tab;
                cb();
                function cb() {

                    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                    _this.gestionProcess();
                }
            });
            console.log(">>>>>>>>>>>>>>>>>>>>>>>> Initialisation des donnees du master 1 du process 3 >>>>>>>>>>>>>>>>>>>>>>>");
        }
        else{
           // TODO les autres process
        }

    },

    gestionProcess : function () {
        var _this=this;

        var numeroProcess = 0;
       // console.log(this.tabMasterP2[0].tabDonneeTmp);
        this.tabMasterP2[0].creationCP();
         //this.nombreMasterLance++;

        master.ev.on("FinMaster", function () {
            numeroProcess++;

            if (numeroProcess < _this.nbMaster) {
                console.log("Je suis dans l'evenement ********************************************************");
                _this.tabMasterP2[numeroProcess].tabDonneeTmp = _this.tabMasterP2[numeroProcess - 1].tabDonneeTmpSortie;
                _this.tabMasterP2[numeroProcess].creationCP();
            }else{
                console.log( "++++++++++++++++++++"+numeroProcess+"++++++++++++++++++++++++++");
            }

        });

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







