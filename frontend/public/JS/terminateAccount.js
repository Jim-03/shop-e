import { getUser } from './account.js';

/**
 * Sets the terminate section's display to 'none'
 */
function displayNone () {
  document.getElementById('terminateSection').style.display = 'none';
  resetConfirmBox();
}

/**
 * Sets the terminate section's display to 'block'
 */
function displayBlock () {
  document.getElementById('terminateSection').style.display = 'block';
}

/**
 * Changes the content of the confirmation box
 */
function displayConfirmBox () {
  // Get the HTML element
  const confirmBox = document.getElementById('confirmBox');
  // Remove any existing content
  confirmBox.innerHTML = '';

  // Display the confirmation message
  confirmBox.innerHTML = `
    <p>To proceed please enter your account details below</p>
    <div>
        <label for="password">Password</label>
        <input type="password" id="password">
    </div>
    <div>
        <button id="delete">Delete</button>
        <button id="no">Cancel</button>
    </div>
    `;

  /**
   * Clicking event listener to delete user's data
   */
  document.getElementById('delete').addEventListener('click', () => {
    // Get user's credentials
    const user = getUser();

    const password = document.getElementById('password').value;

    // Check if user data exists
    if (user === null) {
      resetConfirmBox();
      displayNone();
      return;
    }

    if (!password || password.length === 0) {
      alert('Please enter your password!');
      return;
    }

    // Submit the data to the server
    fetch(`/api/account/delete/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          notifyInConfirmBox(data.message);
          sessionStorage.setItem('userData', null);
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
          return;
        }
        alert(data.message);
        resetConfirmBox();
      })
      .catch(error => {
        resetConfirmBox();
        alert(`An error has occurred while communicating with the server: ${error.message}`);
      });
  });
  document.getElementById('no').addEventListener('click', displayNone);
}

// Confirms on whether the user wants to delete their account
export function terminateAccount () {
  const deleteAccount = confirm('You are about to delete your account.\nDo you wish to continue?');
  if (deleteAccount === false) {
    displayNone();
    return;
  }
  displayBlock();
}

/**
 * Resets the confirm box to original content
 */
function resetConfirmBox () {
  const confirmBox = document.getElementById('confirmBox');
  confirmBox.innerHTML = '';
  confirmBox.innerHTML = `
    <p>On deleting your account the following will also be deleted:</p>
                <ul>
                    <li>Any orders made</li>
                    <li>Basic account details</li>
                    <li>Any shop registered under your account</li>
                </ul>
                <p>Do you still wish to proceed?</p>
                <div>
                    <button id="yes">Yes</button>
                    <button id="no">No</button>
                </div>
`;
  document.getElementById('yes').addEventListener('click', displayConfirmBox);
  document.getElementById('no').addEventListener('click', displayNone);
}

/**
 * Display a message received from the server
 * @param {string}message The message string
 */
function notifyInConfirmBox (message) {
  const confirmBox = document.getElementById('confirmBox');
  confirmBox.innerHTML = '';
  confirmBox.innerHTML = `
    <p>${message}</p>
    <p>You'll be redirected to the landing page shortly</p>
    `;

  confirmBox.style.color = 'green';
}
document.getElementById('yes').addEventListener('click', displayConfirmBox);
