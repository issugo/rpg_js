/*
 * variables globales utilisablent de partout qui doivent rester défini
 */
let zoneDeJeu = document.querySelector('body');
let personnage;
let jeu = [
    {
        id: 0,
        texte: "salut",
        options: [
            {
                texte: "test",
                //texteSuivant: 1,
                fonction: "jouage(1)"
            },
            {
                texte: "test2",
                //textSuivant: 1,
                fonction: "jouage(1)"
            }
        ]
    },
    {
        id: 1,
        texte: "texte numero 2",
        options: [
            {
                texte: "test du texte 2",
                //texteSuivant: 2,
                fonction: "jouage(-1)"
            },
            {
                texte: "test du texte 2",
                //texteSuivant: 2,
                fonction: "jouage(2)"
            },
            {
                texte: "test du texte 2",
                //texteSuivant: 2,
                fonction: "jouage(2)"
            }
        ]
    }
];

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
    let choix3 = document.createElement('span');
    choix3.innerHTML = 'options';
    
    //les ajoute au DOM
    myDiv.appendChild(choix1);
    myDiv.appendChild(document.createElement('br'));
    myDiv.appendChild(choix2);
    myDiv.appendChild(document.createElement('br'));
    myDiv.appendChild(choix3);
    
    //set la classe active par défaut
    choix1.classList.add('active');
    
    //événement du arrow down ou arrow up
    document.onkeydown = function(event) {
        //si lors du choix le joueur appui sur z
        if (event.key === 'z' || event.key === 'Z' || event.key === 'ArrowUp') {
            if (document.getElementById('start').childNodes[0].classList.contains('active')) {
                document.getElementById('start').childNodes[0].classList.remove('active');
                document.getElementById('start').childNodes[4].classList.add('active');
                return;
            }
            if (document.getElementById('start').childNodes[2].classList.contains('active')) {
                document.getElementById('start').childNodes[2].classList.remove('active');
                document.getElementById('start').childNodes[0].classList.add('active');
                return;
            }
            if (document.getElementById('start').childNodes[4].classList.contains('active')) {
                document.getElementById('start').childNodes[4].classList.remove('active');
                document.getElementById('start').childNodes[2].classList.add('active');
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
                document.getElementById('start').childNodes[4].classList.add('active');
                return;
            }
            if (document.getElementById('start').childNodes[4].classList.contains('active')) {
                document.getElementById('start').childNodes[4].classList.remove('active');
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
                console.log("debug2");
            }
            if (document.getElementById('start').childNodes[4].classList.contains('active')) {
                //modifier les options
                console.log("debug3");
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
function jouage(index) {
    if (index < 0) {
        combat(index);
        return;
    }
    let i = index;
    clear();
    let texteAfficher = document.createElement('div');
    texteAfficher.setAttribute('id', 'texteAfficher');
    let bouttonAfficher = document.createElement('div');
    bouttonAfficher.setAttribute('id', 'bouttonAfficher');
    zoneDeJeu.appendChild(texteAfficher);
    zoneDeJeu.appendChild(bouttonAfficher);
    texteAfficher.innerHTML = jeu[i].texte;
    jeu[i].options.forEach(function(element) {
        console.log(element);
        let newButton = document.createElement('button');
        newButton.setAttribute('onclick', element.fonction);
        newButton.innerHTML = element.texte;
        bouttonAfficher.appendChild(newButton);
    });
}

/*
 * fonction que gère les bombats
 */
function combat(index) {
    console.log("je fais un combat");
}

/*
 * FONCTION QUI CLEAR TOUT
 */
function clear() {
    //clear de tout les event et autre
    zoneDeJeu.innerHTML = '';
    document.onkeypress = null;
}


function choixMainMenu(event) {
    console.log(event);
}

startGame();