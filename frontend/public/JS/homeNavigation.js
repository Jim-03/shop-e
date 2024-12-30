const sideBarButtons = document.querySelectorAll('#sideBar button');

sideBarButtons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonName = button.getAttribute('id');

    switch (buttonName) {
      case 'electronicsButton':
        fetchAndDisplay('electronics');
        break;
      case 'computerButton':
        fetchAndDisplay('computers');
        break;
      case 'phoneButton':
        fetchAndDisplay('phones');
        break;
      case 'clothingButton':
        fetchAndDisplay('clothes');
        break;
      case 'kitchenButton':
        fetchAndDisplay('kitchen');
        break;
      case 'homeButton':
        fetchAndDisplay('home');
        break;
      case 'officeButton':
        fetchAndDisplay('office');
        break;
      case 'mechanicalButton':
        fetchAndDisplay('mechanical');
        break;
      case 'toolsButton':
        fetchAndDisplay('tools');
        break;
      case 'skinCareButton':
        fetchAndDisplay('skin care');
        break;
    }
  });
});

function fetchAndDisplay (categoryName) {
  fetch(`http://0.0.0.0:5123/api/items/category/${categoryName}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.status !== 'success') {
        showError(data.message);
        return;
      }
      showItems(data.data);
    });
}

const navigationButtons = document.querySelectorAll('.navButtons');
navigationButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('id');
    switch (name) {
      case 'accountDiv':
        window.open('http://0.0.0.0:5123/account', '_blank');
        break;
      case 'helpDiv':
        window.open('http://0.0.0.0:5123/help', '_blank');
        break;
      case 'cartDiv':
        window.open('http://0.0.0.0:5123/cart', '_blank');
        break;
      case 'loginDiv':
        window.open('http://0.0.0.0:5123/login', '_blank');
        break;
    }
  });
});
