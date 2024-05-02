const $contactForm = document.getElementById("formInscription");

const user = {};
const errors = [];
const KEY_LOCALSTORAGE = "users";

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', passwordEvaluation);
    });

$contactForm.addEventListener("submit", (event) => {
    errors.length = 0;
    event.preventDefault();

    const $errorInputs = document.querySelectorAll("[id^=erreur-]");
    $errorInputs.forEach((error) => (error.innerHTML = ""));

    const $inputs = event.currentTarget.querySelectorAll("input");

    $inputs.forEach((input) => {         
        switch (input.id) {
            case "name":
                if (!validateName(input.value)) {
                    errors.push([input.id, "Choisissez un pseudo contenant au moins 3 caractères"]);
                } else {
                    user.name = input.value;
                }
                break;
            case "mail":
                if (!validateEmail(input.value)) {
                    errors.push([input.id, "L'email n'est pas correct"]);
                } else {
                    user.email = input.value;
                }
                break;
            case "password":
                if (validatePassword(input.value) === 'weak') {
                    errors.push([input.id, "Le mot de passe n'est pas correct"]);
                } else {
                    user.password = input.value;
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

    if (errors.length > 0) {        
        errors.map((error) => {        
            const $errorField = document.getElementById(`erreur-${error[0]}`);
            $errorField.innerHTML = error[1];
        });
    } else {
        console.log("Save");
        
        saveUser(KEY_LOCALSTORAGE, user);
        const $msgSuccess = document.getElementById("message-success");
        $msgSuccess.innerHTML = "User register successfully";

        setTimeout(() => {
            $msgSuccess.innerHTML = "";
        }, 5000);
    }

});

function validateName(name) {
    const namePattern = /^[a-zA-Z0-9._%+-]{3,}$/;
    return namePattern.test(name);
};

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
};

function validatePassword(password) {
    if (!password || password.length < 6) {
            return "weak";
        }

    const chiffreOuSymboleRegex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const contientChiffreOuSymbole = chiffreOuSymboleRegex.test(password);
    
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
