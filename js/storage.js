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

/**
 * Get Data from Localstorage
 * @param {*} key 
 * @returns 
 */
function getUsers(key) {
    const datasFromLocalstorage = localStorage.getItem(key);

    const convertUsers = JSON.parse(datasFromLocalstorage) || [];

    return convertUsers;
};

export { saveUser };