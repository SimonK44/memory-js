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

export { saveUser, getUsers }