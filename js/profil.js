// Gestion de la deconnexion + affichage page profil
const $logout = document.getElementById("logout-link");
const $connectLink = document.getElementById("connect-link");
const $inscLink = document.getElementById("insc-link");
const $displayName = document.getElementById("name-profil");
const $displayMail = document.getElementById("mail-profil");
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Mise à jour de la navbar
// affichage nom/mail sur la page profil et blocage de la saisie
if (currentUser) {
    $logout.style.display = "block";
    $displayName.value = currentUser.name;
    $displayName.readOnly = true;
    $displayMail.value = currentUser.email;
    $displayMail.readOnly = true;
    $connectLink.style.display = "none";
    $inscLink.style.display = "none";
} else {
    $logout.style.display = "none";
};

// Gestion de la deconnexion
$logout.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = "connection.html";
});

const $memoryPicture = document.getElementById("memoryPic");
const $memoryChoice = document.getElementById("memoryChoice");
$memoryChoice.addEventListener("change", function(event) {
    $memoryPicture.src = this.value;    
});




