/**
 * Save Localstorage
 * @param {string} key 
 * @param {object} user 
 */
function saveUser(key, user) {
    // Get old users
    const users = getUsers(key)
    // add new One
    users.push(user)
    // Save in LS
    localStorage.setItem(key, JSON.stringify(users))
}

/**
 * Get Data from Localstorage
 * @param {*} key 
 * @returns 
 */
function getUsers(key) {
    // Get users or array if empty
    const datasFromLocalstorage = localStorage.getItem(key)

    const convertUsers = JSON.parse(datasFromLocalstorage) || []

    return convertUsers
    // return JSON.parse(localStorage.getItem(key)) || []
}

function checkUser(email, password) {
    const usersData = JSON.parse(localStorage.getItem('userData'));

    // Vérifier si des données sont stockées et si l'email et le mot de passe correspondent
    if (usersData && storedData.email === email && storedData.password === password) {
        return true;
    } else {
        return false;
    }
}

export { saveUser, getUsers, checkUser };