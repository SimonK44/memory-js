import { saveUser, checkUserMail, checkUserName } from "./storage.js"

const $contactForm = document.getElementById("formInscription");

const user = {};
const errors = [];
const KEY_LS_USERS = "users";

// Récupération de l'input password pour évaluation
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', passwordEvaluation);
    });

// Analyse des éléments du fomulaire lors du submit
$contactForm.addEventListener("submit", (event) => {
    errors.length = 0;
    event.preventDefault();

    // Mise à 0 des messages d'erreurs
    const $errorInputs = document.querySelectorAll("[id^=erreur-]");
    $errorInputs.forEach((error) => (error.innerHTML = ""));

    const $inputs = event.currentTarget.querySelectorAll("input");

    // Contrôle de chaque champs avec les fonctions associées et renvoi d'un message d'erreur
    $inputs.forEach((input) => {         
        switch (input.id) {
            case "name":
                if (!validateName(input.value)) {
                    errors.push([input.id, "Choisissez un pseudo contenant au moins 3 caractères"]);
                } else if (checkUserName(KEY_LS_USERS, input.value)){
                    errors.push([input.id, "Nom déjà utilisé"]);
                } else {
                    user.name = input.value;
                }
                break;
            case "mail":
                if (!validateEmail(input.value)) {
                    errors.push([input.id, "L'email n'est pas correct"]);                    
                } else if (checkUserMail(KEY_LS_USERS, input.value)){
                    errors.push([input.id, "Email déjà utilisé"]);  
                } else {
                    user.email = input.value;
                }
                break;
            case "password":
                if (validatePassword(input.value) === 'weak') {
                    errors.push([input.id, "Le mot de passe n'est pas correct"]);
                } else {
                    user.password = input.value;
                    user.sizeChoice = "";
                    user.memoryChoice = "";
                }
                break;  
            case "confpassword":
                if (input.value != user.password) {
                    errors.push([input.id, "Le mot de passe est différent"]);
                }
                break;            
            default:
                    errors.push(["", "Erreur inconnue"]);
                break;
        }
    });

    // Pour chaque erreur, un message affiché sous l'input
    if (errors.length > 0) {        
        errors.map((error) => {        
            const $errorField = document.getElementById(`erreur-${error[0]}`);
            $errorField.innerHTML = error[1];            
        });
        // Animation CSS en cas d'erreur
        document.body.classList.add('shake');
        // Arrêt de l'animation
        setTimeout(function() {
            document.body.classList.remove('shake');
        }, 500);
    } else {        
        // Sinon enregistrement de l'objet user dans le LS
        saveUser(KEY_LS_USERS, user);
        const $msgSuccess = document.getElementById("message-success");
        $msgSuccess.innerHTML = "Inscription enregistrée !";

        setTimeout(() => {
            $msgSuccess.innerHTML = "";
            window.location.href = "connection.html";
        }, 4000);        
    }

});

// Regex nom, retourne true/false
function validateName(name) {
    const namePattern = /.{3,}/;
    return namePattern.test(name);
};

// Regex mail, retourne true/false
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
};

// Regex mdp
function validatePassword(password) {
    // Retourne faible si nul ou - de 6 caractères
    if (!password || password.length < 6) {
            return "weak";
        }

    const chiffreOuSymboleRegex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const contientChiffreOuSymbole = chiffreOuSymboleRegex.test(password);
    
    // Retourne strong si + de 9 caractères, au moins un symbole, un chiffre et des lettres sinon medium 
    if (password.length >= 6 && contientChiffreOuSymbole) {
        const chiffreRegex = /[0-9]/;
        const contientChiffre = chiffreRegex.test(password);

        const symboleRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        const contientSymbole = symboleRegex.test(password);

        if (contientChiffre && contientSymbole && password.length > 9) {
            return "strong";
        } else {
            return "medium";
        }
    }
    return "weak";
};

// Evaluation du mot de passe pour alimenter la jauge dans le formulaire
function passwordEvaluation() {
    const password = document.getElementById('password').value;
    const level = validatePassword(password);
    const strengthMeterFill = document.getElementById('password-strength-meter-fill');
    switch (level) {
        case 'weak':
            strengthMeterFill.style.width = '30%';
            strengthMeterFill.textContent = 'Faible';
            strengthMeterFill.className = 'password-strength-meter-fill weak';
            break;
        case 'medium':
            strengthMeterFill.style.width = '60%';
            strengthMeterFill.textContent = 'Moyen';
            strengthMeterFill.className = 'password-strength-meter-fill medium';
            break;
        case 'strong':
            strengthMeterFill.style.width = '100%';
            strengthMeterFill.textContent = 'Fort';
            strengthMeterFill.className = 'password-strength-meter-fill strong';
            break;
        default:
            strengthMeterFill.style.width = '0%';
            strengthMeterFill.className = 'password-strength-meter-fill';
    }
};
