var db = require("./twitter");

var date = {};
date.heure = 70000;//3600000;60000


var traitement = {};

traitement.motDuTT = [];
traitement.TT = [];
traitement.tabJsonMotPoids = [];
traitement.NewTabJsonMotPoids = [];

//lancement du programme
traitement.start = function (tmpJson) {
    traitement.recupTweets();

};

//Récupération des elements de la base Twitter. Le fonction lance en cascade les autres fonctions ansi quand tout est terminé
// On enregistre en base.
traitement.recupTweets = function (tmpJson) {
    db.trouverTout(function (tmpJson) {
        for (i in tmpJson) {
            traitement.TT[i] = tmpJson[i].name;
            //Passage au traitement 1: trouver les mots clefs des tweets associés à un Trending Topics
            traitement.trouverMotClef(tmpJson[i].tweets, i);

        }
        traitement.analyse();
        for (j in tmpJson) {
            if (traitement.NewTabJsonMotPoids[j]){
                tmpJson[j].motsClefs = traitement.NewTabJsonMotPoids[j];

                db.miseAJour(tmpJson[j]);
            }

        }
    });
};

//Trouve les mots Clefs dans les Tweets
traitement.trouverMotClef = function (tweetsTT, numeroTT) {
    var motsTweet = tweetsTT.replace(/,/g, " ");
    motsTweet = motsTweet.split(" ");
    traitement.mots = [];
    var k = 0;
    for (j in motsTweet) {
        //traitement des mots superieur à 4 lettres
        if (motsTweet[j].length > 4) {
            traitement.mots[k++] = motsTweet[j];
        }
    }
    traitement.motDuTT[numeroTT] = traitement.mots;
};

//Appel de la fonction trouverPoid pour chaque tableau de mots clefs
traitement.analyse = function () {
    for (tabMot in traitement.motDuTT) {
        traitement.trouverPoid(traitement.motDuTT[tabMot], tabMot);
    }
};

//Traitement des mots du tableau afin de définir le poid des mots clefs
traitement.trouverPoid = function (tabMot, valeur) {
    var indice = 1;
    var tmp = 0;
    var k = 0;
    var jsonMotPoids = [];
    var occurence = 1;
    for (mots = 0; mots < tabMot.length - 1; mots++) {
        if ((tabMot.indexOf(tabMot[mots], indice)) >= 0) {
            occurence++;
            indice = (tabMot.indexOf(tabMot[mots], indice)) + 1;
            tabMot[indice - 1] = tabMot[indice - 1].replace(tabMot[indice - 1], tmp++);
            mots--;
        }
        else {
            if (occurence > 1) {
                motPoids = {};
                motPoids.poids = occurence;
                motPoids.mot = tabMot[mots];
                jsonMotPoids[k++] = motPoids;
            }
            occurence = 1;
            indice = mots + 2;
        }
    }
    traitement.tabJsonMotPoids[valeur] = jsonMotPoids;
    traitement.hashtage(traitement.tabJsonMotPoids[valeur], valeur);
};

//Ajoute plus de poids au mots avec un "#"
traitement.hashtage = function (jsonMotPoids, valeur) {
    for (i in jsonMotPoids) {
        var stringJsonMotPoids = JSON.stringify(jsonMotPoids[i]);
        if ((stringJsonMotPoids.indexOf("'")) > 0 || (stringJsonMotPoids.indexOf("\'")) > 0) {
            motsTemporaire = jsonMotPoids[i].mot.split(/'/);
            jsonMotPoids[i].mot = motsTemporaire[1];
            traitement.tabJsonMotPoids[valeur][i].mot = motsTemporaire[1];
        }

        else if ((stringJsonMotPoids.indexOf("#")) > 0) {

            motsTpm = jsonMotPoids[i].mot.split(/(?=[A-Z])/);
            jsonMotPoids[i].poids = jsonMotPoids[i].poids * 10;
            traitement.enregistreHas(motsTpm, valeur, i);
        }
    }
};

//Enleve les caractères spéciaux et les mets en "bonne forme" pour la base
traitement.enregistreHas = function (motsTpm, valeur, num) {
    for (i in motsTpm) {
        if (motsTpm[i].length > 1) {

            var jsonTemp = {};
            jsonTemp.poids = traitement.tabJsonMotPoids[valeur][num].poids;
            jsonTemp.mot = motsTpm[i];
            traitement.tabJsonMotPoids[valeur].push(jsonTemp);
        }
    }
    traitement.tabJsonMotPoids[valeur][num].poids = 0;
    stringTabJsonMotPoids = JSON.stringify(traitement.tabJsonMotPoids);
    stringTabJsonMotPoids = stringTabJsonMotPoids.replace(/[@()&=/!#?+_….]/g, "");
    traitement.NewTabJsonMotPoids = JSON.parse(stringTabJsonMotPoids);
};

//setInterval(function () {
    traitement.start();
//}, date.heure);

