/**
 * Created by ameli_000 on 13/03/2015.
 */
/**
 * Created by ameli_000 on 11/03/2015.
 */
var mongoose = require('mongoose');//mongoose

var connection = function(){

    if(mongoose.connection.readyState == 0){
        mongoose.connect('mongodb://127.0.0.1:27017/twitter', function(err) {
            if (err) { console.log(err);}
            else
            {console.log("----------------connexion à la Base tmpTwitter-------------");}
        });
    }
};
connection();
var schemaTmpTwitter = mongoose.Schema({
    tab  : []
});

var modelTmpTwitter = mongoose.model('tmpTwitter', schemaTmpTwitter);

exports.sauvegarder = function (obj) {
    var tmpTwitter = new modelTmpTwitter(obj);
    tmpTwitter.save(function (err) {
        if (err) {
            //console.log("Echec de l'enregistrement en Base Api");
        } else {
            console.log("---------------------Enregistrement en base Tmp Twitter=-------------------------");
        }

    });


};
exports.sauvegarderOuMAJ = function (obj) {
    var tmpTwitter = new modelTmpTwitter(obj);
    tmpTwitter.save(function (err) {
        if (err) {
            //  console.log(err);
            console.log("Enregistrement en Base Tmp Twitter  non possible");
        } else {
            console.log("=================================== Enregistrement en Base Tmp Twitter============================");
        }

    });

};
exports.supprimerTout = function () {
    modelTmpTwitter.remove("*", function (err) {
        if (err)
            console.log('Erreur ');
        else
            console.log('Achete toi des lunettes !!!!!!!');
    });

};
exports.trouverToutsansCB = function ()
{
    modelTmpTwitter.find("*", function (err, rep) {
        if (err) {
            console.log(err);
        } else {
            if (rep == null) {
                console.log("pas de reponse ! ");
            } else {
                console.log(rep);
                //cb(rep);
            }
        }

    });

};
exports.trouverTout = function(cb) // todo passer cb en arg pr une valeur de retour
{
    modelTmpTwitter.find("*", function(err,rep){
        if (err) {
            console.log(err);
        }else {
            if(rep==null)
            {
                console.log("pas de reponse ! ");
            }else{
                var tableau = rep[0].tab;
                exports.supprimerTout();
                cb(tableau);
            }
        }

    });

};
//exports.trouverToutsansCB();
//exports.supprimerTout();