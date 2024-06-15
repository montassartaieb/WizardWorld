document.getElementById('elixir-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('elixir-name').value;
    const difficulty = document.getElementById('elixir-difficulty').value;
    
    let url = 'https://wizard-world-api.herokuapp.com/Elixirs';
    const params = [];
    
    if (name) params.push(`Name=${name}`);
    if (difficulty) params.push(`Difficulty=${difficulty}`);
    
    if (params.length > 0) {
        url += '?' + params.join('&');
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayElixirs(data);
    } catch (error) {
        console.error('Error fetching elixirs:', error);
        document.getElementById('elixir-result').innerHTML = '<p>Failed to fetch elixirs.</p>';
    }
});

function displayElixirs(elixirs) {
    const resultContainer = document.getElementById('elixir-result');
    resultContainer.innerHTML = '<h2>Elixirs</h2>';
    if (elixirs.length === 0) {
        resultContainer.innerHTML += '<p>No elixirs found.</p>';
        return;
    }

    elixirs.forEach(elixir => {
        const elixirDiv = document.createElement('div');
        elixirDiv.className = 'elixir';
        elixirDiv.innerHTML = `
            <h3>${elixir.name}</h3>
            <p><strong>Effect:</strong> ${elixir.effect}</p>
            <p><strong>Side Effects:</strong> ${elixir.sideEffects}</p>
            <p><strong>Characteristics:</strong> ${elixir.characteristics}</p>
            <p><strong>Time:</strong> ${elixir.time}</p>
            <p><strong>Difficulty:</strong> ${elixir.difficulty}</p>
        `;
        resultContainer.appendChild(elixirDiv);
    });
}
