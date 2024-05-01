const $cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let count = 0;

function flipCard() {
    if (lockBoard){
        return;
    };

    if (this === firstCard) {
        return;
    };

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    };

    secondCard = this;
    
    checkForMatch ();
};

function checkForMatch () {
    if (firstCard.dataset.dino === secondCard.dataset.dino) {
        disableCard();
        return;        
    }

    unflipCards();
};

function disableCard () {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
};

function unflipCards () {
    lockBoard = true;
    setTimeout (() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();      
    }, 3000);
};

function resetBoard () {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];      
    count+=1;  
    let $displayCount = document.querySelector(".nbCoups");
    $displayCount.innerHTML = `Nombre de coups : ${count}`;
    console.log(count);  
}

(function shuffle() {
    $cards.forEach(card => {
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      location.reload();
    }
});

$cards.forEach(card => card.addEventListener('click', flipCard));
