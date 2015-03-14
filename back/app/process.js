/**
 * Created by ameli_000 on 03/03/2015.
 */

//var EventEmitter = require('events').EventEmitter;
process.on('message', function(resp) {

   // var ev = new EventEmitter();
    //console.log(resp.donnees);
    var variable = resp.donnees;
    console.log("<<<<<<<<<<<<<<<<<<<    Creation du child process numero "+resp.idCP+"    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    resp.traitement = resp.traitement.replace(/@ARemplacer/g, "variable");

    eval(resp.traitement);
    //console.log(variable);


});

