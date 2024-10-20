// Store ingredient data in a global object for tracking
const ingredients = {
    'Onion': {
        qty: 5, // initial quantity
        unit: 'pcs',
        consumeBy: '31/10/24'
    },
    'Cream': {
        qty: 500, // initial quantity
        unit: 'g',
        consumeBy: '31/11/24'
    }
};

// Function to open the Add Ingredient dialog
function openAddIngredientDialog() {
    document.getElementById('store-dialog-overlay').style.display = 'flex';
}

// Function to close the Add Ingredient dialog
function closeAddIngredientDialog() {
    document.getElementById('store-dialog-overlay').style.display = 'none';
}

// Function to add a new ingredient to the list
function addIngredient() {
    // Get input values from the dialog box
    const ingredientName = document.getElementById('store-ingredient-name').value;
    const quantity = document.getElementById('store-ingredient-quantity').value;
    const storedIn = document.getElementById('store-ingredient-storage').value;
    const consumeBy = document.getElementById('store-ingredient-expiry').value;

    // Check if all fields are filled
    if (ingredientName && quantity && storedIn && consumeBy) {
        // Get the table body where we will add the new row
        const tableBody = document.querySelector('tbody');

        // Create a new row and insert it into the table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${ingredientName}</td>
            <td>${quantity}</td>
            <td>${storedIn}</td>
            <td>${consumeBy}</td>
        `;
        tableBody.appendChild(newRow);

        // Clear input fields after adding
        document.getElementById('store-ingredient-name').value = '';
        document.getElementById('store-ingredient-quantity').value = '';
        document.getElementById('store-ingredient-storage').value = '';
        document.getElementById('store-ingredient-expiry').value = '';

        // Close the dialog after adding
        closeAddIngredientDialog();
    } else {
        alert("Please fill in all the fields.");
    }
}


// Cart to store the picked items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to open the dialog and populate it with the selected ingredient's details
function openDialog(ingredientName, maxQty, consumeDate) {
    // Populate the dialog with the ingredient data
    document.getElementById('ingredient-name').innerText = ingredientName;
    document.getElementById('max-qty').innerText = maxQty;
    document.getElementById('consume-date').innerText = consumeDate;

    // Populate the dropdown options dynamically based on available quantity
    const quantitySelect = document.getElementById('quantity-select');
    quantitySelect.innerHTML = ''; // Clear previous options
    for (let i = 1; i <= ingredients[ingredientName].qty; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;
        quantitySelect.appendChild(option);
    }

    // Store the selected ingredient name in a hidden input for later reference
    quantitySelect.setAttribute('data-ingredient', ingredientName);

    // Show the dialog overlay
    document.getElementById('dialog-overlay').style.display = 'flex';
}

// Function to close the dialog and update the table with the new quantity
function closeDialog() {
    // Get the selected quantity from the dropdown
    const quantitySelect = document.getElementById('quantity-select');
    const selectedQty = parseInt(quantitySelect.value);
    const ingredientName = quantitySelect.getAttribute('data-ingredient');

    // Update the ingredient quantity in the global object
    ingredients[ingredientName].qty -= selectedQty;

    // Update the table row to reflect the new quantity
    const ingredientRow = document.querySelector(`tr[data-ingredient="${ingredientName}"]`);
    const qtyCell = ingredientRow.querySelector('.ingredient-qty');
    qtyCell.innerText = `${ingredients[ingredientName].qty} ${ingredients[ingredientName].unit}`;

    // Add the picked ingredients to the cart
    const existingCartItem = cart.find(item => item.name === ingredientName);
    if (existingCartItem) {
        existingCartItem.qty += selectedQty;
    } else {
        cart.push({
            name: ingredientName,
            qty: selectedQty,
            unit: ingredients[ingredientName].unit
        });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Hide the dialog overlay
    document.getElementById('dialog-overlay').style.display = 'none';
}

// Redirect to the cart page
function redirectToCart() {
    window.location.href = 'cart.html';  // Replace this with the actual URL of the cart page
}

// Function to handle room number and redirect from the home page
function redirectToReciepe() {
    const roomNumber = document.getElementById('roomNumber').value;

    if (roomNumber) {
        // Redirect to your desired URL; you can use the roomNumber value as needed
        window.location.href = 'receipe.html';  // Replace this with your actual URL
    } else {
        alert('Please enter a room number.');
    }
}

// Function to open the popup with the dietary requirements
function openPopup(recipe) {
    const diaryContent = document.getElementById('diaryContent');
    
    // Dietary information for each recipe
    let dietaryInfo = '';
    if (recipe === 'Butter Chicken') {
        dietaryInfo = `
            <ul>
                <li>Contains milk</li>
                <li>Contains nuts</li>
            </ul>
        `;
    } else if (recipe === 'Fried Rice') {
        dietaryInfo = `
            <ul>
                <li>Vegan</li>
                <li>Gluten-free</li>
            </ul>
        `;
    } else if (recipe === 'Wonton') {
        dietaryInfo = `
            <ul>
                <li>Contains Pork</li>
                <li>Gluten-free</li>
            </ul>
        `;
    } else if (recipe === 'Japanese Curry') {
        dietaryInfo = `
            <ul>
                <li>Halal</li>
                <li>Gluten-free</li>
            </ul>
        `;
    }

    // Set content inside the popup
    diaryContent.innerHTML = dietaryInfo;
    
    // Show the popup
    document.getElementById('popupOverlay').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}
// Function Reciepe checkbox
function updateButtons() {
    const checkboxes = document.querySelectorAll('input[name="ingredient"]');
    const doneButton = document.getElementById('doneButton');

    // Enable buttons
    doneButton.disabled = false; // Always enable the Done button
}

// Check Ingredients function
function checkIngredients() {
    const checkboxes = document.querySelectorAll('input[name="ingredient"]');
    const missingIngredients = [];
    const formElement = document.getElementById('ingredientForm');
    const recipeIdentifier = formElement.getAttribute('data-recipe'); // Get the recipe identifier

    checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
            missingIngredients.push(checkbox.value);
        }
    });

    const popupMessage = document.getElementById('popupMessage');
    const missingIngredientsList = document.getElementById('missingIngredientsList');
    const pantryButton = document.getElementById('pantryButton');
    const recipeButton = document.getElementById('recipeButton');

    if (missingIngredients.length > 0) {
        popupMessage.textContent = "You have missing ingredients, but you can still proceed!";
        missingIngredientsList.innerHTML = `<ul><li>${missingIngredients.join('</li><li>')}</li></ul>`;
        pantryButton.style.display = 'block'; // Show Go to Pantry button
    } else {
        popupMessage.textContent = "All ingredients are available!";
        missingIngredientsList.innerHTML = '';
        pantryButton.style.display = 'none'; // Hide Go to Pantry button
    }

    // Set the recipe redirection URL based on the recipe identifier
    recipeButton.onclick = function() {
        goToRecipe(recipeIdentifier);
    };

    document.getElementById('popupOverlay').style.display = 'flex'; // Show popup
}

// Close Popup and redirect to recipe.html
document.getElementById('closePopup').onclick = function() {
    window.location.href = 'receipe.html'; // Redirect to recipe.html when closing
};

// Function to handle the recipe redirection based on the identifier
function goToRecipe(recipeIdentifier) {
    let recipeUrl = '';

    // Check the recipe identifier and set the appropriate URL
    switch (recipeIdentifier) {
        case 'butter_chicken':
            recipeUrl = 'butter_chicken_receipe.html';
            break;
        case 'fried_rice':
            recipeUrl = 'fried_rice_reciepe.html';
            break;
        case 'wonton':
            recipeUrl = 'wonton_receipe.html';
            break;
        case 'japanese_curry':
            recipeUrl = 'japanese_curry_receipe.html';
            break;
        default:
            recipeUrl = 'default_recipe.html'; // Fallback in case recipe identifier is missing
            break;
    }

    // Redirect to the correct recipe page
    window.location.href = recipeUrl;
}

// Handle form submission
document.getElementById('ingredientForm').onsubmit = function(event) {
    event.preventDefault(); // Prevent form submission
    checkIngredients();
};

// Function to redirect to pantry
function goToPantry() {
    // Redirect or perform an action to go to the pantry
    window.location.href = "pantry.html"; // Redirect to pantry
}

// Button Recipe Favorite
function goToFavorite() {
    window.location.href = "pantry.html";
}

// Button Recipe Done
function goToRecipeHome() {
    window.location.href = "receipe.html";
}

// Add Recipe Page
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipeForm");
    const ingredientList = [];

    // Handle image upload button click
    document.getElementById("uploadButton").addEventListener("click", () => {
        document.getElementById("imageUpload").click();
    });

    // Function to handle adding ingredients
    document.querySelector('.add-btn').addEventListener('click', () => {
        const qty = document.getElementById('qty').value;
        const ingredientName = document.getElementById('ingredientName').value;

        if (qty && ingredientName) {
            ingredientList.push({ qty, ingredientName });
            document.getElementById('qty').value = '';
            document.getElementById('ingredientName').value = '';
        } else {
            alert("Please fill both Quantity and Ingredient Name fields");
        }
    });

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const recipeName = document.getElementById('recipeName').value;
        const recipeInstructions = document.getElementById('recipeInstructions').value;

        const recipeData = {
            recipeName,
            ingredients: ingredientList,
            instructions: recipeInstructions
        };

        // Save the recipe to localStorage
        let storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        storedRecipes.push(recipeData);
        localStorage.setItem('recipes', JSON.stringify(storedRecipes));

        // Redirect to profile page to view the added recipe
        window.location.href = "profile.html";
    });
});
// Sample data for demonstration, normally this would be fetched from an API
const recipeData = {
    "1": {
        name: "Butter Chicken",
        imgSrc: "Images/Butter Chicken.jpeg",
        type: "Indian dish",
        prepTime: "45 mins",
        cookTime: "20 mins",
        link: "butter_chicken_ingridients.html"
    },
    "2": {
        name: "Fried Rice",
        imgSrc: "Images/Friedrice.jpeg",
        type: "Indonesian dish",
        prepTime: "10 mins",
        cookTime: "10 mins",
        link: "fried_rice_ingridients.html"
    },
    "3": {
        name: "Wonton",
        imgSrc: "Images/Wonton.jpeg",
        type: "Chinese dish",
        prepTime: "20 mins",
        cookTime: "15 mins",
        link: "wonton_ingridients.html"
    },
    "4": {
        name: "Japanese Curry",
        imgSrc: "Images/Japenese Curry.jpeg",
        type: "Japanese dish",
        prepTime: "15 mins",
        cookTime: "30 mins",
        link: "japanese_curry_ingridients.html"
    }
};

// Display Favorite Recipes from localStorage
function displayFavoriteRecipes() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteRecipesContainer = document.getElementById('favoriteRecipesContainer');
    const noFavoritesMessage = document.getElementById('noFavoritesMessage');

    favoriteRecipesContainer.innerHTML = '';

    if (favorites.length === 0) {
        noFavoritesMessage.style.display = 'block';
        favoriteRecipesContainer.style.display = 'none';
    } else {
        noFavoritesMessage.style.display = 'none';
        favoriteRecipesContainer.style.display = 'grid';

        favorites.forEach(recipeId => {
            const recipe = recipeData[recipeId];
            if (recipe) {
                favoriteRecipesContainer.innerHTML += `
                    <div class="favorite-recipe-card">
                        <a href="${recipe.link}"><img src="${recipe.imgSrc}" alt="${recipe.name}"></a>
                        <div class="favorite-description">
                            <h3><a href="${recipe.link}">${recipe.name}</a></h3>
                            <span class="dish-type">${recipe.type}</span>
                            <ul>
                                <li>Prep time: ${recipe.prepTime}</li>
                                <li>Cook time: ${recipe.cookTime}</li>
                            </ul>
                            <i data-feather="heart" class="favorite-icon" onclick="removeFromFavorites(${recipeId})"></i>
                        </div>
                    </div>
                `;
            }
        });

        feather.replace(); // Re-init Feather icons after inserting HTML
    }
}

// Remove a recipe from favorites
function removeFromFavorites(recipeId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== recipeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavoriteRecipes();
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    displayFavoriteRecipes(); // Load favorite recipes
});

// Search functionality
document.getElementById('searchBar').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const recipes = document.querySelectorAll('.favorite-recipe-card');

    recipes.forEach(recipe => {
        const recipeName = recipe.querySelector('h3').textContent.toLowerCase();
        recipe.style.display = recipeName.includes(searchTerm) ? 'block' : 'none';
    });
});
//Function toggle favorite
function toggleFavorite(recipeName, recipeId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const heartIcon = document.querySelector(`[data-recipe-id="${recipeId}"] .favorite-icon`);

    if (favorites.includes(recipeId)) {
        // Remove from favorites
        const index = favorites.indexOf(recipeId);
        favorites.splice(index, 1);
        heartIcon.classList.remove('favorited');
    } else {
        // Add to favorites
        favorites.push(recipeId);
        heartIcon.classList.add('favorited');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Redirect to the favourite page after clicking the heart icon
    window.location.href = "favorite.html";
}
//button reciepe
// Function to handle redirection to the favorites page
function goToFavorite() {
    window.location.href = 'favorite.html'; // Change this to your actual favorite page URL
}

// Function to handle redirection to the recipe home page
function goToReciepeHome() {
    window.location.href = 'home.html'; // Change this to your actual home page URL
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    const favoriteButton = document.getElementById('favoriteButton');
    const doneButton = document.getElementById('doneButton');
    
    // Show buttons when the page loads
    if (favoriteButton && doneButton) {
        favoriteButton.style.display = 'block'; // Make the favorite button visible
        doneButton.style.display = 'block'; // Make the done button visible
    }
});
