import { capitalizeName, confirmUserData, notify } from './userUtils.js';

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

  try {
    const user = {
      username: username.toLowerCase(),
      password,
      email,
      name: capitalizeName(name),
      phone
    };

    // Check correct user data
    const isCorrect = confirmUserData(user, confirmPassword);
    if (!isCorrect) return;

    const data = await fetchUser(user);

    // Notify the user on the ongoing registration
    switch (data.status) {
      case 'rejected':
        notify('blue', data.message);
        return;
      case 'created':
        setTimeout(() => {
          notify('green', data.message);
        }, 3000);
        window.location.href = 'http://0.0.0.0:5123/login';
        return;
      default:
        notify('red', data.message);
    }
  } catch (e) {
    notify('red', `An error occurred while trying to communicate with the server: ${e.message}`);
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

document.getElementById('signUpButton').addEventListener('click', addUser);
