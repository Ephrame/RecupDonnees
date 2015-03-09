/**
 * Created by ameli_000 on 03/03/2015.
 */


process.on('message', function(resp) {
    //console.log(resp.donnees);
    var donnee = resp.donnees;
    console.log("Creation du child process numero"+resp.idCP);
    resp.traitement = resp.traitement.replace(/@ARemplacer/g, "donnee");

    eval(resp.traitement);
    envoyer(donnee);


    //console.log(donnee.TT.motsClefs);
    //console.log(donnee.motDuTT);


});

var envoyer = function (donnee){
    process.send(donnee);
}