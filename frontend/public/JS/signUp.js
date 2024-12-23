/**
 * Adds a new user to the database
 * @returns {Promise<any|null>} a response from the database or null
 */
async function addUser () {
  // Fetch new user data
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('newPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const name = document.getElementById('fullName').value.trim();

  // Check if password is entered
  if (!password || password.length !== 8) {
    notifySignUp('red', 'Password must be 8 characters long!');
    return;
  }

  // Confirm if passwords match
  if (confirmPassword !== password) {
    notifySignUp('red', 'Passwords don\'t match!');
    return;
  }

  // Check if username is provided
  if (!username || username.length === 0) {
    notifySignUp('red', 'Enter a valid username!');
    return;
  }

  // Check if email is provided
  if (!email || email.length === 0) {
    notifySignUp('red', 'Provide the email address');
    return;
  }

  // Confirm if email is correct using regex
  const emailRegex = /^[a-zA-Z0-9+._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const regex = new RegExp(emailRegex);
  if (!regex.test(email)) {
    notifySignUp('red', 'Enter the right email format!');
    return;
  }

  // Confirm phone details
  if (!phone || phone.length < 8) {
    notifySignUp('red', 'Enter a valid phone number!');
    return;
  }
  const phoneRegex = /^\+?[0-9]{1,3}[0-9]{7,12}$/;
  const isPhoneCorrect = new RegExp(phoneRegex);
  if (!isPhoneCorrect.test(phone)) {
    notifySignUp('red', 'Enter a valid phone number with the country code e.g +123012345678');
    return;
  }

  // Confirm name details
  if (!name || name.length === 0) {
    notifySignUp('red', 'Enter your full name!');
    return;
  }

  try {
    const user = {
      username,
      password,
      email,
      name,
      phone
    };
    const data = await fetchUser(user);

    // Notify the user on the ongoing registration
    switch (data.status) {
      case 'rejected':
        notifySignUp('blue', data.message);
        return;
      case 'success':
        notifySignUp('green', data.message);
        location.replace('http://0.0.0.0:5123/user');
        return;
      default:
        notifySignUp('red', data.message);
    }
  } catch (e) {
    notifySignUp('red', `An error occurred while trying to communicate with the server: ${e.message}`);
  }
}

/**
 * Fetches a response status from the server
 @param user The user's data
 * @returns {Promise<{status: string, message: string}>} A response from the database
 */
async function fetchUser (user) {
  // Add user to the api
  const url = 'http://0.0.0.0:5123/api/account/new';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  return await response.json();
}

/**
 * Notifies a user on the registration process
 * @param color The color of the message
 * @param message The message content
 */
function notifySignUp (color, message) {
  // Get the notification tag
  const notification = document.getElementById('notification');

  // Clear previous notification
  notification.textContent = '';

  // Set message
  notification.textContent = message.trim();

  // Set color
  notification.style.color = color;

  // Set display
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}

/**
 * Auto capitalizes a user's name
 * @param name The name of the user
 * @returns {string} The capitalized name
 */
function capitalizeName (name) {
  const nameList = name.toLowerCase().split(' ');
  const capitalizedName = [];
  nameList.forEach(name => {
    capitalizedName.push(name.charAt(0).toUpperCase() + name.slice(1));
  });

  return capitalizedName.join(' ');
}

document.getElementById("signUpButton").addEventListener('click', addUser)