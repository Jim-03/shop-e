import { getUser } from './account.js';

/**
 * Retrieves an item's data from the server
 * @param id the item's id
 * @return the items data
 */
function getItem (id) {
  fetch(`/api/items/get/${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.status !== 'success') {
        alert(data.message);
        return;
      }
      return data.item;
    })
    .catch(error => {
      alert(`An error has occurred while retrieving the item: ${error.message}`);
    });
}
/**
 * Retrieves a list of items in an order
 * @param id the order's primary key
 * @returns {null, items[]} a list of items or null
 */
function getItemsFromOrder (id) {
  fetch(`/api/orderedItems/${id}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Check if items are present
      if (data.status !== 'success') {
        alert(data.message);
        return null;
      }
      return data.items;
    });
}

/**
 * Displays a list of orders made by a customer
 * @param orders The list of orders
 */
function showOrders (orders) {
  orders.forEach(order => {
    // Fetch the list of item's in the order
    const items = getItemsFromOrder(order.id);

    if (!items) {
      alert(`Failed to get the items from order ${order.id}`);
    }
    // Create div container
    const orderDiv = document.createElement('div');
    orderDiv.setAttribute('class', 'order');

    // Create the order's heading
    const orderNumber = document.createElement('p');
    orderNumber.setAttribute('class', 'orderNumber');
    orderNumber.textContent = `Order Number ${order.id}`;

    // Append the heading
    orderDiv.appendChild(orderNumber);

    let totalPrice = 0;

    // iterate through each item and append to the order div container
    for (let i = 0; i < items.length; i++) {
      const orderedItem = items[i];
      const itemData = getItem(orderedItem.item_id);
      if (itemData === null) {
        continue;
      }
      // Create the item p tag
      const p = document.createElement('p');
      p.setAttribute('class', 'orderedItems');
      p.textContent = `Item ${i + 1}: ${orderedItem.quantity} ${itemData.name} @ ${orderedItem.purchase_price}`;

      // Add to the total price
      totalPrice += orderedItem.purchase_price;

      // Append the item to the container
      orderDiv.appendChild(p);
    }

    const total = document.createElement('p');
    total.setAttribute('class', 'totalPrice');
    total.textContent = `Total price: ${totalPrice}Ksh`;
    orderDiv.appendChild(total);
  });
}

/**
 * Fetches orders made by the user
 * Controls the order's display UI
 * Displays the orders on the UI
 */
export function displayOrders () {
  // Get the user's data
  const user = getUser();

  // Check if user data is present
  if (user === null) return;

  // Fetch the orders made by customer
  const url = `/api/orders/${user.id}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Check if customer made any orders
      if (data.status !== 'success') {
        alert(data.message);
        document.getElementById('orderSection').style.display = 'none';
        return;
      }
      // Get the list of orders
      const orders = Array.isArray(data.orders) ? data.orders : [data.orders];
      showOrders(orders);
    });
}

document.getElementById('closeOrder').addEventListener('click', () => {
  document.getElementById('orderSection').style.display = 'none';
});
