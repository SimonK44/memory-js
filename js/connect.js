const $connectForm = document.getElementById("formConnexion");

const usersData = JSON.parse(localStorage.getItem('users'));

$connectForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const $inputs = event.currentTarget.querySelectorAll("input");

    let emailSaisi = "";
    let passwordSaisi = "";

    $inputs.forEach((input) => {
        if(input.name === "mailConnect") {
            emailSaisi = input.value;
        } else if(input.name === "passwordConnect") {
            passwordSaisi = input.value;
        }
    });

    let userFound = false;

    if(usersData) {
        usersData.forEach((user) => {
            if(user.email === emailSaisi && user.password === passwordSaisi) {
                userFound = true;
                return;
            }
        });
    }

    const $statusConnect = document.getElementById("message-success");  
    const $errConnect = document.getElementById("erreur-connexion");   

    if (userFound) {
        $statusConnect.innerHTML = "Connexion réussie !";
    } else {
        $errConnect.innerHTML = "Identifiants incorrects. Veuillez réessayer.";
    }
});    