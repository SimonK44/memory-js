const $cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let count = 0;
let winCount = 0;

// Clique des cartes
function flipCard() {
    // Si plateau vérrouillé, stop
    if (lockBoard){
        return;
    };
    
    // Si 2 cliques sur la même carte, stop
    if (this === firstCard) {
        return;
    };

    // flip (classe CSS) de la carte
    this.classList.add('flip');

    // Première carte
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    };
    
    // Seconde carte
    secondCard = this;
    
    // Appel de la fonction pour comparer les 2 cartes
    checkForMatch ();
};

// Vérification des cartes retournées + compteur de coups gagnant
function checkForMatch () {
    if (firstCard.dataset.dino === secondCard.dataset.dino) {
        disableCard();
        winCount+=1;
        if (winCount == 6) {
            let $displayWinCount = document.querySelector(".nbCoups");
            $displayWinCount.innerHTML = `Vous avez gagné en ${count} coups !`;
            setTimeout (() => {
                alert(`Bravo, vous avez gagné en ${count} coups !`);
            }, 1500);
        }
        return;        
    }
    unflipCards();
};

// Arrêt de l'écoute des cliques sur les cartes gagnantes
function disableCard () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
};

// Flip des cartes non compatibles après 2 sec
function unflipCards () {
    lockBoard = true;
    setTimeout (() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();      
    }, 2000);
};

// RAZ des variables + compteur de coups
function resetBoard () {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];      
    count+=1;  
    let $displayCount = document.querySelector(".nbCoups");
    $displayCount.innerHTML = `Nombre de coups : ${count}`;
}

// Fonction auto invoquée pour modifier aléatoirement l'ordre des cartes
(function shuffle() {
    $cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();

// RAZ du jeu avec la touche espace
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        [count, winCount] = [-1, 0];

        resetBoard();        

        const flippedCards = document.querySelectorAll('.flip');
        flippedCards.forEach(card => {
            card.classList.remove('flip');        
        });
        console.log(hasFlippedCard,lockBoard,firstCard,secondCard,count,winCount);
    }
});

// Ecoute de chaque clique sur les cartes avec flipCard en callback
$cards.forEach(card => card.addEventListener('click', flipCard));