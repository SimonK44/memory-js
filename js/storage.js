/**
 * Save Localstorage
 * @param {string} key 
 * @param {object} user 
 */
function saveUser(key, user) {
    const users = getUsers(key)
    users.push(user)
    localStorage.setItem(key, JSON.stringify(users))
}

export { saveUser };