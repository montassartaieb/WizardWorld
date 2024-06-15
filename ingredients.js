document.getElementById('ingredient-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('ingredient-name').value;
    
    let url = 'https://wizard-world-api.herokuapp.com/Ingredients';
    if (name) {
        url += `?Name=${name}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayIngredients(data);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        document.getElementById('ingredient-result').innerHTML = '<p>Failed to fetch ingredients.</p>';
    }
});

function displayIngredients(ingredients) {
    const resultContainer = document.getElementById('ingredient-result');
    resultContainer.innerHTML = '<h2>Ingredients</h2>';
    if (ingredients.length === 0) {
        resultContainer.innerHTML += '<p>No ingredients found.</p>';
        return;
    }

    ingredients.forEach(ingredient => {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredient';
        ingredientDiv.innerHTML = `
            <h3>${ingredient.name}</h3>
        `;
        resultContainer.appendChild(ingredientDiv);
    });
}
