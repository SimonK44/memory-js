/**
 * Enregistrement dans le LS
 * @param {string} key 
 * @param {object} user 
 */
function saveUser(key, user) {
    const users = getUsers(key)
    users.push(user)
    localStorage.setItem(key, JSON.stringify(users))
}

/**
 * Récupération des éléments du LS
 * @param {*} key 
 * @returns 
 */
function getUsers(key) {
    const datasFromLocalstorage = localStorage.getItem(key);
    const convertUsers = JSON.parse(datasFromLocalstorage) || [];

    return convertUsers;
};

function checkUserMail(key, mail) {
    const users = getUsers(key);
    if (users) {
        for (const user of users) {
            if (mail === user.email) {                
                return true;
            }            
        }
    } 
    return false;    
};

function checkUserName(key, name) {
    const users = getUsers(key);
    if (users) {
        for (const user of users) {
            if (name === user.name) {                
                return true;
            }            
        }
    }    
    return false;     
};

export { saveUser, checkUserName, checkUserMail };