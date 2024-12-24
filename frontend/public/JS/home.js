const displaySection = document.getElementById('displaySection');

document.getElementById('filterButton').addEventListener('click', showFilterForm);
document.getElementById('closeButton').addEventListener('click', closeFilterForm);
document.addEventListener('DOMContentLoaded', displayItems);
document.getElementById('searchInput').addEventListener('input', searchItem);
document.getElementById('searchButton').addEventListener('input', searchItem);

/**
 * Shows the filter form
 */
function showFilterForm () {
  document.getElementById('displaySection').style.display = 'none';
  document.getElementById('filterSection').style.display = 'block';
}

/**
 * Hides the filter form
 */
function closeFilterForm () {
  document.getElementById('displaySection').style.display = 'flex';
  document.getElementById('filterSection').style.display = 'none';
}

/**
 * Displays the items fetched from the database
 */
async function displayItems () {
  try {
    // Fetch items from the database
    const response = await fetch('http://0.0.0.0:5123/api/items');
    const data = await response.json();

    // Check if the response is ok
    if (data.status !== 'success') {
      showError(data.message);
      return;
    }

    // Populate the display section
    showItems(data.items);
  } catch (e) {
    alert(`An error occurred while fetching the items: ${e.message}`);
  }
}

/**
 * Displays a list of items
 * @param itemList[] A list of items
 */
function showItems (itemList) {
  // Clear the display section
  displaySection.textContent = null;
  // Ensure the itemList is a list
  itemList = Array.isArray(itemList) ? itemList : [itemList];
  itemList.forEach(item => {
    const section = document.createElement('section');
    section.setAttribute('class', 'items');
    section.innerHTML = `
            <img src="${item.image_url}" alt="${item.name} image">
            <p class="itemName"><b>Name:</b> ${item.name}</p>
            <p class="itemPrice"><b>Price:</b> ${item.selling_price} Ksh</p>
            <p class="itemStock"><b>Stock:</b> ${item.stock}</p>
            `;

    displaySection.appendChild(section);
  });
}

/**
 * Displays an error message from the server
 * @param {string}error The error message
 */
function showError (error) {
  const message = document.createElement('p');
  message.textContent = error;
  message.style.color = 'red';
  message.style.fontSize = '30px';
  message.style.textAlign = 'center';
  message.style.margin = 'auto';
  document.getElementById('displaySection').innerHTML = '';
  document.getElementById('displaySection').appendChild(message);
  document.getElementById('displaySection').style.alignContent = 'center';
}

/**
 * Searches for an item in the database
 */
async function searchItem () {
  try {
    const name = document.getElementById('searchInput').value;
    displaySection.innerHTML = '';
    if (name.trim().length === 0) {
      await displayItems();
      return;
    }
    const url = `http://0.0.0.0:5123/api/items/${name}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'success') {
      showError(data.message);
      return;
    }

    showItems(data.data);
  } catch (e) {
    alert(`An error has occurred: ${e.message}`);
  }
}
