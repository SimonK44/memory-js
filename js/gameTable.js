// Affichage des derniers scores dans la page profil
function displayCurrentUserGames() {    
    const gamesData = JSON.parse(localStorage.getItem('games'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const $gameTableBody = document.getElementById("game-table-body");

    if (currentUser && gamesData && gamesData.length > 0) {        
        $gameTableBody.innerHTML = "";

        const currentUserGames = gamesData.filter(game => game.name === currentUser.name);

        if (currentUserGames.length > 0) {
            currentUserGames.forEach(game => {
                const $row = document.createElement("tr");
                const { name, date, count } = game;

                const $nameCell = document.createElement("td");
                $nameCell.textContent = name;
                const $countCell = document.createElement("td");
                $countCell.textContent = count;
                const $sizeCell = document.createElement("td");
                $sizeCell.textContent = "";
                const $memoryCell = document.createElement("td");
                $memoryCell.textContent = "";
                const $dateCell = document.createElement("td");
                $dateCell.textContent = date;            

                $row.appendChild($nameCell);
                $row.appendChild($countCell);
                $row.appendChild($sizeCell);
                $row.appendChild($memoryCell);
                $row.appendChild($dateCell);            

                $gameTableBody.appendChild($row);
            });
        } else {
            $gameTableBody.innerHTML = "<tr><td colspan='5'>Aucun jeu enregistré pour cet utilisateur.</td></tr>";
        }
    } else {
        $gameTableBody.innerHTML = "<tr><td colspan='5'>Aucun jeu enregistré.</td></tr>";
    };
};

// Affichage des 5 meilleurs scores dans la page jeu
function displayUserGames() {    
    const gamesData = JSON.parse(localStorage.getItem('games'));
    const $gameTableBody = document.getElementById("game-table-body");

    if (gamesData && gamesData.length > 0) {  

        $gameTableBody.innerHTML = "";
        const sortedCurrentUserGames = gamesData.sort((a, b) => a.count - b.count);
        const top5Scores = sortedCurrentUserGames.slice(0, 5);
        console.log(sortedCurrentUserGames);

        top5Scores.forEach(game => {
            const $row = document.createElement("tr");
            const { name, date, count } = game;

            const $nameCell = document.createElement("td");
            $nameCell.textContent = name;
            const $countCell = document.createElement("td");
            $countCell.textContent = count;
            const $sizeCell = document.createElement("td");
            $sizeCell.textContent = "";
            const $memoryCell = document.createElement("td");
            $memoryCell.textContent = "";
            const $dateCell = document.createElement("td");
            $dateCell.textContent = date;            

            $row.appendChild($nameCell);
            $row.appendChild($countCell);
            $row.appendChild($sizeCell);
            $row.appendChild($memoryCell);
            $row.appendChild($dateCell);            

            $gameTableBody.appendChild($row);
        });    
    } else {
    $gameTableBody.innerHTML = "<tr><td colspan='5'>Aucun jeu enregistré.</td></tr>";
    };
};

export { displayCurrentUserGames, displayUserGames };