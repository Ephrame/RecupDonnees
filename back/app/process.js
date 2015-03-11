/**
 * Created by ameli_000 on 03/03/2015.
 */

//var EventEmitter = require('events').EventEmitter;
process.on('message', function(resp) {

   // var ev = new EventEmitter();
    //console.log(resp.donnees);
    var donnee = resp.donnees;
    console.log("<<<<<<<<<<<<<<<<<<<    Creation du child process numero "+resp.idCP+"    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    resp.traitement = resp.traitement.replace(/@ARemplacer/g, "donnee");
    //console.log(resp.traitement);
    eval(resp.traitement);

});

