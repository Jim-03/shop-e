/**
 * Checks the input type using regular expressions
 * @param {string} input The data to be confirmed
 * @returns {string|null} The input type or null if invalid
 */
function inputType(input) {
    if (!input || typeof input !== "string") {
        return null;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[+0-9]{10,15}$/;

    if (emailRegex.test(input)) {
        return 'email';
    }

    if (phoneRegex.test(input)) {
        return 'phone';
    }

    return 'username';
}

/**
 * Fetches user details from the API
 * @param {Object} user The user object containing login details
 * @returns {Promise<Object>} The response JSON
 */
async function fetchUser(user) {
    const url = 'http://0.0.0.0:5123/api/account/get';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    return await response.json()
}

/**
 * Handles the login process
 * @param {Event} event The form submission event
 */
async function getUser(event) {
    event.preventDefault();

    const identity = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!identity || !password) {
        notifyLogin('red', 'Please enter both username/email/phone and password!');
        return;
    }

    const identityType = inputType(identity);

    if (!identityType) {
        notifyLogin('red', 'Invalid input! Please enter a valid email, phone, or username.');
        return;
    }

    const user = { password };

    switch (identityType) {
        case 'email':
            user.email = identity;
            break;
        case 'phone':
            user.phone = identity;
            break;
        default:
            user.username = identity;
            break;
    }

    const data = await fetchUser(user);

    // Handle response based on the status
    switch (data.status) {
        case 'success':
            notifyLogin('darkgreen', data.message);
            sessionStorage.setItem('userData', JSON.stringify(data.data));
            location.replace('http://0.0.0.0:5123/home');
            break;
        case 'not_found':
            notifyLogin('purple', data.message);
            break;
        case 'rejected':
            notifyLogin('red', data.message);
            break;
        default:
            notifyLogin('black', data.message);
            break;
    }
}

/**
 * Displays login notifications
 * @param {string} color The color of the notification
 * @param {string} message The notification message
 */
function notifyLogin(color, message) {
    const paragraph = document.getElementById('notificationSection');
    paragraph.textContent = message;
    paragraph.style.color = color;
}

/**
 * Toggles password visibility
 */
function viewPassword() {
    const passwordField = document.getElementById('password');
    passwordField.type = document.getElementById('viewPassword').checked ? 'text' : 'password';
}

// Event Listeners
document.getElementById('submit').addEventListener('click', getUser);
document.getElementById('viewPassword').addEventListener('change', viewPassword);
