import { updatePlaceholders } from './updateAccount.js';
import { displayOrders } from './orderHistory.js';
import { terminateAccount } from './terminateAccount.js';

document.addEventListener('DOMContentLoaded', () => {
  greetUser();
});

document.getElementById('closeAbout').addEventListener('click', () => {
  document.getElementById('aboutSection').style.display = 'none';
});
/**
 * Greets the user
 */
function greetUser () {
// Get the current time
  const now = new Date();
  const hours = now.getHours(); // Get the hour (0-23)

  // Determine the greeting based on the time
  let greeting;

  if (hours < 12) {
    greeting = 'Good Morning!';
  } else if (hours < 16) {
    greeting = 'Good Afternoon!';
  } else {
    greeting = 'Good Evening!';
  }

  // Get user's name
  const user = getUser();
  if (user === null) {
    return;
  }
  document.getElementById('greeting').textContent = `${greeting} ${user.name.split(' ')[0]}`;
}

const navigationOptions = document.querySelectorAll('.options');
navigationOptions.forEach(option => {
  option.addEventListener('click', () => {
    const anchorId = option.getAttribute('id');
    if (anchorId === 'aboutAnchor') {
      // Get user's data from the session storage
      const user = getUser();

      // Check if user exists
      if (user == null) return;

      // Set user's data to the table display
      displayUserData(user);
      document.getElementById('aboutSection').style.display = 'block';
      return;
    }
    if (anchorId === 'update') {
      document.getElementById('updateSection').style.display = 'block';
      updatePlaceholders();
      return;
    }
    if (anchorId === 'orders') {
      document.getElementById('orderSection').style.display = 'block';
      displayOrders();
      return;
    }
    if (anchorId === 'terminate') {
      terminateAccount();
    }
  });
});

/**
 * Displays a user's data to the about section table
 * @param user The user's data
 */
function displayUserData (user) {
  document.getElementById('fullName').textContent = (!user.name) ? 'Unknown Customer' : user.name;
  document.getElementById('username').textContent = (!user.username) ? 'No Username' : user.username;
  document.getElementById('email').textContent = (!user.email) ? 'No Email Address' : user.email;
  document.getElementById('phone').textContent = (!user.phone) ? 'No Phone Number' : user.phone;
  document.getElementById('address').textContent = (!user.address) ? 'No Address' : user.address;
  document.getElementById('accountType').textContent = (!user.user_type) ? 'No Account Type' : user.user_type;
  document.getElementById('accountStatus').textContent =
        (!user.account_status) ? 'No account Status' : user.account_status;
}

/**
 * Retrieves a user's data from the session storage
 * @returns {any|null} the user data, null if not found
 */
export function getUser () {
  const user = JSON.parse(sessionStorage.getItem('userData'));
  if (!user || Object.keys(user).length === 0) {
    alert('An error has occurred while fetching your data!\nPlease login again!');
    return null;
  }
  return user;
}
