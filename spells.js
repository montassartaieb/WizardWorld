document.getElementById('spell-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('spell-name').value;
    const type = document.getElementById('spell-type').value;
    
    let url = 'https://wizard-world-api.herokuapp.com/Spells';
    const params = [];
    
    if (name) params.push(`Name=${name}`);
    if (type) params.push(`Type=${type}`);
    
    if (params.length > 0) {
        url += '?' + params.join('&');
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        displaySpells(data);
    } catch (error) {
        console.error('Error fetching spells:', error);
        document.getElementById('spell-result').innerHTML = '<p>Failed to fetch spells.</p>';
    }
});

function displaySpells(spells) {
    const resultContainer = document.getElementById('spell-result');
    resultContainer.innerHTML = '<h2>Spells</h2>';
    if (spells.length === 0) {
        resultContainer.innerHTML += '<p>No spells found.</p>';
        return;
    }

    spells.forEach(spell => {
        const spellDiv = document.createElement('div');
        spellDiv.className = 'spell';
        spellDiv.innerHTML = `
            <h3>${spell.name}</h3>
            <p><strong>Incantation:</strong> ${spell.incantation}</p>
            <p><strong>Effect:</strong> ${spell.effect}</p>
            <p><strong>Type:</strong> ${spell.type}</p>
            <p><strong>Can be verbal:</strong> ${spell.canBeVerbal ? 'Yes' : 'No'}</p>
        `;
        resultContainer.appendChild(spellDiv);
    });
}
