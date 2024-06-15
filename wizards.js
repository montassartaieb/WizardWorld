document.getElementById('wizard-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('wizard-first-name').value;
    const lastName = document.getElementById('wizard-last-name').value;
    
    let url = 'https://wizard-world-api.herokuapp.com/Wizards';
    const params = [];
    
    if (firstName) params.push(`FirstName=${firstName}`);
    if (lastName) params.push(`LastName=${lastName}`);
    
    if (params.length > 0) {
        url += '?' + params.join('&');
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWizards(data);
    } catch (error) {
        console.error('Error fetching wizards:', error);
        document.getElementById('wizard-result').innerHTML = '<p>Failed to fetch wizards.</p>';
    }
});

function displayWizards(wizards) {
    const resultContainer = document.getElementById('wizard-result');
    resultContainer.innerHTML = '<h2>Wizards</h2>';
    if (wizards.length === 0) {
        resultContainer.innerHTML += '<p>No wizards found.</p>';
        return;
    }

    wizards.forEach(wizard => {
        const wizardDiv = document.createElement('div');
        wizardDiv.className = 'wizard';
        wizardDiv.innerHTML = `
            <h3>${wizard.firstName} ${wizard.lastName}</h3>
            <p><strong>Elixirs:</strong> ${wizard.elixirs.map(elixir => elixir.name).join(', ')}</p>
        `;
        resultContainer.appendChild(wizardDiv);
    });
}
