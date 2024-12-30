
/**
 * Auto capitalizes a user's name
 * @param name The name of the user
 * @returns {string} The capitalized name
 */
export function capitalizeName (name) {
  const nameList = name.toLowerCase().split(' ');
  const capitalizedName = [];
  nameList.forEach(name => {
    capitalizedName.push(name.charAt(0).toUpperCase() + name.slice(1));
  });

  return capitalizedName.join(' ');
}

/**
 * Checks if the user input is ok
 * @param user the user's data
 * @param confirmPassword The confirmatory password
 * @returns {boolean} true if correct else undefined
 */
export function confirmUserData (user, confirmPassword) {
  // Check if password is entered
  if (!user.password || user.password.length !== 8) {
    notify('red', 'Password must be 8 characters long!');
    return;
  }

  // Confirm if passwords match
  if (confirmPassword !== user.password) {
    notify('red', 'Passwords don\'t match!');
    return;
  }

  // Check if username is provided
  if (!user.username || user.username.length === 0) {
    notify('red', 'Enter a valid username!');
    return;
  }

  // Check if email is provided
  if (!user.email || user.email.length === 0) {
    notify('red', 'Provide the email address');
    return;
  }

  // Confirm if email is correct using regex
  const emailRegex = /^[a-zA-Z0-9+._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const regex = new RegExp(emailRegex);
  if (!regex.test(user.email)) {
    notify('red', 'Enter the right email format!');
    return;
  }

  // Confirm phone details
  if (!user.phone || user.phone.length < 8) {
    notify('red', 'Enter a valid phone number!');
    return;
  }
  const phoneRegex = /^\+?[0-9]{1,3}[0-9]{7,12}$/;
  const isPhoneCorrect = new RegExp(phoneRegex);
  if (!isPhoneCorrect.test(user.phone)) {
    notify('red', 'Enter a valid phone number with the country code e.g +123012345678');
    return;
  }

  // Confirm name details
  if (!user.name || user.name.length === 0) {
    notify('red', 'Enter your full name!');
    return;
  }
  return true;
}

/**
 * Notifies a user on the registration process
 * @param color The color of the message
 * @param message The message content
 */
export function notify (color, message) {
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
