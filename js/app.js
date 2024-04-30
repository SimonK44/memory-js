// Nb aleatoire pour determiner l'indice du set
// let nbRandom = Math.floor(Math.random()*12);


// Tourner les cartes cliquées de 180°
const $cards = document.querySelectorAll('.memory-card');

function flipCard() {
    this.classList.toggle('flip');
};

$cards.forEach(card => card.addEventListener('click', flipCard));



