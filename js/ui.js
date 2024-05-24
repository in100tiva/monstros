import { toggleFavorite, isMonsterFavorite } from './data.js';

// Função para exibir os monstros na página
export function displayMonsters(monsters, page, itemsPerPage) {
    const container = document.getElementById('monstersContainer');
    container.innerHTML = '';
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedMonsters = monsters.slice(start, end);
    
    paginatedMonsters.forEach(monster => {
        const monsterCard = document.createElement('div');
        monsterCard.className = 'monster-card';
        const isFavorite = isMonsterFavorite(monster.nome);
        monsterCard.innerHTML = `
            <h2 class="monster-name">${monster.nome}</h2>
            <button class="favorite-button ${isFavorite ? 'favorited' : ''}" onclick="toggleFavorite('${monster.nome}')">❤</button>
            <div class="monster-details">
                <p><strong>Tipo:</strong> ${monster.tipo}</p>
                <p><strong>Nível:</strong> ${monster.nivel}</p>
                <p><strong>XP:</strong> ${monster.XP}</p>
                <p><strong>Perícias:</strong> ${formatObject(monster.pericias)}</p>
                <p><strong>Atributos:</strong> ${formatObject(monster.atributos)}</p>
                <p><strong>Defesas:</strong> ${formatObject(monster.defesas)}</p>
                <p><strong>Ataques Especiais:</strong> ${typeof monster.ataques_especiais === 'string' ? monster.ataques_especiais : formatObject(monster.ataques_especiais)}</p>
                <p><strong>Itens:</strong> ${formatArray(monster.itens)}</p>
            </div>
        `;
        container.appendChild(monsterCard);
    });

    // Esconde os detalhes dos monstros por padrão
    $('.monster-details').hide();

    // Adiciona a funcionalidade de expandir/colapsar ao clicar no nome do monstro
    $('.monster-name').click(function() {
        $(this).nextAll('.monster-details').slideToggle(300);
    });
}

// Função para configurar a paginação
export function setupPagination(monsters, currentPage, itemsPerPage, displayMonsters) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';
    const pageCount = Math.ceil(monsters.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.className = 'pagination-button';
        if (i === currentPage) pageButton.classList.add('active');
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayMonsters(monsters, currentPage, itemsPerPage);
            document.querySelector('.pagination-button.active').classList.remove('active');
            pageButton.classList.add('active');
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Função para configurar o filtro de favoritos
export function setupFavoriteFilter(monsters, displayMonsters, currentPage, itemsPerPage) {
    document.getElementById('favoriteFilter').addEventListener('click', () => {
        const favoriteMonsters = monsters.filter(monster => isMonsterFavorite(monster.nome));
        currentPage = 1;
        displayMonsters(favoriteMonsters, currentPage, itemsPerPage);
        setupPagination(favoriteMonsters, currentPage, itemsPerPage, displayMonsters);
    });
}

// Função para formatar objetos em listas HTML
function formatObject(obj) {
    if (typeof obj === 'string') return obj; // Handle the case where obj is a string like "nenhum"
    let formatted = '<ul>';
    for (const key in obj) {
        formatted += `<li><strong>${key}:</strong> ${obj[key]}</li>`;
    }
    formatted += '</ul>';
    return formatted;
}

// Função para formatar arrays em listas HTML
function formatArray(arr) {
    if (arr.length === 0) return 'Nenhum';
    return '<ul>' + arr.map(item => `<li>${item}</li>`).join('') + '</ul>';
}
