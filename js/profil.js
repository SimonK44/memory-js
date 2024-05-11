import { disconnect } from "./disconnect.js";
import { displayCurrentUserGames } from "./gameTable.js";

const $displayName = document.getElementById("name-profil");
const $displayMail = document.getElementById("mail-profil");
const $memoryPicture = document.getElementById("memory-pic");
const $memoryChoice = document.getElementById("memory-choice");
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const $logout = document.getElementById("logout-link");

// Appel de la fonction pour afficher les derniers scores de l'utilisateur
window.addEventListener("DOMContentLoaded", displayCurrentUserGames);

$memoryPicture.src = $memoryChoice.value;

// affichage nom/mail sur la page profil et blocage de la saisie
if (currentUser) {    
    disconnect($logout);
    $displayName.value = currentUser.name;
    $displayName.readOnly = true;
    $displayMail.value = currentUser.email;
    $displayMail.readOnly = true;    
    document.getElementById("size-choice").value = currentUser.sizeChoice;
    document.getElementById("memory-choice").value = currentUser.memoryChoice;
    $memoryPicture.src = $memoryChoice.value;
} else {
    $logout.style.display = "none";
};

// Choix du memory, affichage de l'image correspondante
$memoryChoice.addEventListener("change", function(event) {
    $memoryPicture.src = this.value;
});

// Récupération des données User pour enregistrement des choix
const usersData = JSON.parse(localStorage.getItem('users'));

// Récupération des éléments du formulaire lors du submit
const $formProfil = document.getElementById("formProfil");
$formProfil.addEventListener("submit", function(event) {
    event.preventDefault();

    const $selectedSize = document.getElementById("size-choice").value;
    const $selectedMemory = document.getElementById("memory-choice").value;

    // Enregistrement dans le local storage et affichage sur la page profil
    if(usersData && currentUser) {
        usersData.forEach((user) => {
            if(currentUser.email === user.email) {              
            currentUser.sizeChoice = $selectedSize;
            currentUser.memoryChoice = $selectedMemory;
            user.sizeChoice = $selectedSize;
            user.memoryChoice = $selectedMemory;
    
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('users', JSON.stringify(usersData));  
            
            document.getElementById("size-choice").value = currentUser.sizeChoice;
            document.getElementById("memory-choice").value = currentUser.memoryChoice;

            // Message de prise en compte
            const $statusSave = document.getElementById("message-success");      
            $statusSave.innerHTML = "Modifications prises en compte.";
            setTimeout(() => {            
                $statusSave.innerHTML = "";           
            }, 5000); 
            }   
        });
    };
});