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
  fetch(`/api/items/category/${categoryName}`)
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
        window.location.href = '/account';
        break;
      case 'helpDiv':
        window.location.href = '/help';
        break;
      case 'cartDiv':
        window.location.href = '/cart';
        break;
      case 'loginDiv':
        window.location.href = '/login';
        break;
    }
  });
});
