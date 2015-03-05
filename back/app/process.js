/**
 * Created by ameli_000 on 03/03/2015.
 */


process.on('message', function(resp) {
    console.log("Creation du child process numero"+resp.idCP);
    resp.traitement = resp.traitement.replace(/@ARemplacer/g, "resp.donnees");
    eval(resp.traitement);
    process.send(resp.donnees);
});
