/**
 * Created by ameli_000 on 11/03/2015.
 */
var mongoose = require('mongoose');//mongoose

var connection = function(){

    if(mongoose.connection.readyState == 0){
        mongoose.connect('mongodb://127.0.0.1:27017/twitter', function(err) {
            if (err) { console.log(err);}
            else
            {console.log("----------------connexion à la Base Api-------------");}
        });
    }
};
connection();
var schemaApi = mongoose.Schema({
    nom  : {type : String, unique : true},
    url : {type : String}
});

var modelApi = mongoose.model('api', schemaApi);

exports.sauvegarder = function (obj) {
    var api = new modelApi(obj);
    api.save(function (err) {
        if (err) {
            //console.log("Echec de l'enregistrement en Base Api");
        } else {
            console.log("---------------------Enregistrement en base Api-------------------------");
        }

    });


};
exports.sauvegarderOuMAJ = function (obj) {
    var api = new modelApi(obj);
    api.save(function (err) {
        if (err) {
            //  console.log(err);
            console.log("Enregistrement en Base api non possible");
        } else {
            console.log("=================================== Enregistrement en Base api ============================");
        }

    });

};
exports.supprimerTout = function () {
    modelApi.remove("*", function (err) {
        if (err)
            console.log('Erreur ');
        else
            console.log('Achete toi des lunettes !!!!!!!');
    });

};
exports.trouverToutsansCB = function ()
{
    modelApi.find("*", function (err, rep) {
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
    modelApi.find("*", function(err,rep){
        if (err) {
            console.log(err);
        }else {
            if(rep==null)
            {
                console.log("pas de reponse ! ");
            }else{
                cb(rep);
            }
        }

    });

};
//exports.trouverToutsansCB();
//exports.supprimerTout();