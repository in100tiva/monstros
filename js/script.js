document.addEventListener("DOMContentLoaded", () => {
    fetch('data/monsters.json')
        .then(response => response.json())
        .then(data => {
            displayMonsters(data);
        })
        .catch(error => console.error('Error fetching the monsters:', error));
});

function displayMonsters(monsters) {
    const container = document.getElementById('monstersContainer');
    container.innerHTML = '';
    monsters.forEach(monster => {
        const monsterCard = document.createElement('div');
        monsterCard.className = 'monster-card';
        monsterCard.innerHTML = `
            <h2>${monster.nome}</h2>
            <p><strong>Tipo:</strong> ${monster.tipo}</p>
            <p><strong>Nível:</strong> ${monster.nivel}</p>
            <p><strong>XP:</strong> ${monster.XP}</p>
            <p><strong>Perícias:</strong> ${formatObject(monster.pericias)}</p>
            <p><strong>Atributos:</strong> ${formatObject(monster.atributos)}</p>
            <p><strong>Defesas:</strong> ${formatObject(monster.defesas)}</p>
            <p><strong>Ataques Especiais:</strong> ${formatObject(monster.ataques_especiais)}</p>
            <p><strong>Itens:</strong> ${formatArray(monster.itens)}</p>
        `;
        container.appendChild(monsterCard);
    });
}

function filterMonsters() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    fetch('data/monsters.json')
        .then(response => response.json())
        .then(monsters => {
            const filteredMonsters = monsters.filter(monster => monster.nome.toLowerCase().includes(input));
            displayMonsters(filteredMonsters);
        })
        .catch(error => console.error('Error filtering the monsters:', error));
}

function formatObject(obj) {
    let formatted = '<ul>';
    for (const key in obj) {
        formatted += `<li><strong>${key}:</strong> ${obj[key]}</li>`;
    }
    formatted += '</ul>';
    return formatted;
}

function formatArray(arr) {
    if (arr.length === 0) return 'Nenhum';
    return '<ul>' + arr.map(item => `<li>${item}</li>`).join('') + '</ul>';
}
