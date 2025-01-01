import { capitalizeName, confirmUserData, notify } from './userUtils.js';
import { getUser } from './account.js';

const updateButtons = document.querySelectorAll('#updateButtons button');
updateButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();
    const type = button.getAttribute('type');
    if (type === 'reset') {
      document.getElementById('updateSection').style.display = 'none';
      return;
    }

    await updateUser();
  });
});

/**
 * Updates the placeholders of the input fields in the update form
 */
export function updatePlaceholders () {
  // Get input fields
  const newUsername = document.getElementById('newUsername');
  const newName = document.getElementById('newName');
  const oldPassword = document.getElementById('oldPassword');
  const newPassword = document.getElementById('newPassword');
  const confirmPassword = document.getElementById('confirmPassword');
  const newPhone = document.getElementById('newPhone');
  const newEmail = document.getElementById('newEmail');

  // Get User data
  const user = getUser();

  // Check if user exists
  if (user === null) {
    document.getElementById('updateSection').style.display = 'none';
  } else {
    newUsername.value = user.username;
    newName.value = user.name;
    newPhone.value = user.phone;
    newEmail.value = user.email;
  }
  oldPassword.setAttribute('placeholder', 'Your current password');
  newPassword.setAttribute('placeholder', 'New Password');
  confirmPassword.setAttribute('placeholder', 'Re-enter new password');
}

async function updateUser () {
  const username = document.getElementById('newUsername').value.trim();
  const password = document.getElementById('newPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const email = document.getElementById('newEmail').value.trim();
  const phone = document.getElementById('newPhone').value.trim();
  const name = document.getElementById('newName').value.trim();

  try {
    // Retrieve the user's data
    const user = getUser();
    // Update user data
    user.username = username.toLowerCase();
    user.password = password;
    user.email = email;
    user.phone = phone;
    user.name = capitalizeName(name);

    // Confirm if user data is correct
    const isCorrect = confirmUserData(user, confirmPassword);
    if (!isCorrect) return;

    await update(user);
  } catch (e) {
    alert(`An error has occurred while updating the user -> ${e.message}`);
  }
}

/**
 * Sends a PUT request to the server
 * @param user The new user data
 */
async function update (user) {
  try {
    const url = `http://0.0.0.0:5123/api/account/update/${user.id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();

    switch (data.status) {
      case 'rejected':
        notify('blue', data.message);
        break;
      case 'not_found':
        notify('purple', data.message);
        break;
      case 'success':
        notify('green', data.message);
        setTimeout(() => {
          document.getElementById('updateSection').style.display = 'none';
        }, 5000);
        break;
      default:
        notify('red', data.message);
        break;
    }
  } catch (e) {
    alert(`Error occurred -> ${e.message}`);
  }
}
