/**
 * Created by ameli_000 on 13/03/2015.
 */
/**
 * Created by ameli_000 on 13/03/2015.
 */
/**
 * Created by ameli_000 on 11/03/2015.
 */
var mongoose = require('mongoose');//mongoose

var connection = function(){

    if(mongoose.connection.readyState == 0){
        mongoose.connect('mongodb://127.0.0.1:27017/projet', function(err) {
            if (err) { console.log(err);}
            else
            {console.log("----------------connexion à la Base tmpArticles-------------");}
        });
    }
};
connection();
var schemaTmpArticles = mongoose.Schema({
    tab  : []
});

var modelTmpArticles = mongoose.model('tmpArticles', schemaTmpArticles);

exports.sauvegarder = function (obj) {
    var tmpArticle = new modelTmpArticles(obj);
    tmpArticle.save(function (err) {
        if (err) {
            //console.log("Echec de l'enregistrement en Base Api");
        } else {
            console.log("---------------------Enregistrement en base tmpArticles-------------------------");
        }

    });


};
exports.sauvegarderOuMAJ = function (obj) {
    var tmpArticle = new modelTmpArticles(obj);
    tmpArticle.save(function (err) {
        if (err) {
            //  console.log(err);
            console.log("Enregistrement en Base tmpArticles  non possible");
        } else {
            console.log("=================================== Enregistrement en Base tmpArticles============================");
        }

    });

};
exports.supprimerTout = function () {
    modelTmpArticles.remove("*", function (err) {
        if (err)
            console.log('Erreur ');
        else
            console.log('Achete toi des lunettes !!!!!!!     tmpArticles');
    });

};
exports.trouverToutsansCB = function ()
{
    modelTmpArticles.find("*", function (err, rep) {
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
    modelTmpArticles.find("*", function(err,rep){
        if (err) {
            console.log(err);
        }else {
            if(rep==null)
            {
                console.log("pas de reponse ! ");
            }else{
                var tableau = [];
                var tab = [];
                for (i=0; i<rep.length; i++){
                    for (j=0; j<rep[i].tab.length; j++){
                        tab.push(rep[i].tab[j]);
                    }
                }
                exports.supprimerTout();
                cb(tab);


            }
        }

    });

};
//var json = {};
//exports.trouverTout(function(json){console.log(json);});
//exports.trouverToutsansCB();
//exports.supprimerTout();