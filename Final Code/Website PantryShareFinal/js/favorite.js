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
