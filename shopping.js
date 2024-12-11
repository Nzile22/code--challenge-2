// Get DOM elements
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-item-btn');
const clearButton = document.getElementById('clear-list-btn');
const shoppingList = document.getElementById('shopping-list');

// Retrieve shopping list from localStorage if available
let shoppingItems = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render the list
function renderList() {
  shoppingList.innerHTML = ''; // Clear the current list
  shoppingItems.forEach((item, index) => {
    // Create a list item
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.marginBottom = '10px';

    // Item name
    const itemName = document.createElement('span');
    itemName.textContent = item.name;
    itemName.style.flexGrow = '1'; // Push buttons to the right
    if (item.purchased) {
      itemName.style.textDecoration = 'line-through';
      itemName.style.backgroundColor = '#d3ffd3'; // Light green background
    }
    itemName.addEventListener('dblclick', () => editItem(index)); // Allow editing on double-click
    li.appendChild(itemName);

    // Mark as Purchased Button
    const markPurchasedBtn = document.createElement('button');
    markPurchasedBtn.textContent = item.purchased ? 'Undo Purchase' : 'Mark as Purchased';
    markPurchasedBtn.style.marginRight = '10px';
    markPurchasedBtn.addEventListener('click', () => togglePurchased(index));
    li.appendChild(markPurchasedBtn);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.backgroundColor = '#f44336';
    deleteBtn.style.color = 'white';
    deleteBtn.addEventListener('click', () => deleteItem(index));
    li.appendChild(deleteBtn);

    // Append list item to the shopping list
    shoppingList.appendChild(li);
  });
}

// Function to add a new item
function addItem() {
  const itemName = itemInput.value.trim();
  if (itemName !== '') {
    shoppingItems.push({ name: itemName, purchased: false });
    saveToLocalStorage();
    renderList();
    itemInput.value = ''; // Clear input field
  }
}

// Function to toggle the purchased state
function togglePurchased(index) {
  shoppingItems[index].purchased = !shoppingItems[index].purchased;
  saveToLocalStorage();
  renderList();
}

// Function to delete an item
function deleteItem(index) {
  shoppingItems.splice(index, 1); // Remove item from the array
  saveToLocalStorage();
  renderList();
}

// Function to clear the entire list
function clearList() {
  shoppingItems = [];
  saveToLocalStorage();
  renderList();
}

// Function to edit an item
function editItem(index) {
  const newName = prompt('Edit item name:', shoppingItems[index].name);
  if (newName) {
    shoppingItems[index].name = newName.trim();
    saveToLocalStorage();
    renderList();
  }
}

// Function to save the list to localStorage
function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingItems));
}

// Event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);

// Render the list on page load
renderList();
