/**
 * Created by ameli_000 on 02/03/2015.
 */




exports.eval = function (resp){

    console.log("Je suis dans le super fonction");
    console.log(resp);
    eval(resp);
   // var demande = require("./requettes");

};