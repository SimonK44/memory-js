const $connectForm = document.getElementById("formConnexion");

// Récupération des users du localStorage convertis
const usersData = JSON.parse(localStorage.getItem('users'));

// Vérification des infos lors du submit
$connectForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const $inputs = event.currentTarget.querySelectorAll("input");

    let emailEntered = "";
    let passwordEntered = "";
    let userFound = false;

    // Récupération des input mail et mdp
    $inputs.forEach((input) => {
        if(input.name === "mailConnect") {
            emailEntered = input.value;
        } else if(input.name === "passwordConnect") {
            passwordEntered = input.value;
        }
    });    

    // Comparaison avec les données du local storage    
    if(usersData) {
        usersData.forEach((user) => {
            if(user.email === emailEntered && user.password === passwordEntered) {
                userFound = true;
                return;
            }
        });
    }

    const $statusConnect = document.getElementById("message-success");  
    const $errConnect = document.getElementById("error-connexion");   

    if (userFound) {
        $statusConnect.innerHTML = "Connexion réussie !";
    } else {
        $errConnect.innerHTML = "Identifiants incorrects. Veuillez réessayer.";
    }
});    