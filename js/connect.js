const $connectForm = document.getElementById("formConnection");

const usersData = JSON.parse(localStorage.getItem('users'));
console.log(usersData);

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

    if (userFound) {
        console.log('Connexion réussie !');
    } else {
        console.log('Identifiants incorrects. Veuillez réessayer.');
    }
});    