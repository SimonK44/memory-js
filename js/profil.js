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
    document.getElementById("size-choice").value = currentUser.sizeChoice;
    document.getElementById("memory-choice").value = currentUser.memoryChoice;
} else {
    $logout.style.display = "none";
};

// Gestion de la deconnexion
$logout.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = "connection.html";
});

// Choix du memory, affichage de l'image correspondante
const $memoryPicture = document.getElementById("memory-pic");
const $memoryChoice = document.getElementById("memory-choice");
$memoryChoice.addEventListener("change", function(event) {
    $memoryPicture.src = this.value;
});
$memoryPicture.src = $memoryChoice.value;

// Récupération des données User pour enregistrement des choix
const usersData = JSON.parse(localStorage.getItem('users'));

// Récupération des éléments du formulaire lors du submit
const $formProfil = document.getElementById("formProfil");
$formProfil.addEventListener("submit", function(event) {
    event.preventDefault();

    const $selectedSize = document.getElementById("size-choice").value;
    const $selectedMemory = document.getElementById("memory-choice").value;

    // Enregistrement dans le local storage et affichage sur la page profil
    if(usersData) {
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