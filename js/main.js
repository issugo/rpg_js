/*
 * variables globales utilisablent de partout qui doivent rester défini
 */
let zoneDeJeu = document.querySelector('body');
let personnage;
let xhr = new XMLHttpRequest();
xhr.open('GET', 'js/histoire.json', false);
xhr.send(null);
let jeu = JSON.parse(xhr.responseText);
jeu = jeu.histoire;

console.log(jeu);

/*
 *  fonction de départ qui sert à afficher l'écran de démarage et gérer les évenements de sélection du menu
 */
function startGame() {
    clear();
    // créer la div ou se situe le choix
    let myDiv = document.createElement('div');
    myDiv.setAttribute('id', 'start');
    zoneDeJeu.appendChild(myDiv);
    
    //créer les options du choix
    let choix1 = document.createElement('span');
    choix1.innerHTML = 'Nouvelle Partie';
    let choix2 = document.createElement('span');
    choix2.innerHTML = 'Charger';   
    
    //les ajoute au DOM
    myDiv.appendChild(choix1);
    myDiv.appendChild(document.createElement('br'));
    myDiv.appendChild(choix2);
    
    //set la classe active par défaut
    choix1.classList.add('active');
    
    //événement du arrow down ou arrow up
    document.onkeydown = function(event) {
        //si lors du choix le joueur appui sur z
        if (event.key === 'z' || event.key === 'Z' || event.key === 'ArrowUp') {
            if (document.getElementById('start').childNodes[0].classList.contains('active')) {
                document.getElementById('start').childNodes[0].classList.remove('active');
                document.getElementById('start').childNodes[2].classList.add('active');
                return;
            }
            if (document.getElementById('start').childNodes[2].classList.contains('active')) {
                document.getElementById('start').childNodes[2].classList.remove('active');
                document.getElementById('start').childNodes[0].classList.add('active');
                return;
            }
        }
        //si lors du choix le joueur appui sur s
        if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
            if (document.getElementById('start').childNodes[0].classList.contains('active')) {
                document.getElementById('start').childNodes[0].classList.remove('active');
                document.getElementById('start').childNodes[2].classList.add('active');
                return;
            }
            if (document.getElementById('start').childNodes[2].classList.contains('active')) {
                document.getElementById('start').childNodes[2].classList.remove('active');
                document.getElementById('start').childNodes[0].classList.add('active');
                return;
            }
        }
        //si lors du choix le joueur appui sur entrée
        if (event.keyCode === 13) {
            if (document.getElementById('start').childNodes[0].classList.contains('active')) {
                //lancer une partie
                creationPerso();
                return;
            }
            if (document.getElementById('start').childNodes[2].classList.contains('active')) {
                //demander un code de sauvegarde
                charger();
                return;
            }
        }
    };
}

/*
 * fonction quand on clique sur nouvelle partie pour créer le personnage
 */
function creationPerso() {
    clear();
    //setup des bouttons de création du perso
    let myDiv = document.createElement('div');
    myDiv.setAttribute('id', 'start');
    zoneDeJeu.appendChild(myDiv);
    let myInputName = document.createElement('input');
    myInputName.setAttribute('id', 'nomJoueur');
    let myInputGenre = document.createElement('select');
    myInputGenre.setAttribute('id', 'genre');
    let myGenreMale = document.createElement('option');
    myGenreMale.setAttribute('value', 'male');
    myGenreMale.innerHTML = 'MALE';
    let myGenreFemale = document.createElement('option');
    myGenreFemale.setAttribute('value', 'femelle');
    myGenreFemale.innerHTML = 'FEMELLE';
    let myButtonToCreate = document.createElement('button');
    myButtonToCreate.setAttribute('id', 'buttonToCreate');
    myButtonToCreate.innerHTML = 'Créer perso';
    //affichage de tout
    myDiv.appendChild(myInputName);
    myDiv.appendChild(document.createElement('br'));
    myDiv.appendChild(myInputGenre);
    myDiv.appendChild(document.createElement('br'));
    myInputGenre.appendChild(myGenreMale);
    myInputGenre.appendChild(myGenreFemale);
    myDiv.appendChild(myButtonToCreate);
    //event de création
    myButtonToCreate.onclick = function() {
        let nomDuJoueur = document.getElementById('nomJoueur').value;
        if (nomDuJoueur === '') {
            alert('nom vide interdit');
            return;
        }
        let genreDuJoueur = document.getElementById('genre').value;
        personnage = new Joueur(nomDuJoueur, genreDuJoueur);
        console.log(personnage);
        jouage(0);
    }
}

/*
 * fonction qui permet de jouer
 */
function jouage(index, defendre = false) {
    let i = index;
    let defense = defendre ? "vous avez bloqué l'attaque ennemie <br />" : '';
    clear();
    let texteAfficher = document.createElement('div');
    texteAfficher.setAttribute('id', 'texteAfficher');
    let bouttonAfficher = document.createElement('div');
    bouttonAfficher.setAttribute('id', 'bouttonAfficher');
    zoneDeJeu.appendChild(texteAfficher);
    zoneDeJeu.appendChild(bouttonAfficher);
    texteAfficher.innerHTML = defense + jeu[i].texte;
    jeu[i].options.forEach(function(element) {
        console.log(element);
        let newButton = document.createElement('button');
        newButton.setAttribute('onclick', element.fonction);
        newButton.innerHTML = element.texte;
        bouttonAfficher.appendChild(newButton);
    });
}

/*
 * fonction qui de rentrer son code de chargement
 */
function charger() {
    clear();
    ////
    let myDiv = document.createElement('div');
    myDiv.setAttribute('id', 'start');
    zoneDeJeu.appendChild(myDiv);
    ////
    let myInputCode = document.createElement('input');
    myInputCode.setAttribute('id', 'codeChargement');
    myInputCode.setAttribute('placeholder', 'Code');
    myDiv.appendChild(myInputCode);
    ///
    let myButtonValider = document.createElement('button');
    myButtonValider.setAttribute('onclick', 'chargement()');
    myButtonValider.innerHTML = "Charger";
    myDiv.appendChild(myButtonValider);
}

/*
 * fonction qui analyse le code et lance le jeu
 */
function chargement() {
    let code = document.getElementById('codeChargement').value;
    let tabCode = code.split('0');
    console.log(tabCode);
    if (isNaN(parseInt(tabCode[2])) || tabCode.length != 3 || ((tabCode[1] != "male") && (tabCode[1] != "femelle"))) {
        alert("code invalide");
        return;
    }
    if(parseInt(tabCode[2]) > 24 || parseInt(tabCode[2]) < 0) {
        alert("code invalide");
        return;
    }
    personnage = new Joueur(tabCode[0], tabCode[1]);
    jouage(parseInt(tabCode[2], 10));
    console.log(code);
}

/*
 * FONCTION QUI CLEAR TOUT
 */
function clear() {
    //clear de tout les event et autre
    zoneDeJeu.innerHTML = '';
    document.onkeydown = null;
}

startGame();