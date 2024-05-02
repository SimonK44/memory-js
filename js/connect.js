import { getUsers, checkUser } from "./storage.js"

// connection
const $connectForm = document.getElementById("formConnection");
$connectForm.addEventListener("submit", (event) => {
    const $inputs = event.currentTarget.querySelectorAll("input");

    $inputs.forEach((input) => {         
        switch (input.id) {
            case "mailConnect":
                if (!validateName(input.value)) {
                    errors.push([input.id, "Choisissez un pseudo contenant au moins 3 caractères"]);
                } else {
                    user.name = input.value;
                }
                break;
            case "passwordConnect":
                if (!validateEmail(input.value)) {
                    errors.push([input.id, "L'email n'est pas correct"]);
                } else {
                    user.email = input.value;
                }
                break;
    // récupérer les infos saisies

const emailSaisi = 'utilisateur@example.com';
const passwordSaisi = 'motdepasse123';

if (checkUser(emailSaisi, passwordSaisi)) {
    console.log('Connexion réussie !');
    // Redirection vers la page d'accueil ou autre action à effectuer en cas de connexion réussie
} else {
    console.log('Identifiants incorrects. Veuillez réessayer.');
    // Afficher un message d'erreur à l'utilisateur ou effectuer une autre action en cas d'échec de connexion
}
    // comparer le mail au données du ls
    // message d'erreur si mail incorrect

    // comparer le mot de passe au mail
    // message d'erreur mot de passe incorrect

    // message authentification réussie
});
