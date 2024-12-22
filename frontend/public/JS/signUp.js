/**
 * Adds a new user to the database
 * @returns {Promise<any|null>} a response from the database or null
 */
async function addUser() {
    // Fetch new user data
    const username = document.getElementById("username").value;
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if password is entered
    if (!password || password.length !== 8) {
        notifySignUp('red', 'Password must be 8 characters long!')
        return
    }

    // Confirm if passwords match
    if (confirmPassword !== password) {
        notifySignUp('red', 'Passwords don\'t match!')
        return
    }

    // Check if username is provided
    if (!username || username.length === 0) {
        notifySignUp('red', 'Enter a valid username!')
        return
    }

    try {
        const data = await fetchUser(username, password)

        // Notify the user on the ongoing registration
        switch (data.status) {
            case 'rejected':
                notifySignUp('blue', data.message)
                return
            case 'success':
                notifySignUp('green', data.message)
                location.replace("http://0.0.0.0:5123/user");
                return
            default:
                notifySignUp('red', data.message)
        }
    } catch (e) {
        notifySignUp('red', `An error occurred while trying to communicate with the server: ${e.message}`)
    }
}

/**
 * Fetches a response status from the server
 * @param {string}username The new account's username
 * @param {string}password The new account's password
 * @returns {Promise<{status: string, message: string}>} A response from the database
 */
async function fetchUser(username, password) {
    // Add user to the api
    const url = "http://0.0.0.0:5123/api/account/new"
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    })

    return await response.json();
}

/**
 * Notifies a user on the registration process
 * @param color The color of the message
 * @param message The message content
 */
function notifySignUp(color, message) {
    // Get the notification tag
    const notification = document.getElementById('notification')

    // Clear previous notification
    notification.textContent = '';

    // Set message
    notification.textContent = message.trim()

    // Set color
    notification.style.color = color;

    // Set display
    notification.style.display = 'block'

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);


}

document.getElementById("signUpButton").addEventListener('click', addUser)