// Gestion de la deconnexion, mise à jour de la navbar
function disconnect ($logout) {        
    const $connectLink = document.getElementById("connect-link");
    const $inscLink = document.getElementById("insc-link");
    $logout.style.display = "block";
    $connectLink.style.display = "none";
    $inscLink.style.display = "none";

    // $logout.removeEventListener("click", handleLogout);
    $logout.addEventListener("click", handleLogout);    
};

function handleLogout (event) {
        event.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = "connection.html"; 
};

export { disconnect };