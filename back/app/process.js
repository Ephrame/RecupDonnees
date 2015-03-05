/**
 * Created by ameli_000 on 03/03/2015.
 */


process.on('message', function(resp) {
    console.log("Creation du child process numero"+resp.idCP);
    resp.code = resp.code.replace("@ARemplacer", "resp.donnees");
    eval(resp.code);
    //console.log(resp.donnees);
    process.send(resp.donnees);
});
