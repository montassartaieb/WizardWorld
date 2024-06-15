document.getElementById('fetch-houses').addEventListener('click', async function() {
    try {
        const response = await fetch('https://wizard-world-api.herokuapp.com/Houses');
        const data = await response.json();
        displayHouses(data);
    } catch (error) {
        console.error('Error fetching houses:', error);
        document.getElementById('house-result').innerHTML = '<p>Failed to fetch houses.</p>';
    }
});

function displayHouses(houses) {
    const resultContainer = document.getElementById('house-result');
    resultContainer.innerHTML = '<h2>Houses</h2>';
    if (houses.length === 0) {
        resultContainer.innerHTML += '<p>No houses found.</p>';
        return;
    }

    houses.forEach(house => {
        const houseDiv = document.createElement('div');
        houseDiv.className = 'house';
        houseDiv.innerHTML = `
            <h3>${house.name}</h3>
            <p><strong>Colours:</strong> ${house.houseColours}</p>
            <p><strong>Founder:</strong> ${house.founder}</p>
            <p><strong>Animal:</strong> ${house.animal}</p>
            <p><strong>Element:</strong> ${house.element}</p>
            <p><strong>Ghost:</strong> ${house.ghost}</p>
            <p><strong>Common Room:</strong> ${house.commonRoom}</p>
        `;
        resultContainer.appendChild(houseDiv);
    });
}
