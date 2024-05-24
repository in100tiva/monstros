// Função para buscar os monstros do arquivo JSON
export async function fetchMonsters() {
    try {
        const response = await fetch('data/monsters.json');
        const data = await response.json();
        return validateMonsters(data); // Valida os dados dos monstros
    } catch (error) {
        console.error('Error fetching the monsters:', error);
        return []; // Retorna um array vazio em caso de erro
    }
}

// Função para validar os dados dos monstros
function validateMonsters(monsters) {
    return monsters.filter(monster => {
        // Verifica se todos os campos necessários estão presentes e corretos
        return typeof monster.nome === 'string' &&
               typeof monster.tipo === 'string' &&
               typeof monster.nivel === 'number' &&
               typeof monster.XP === 'number' &&
               typeof monster.pericias === 'object' &&
               typeof monster.atributos === 'object' &&
               typeof monster.defesas === 'object' &&
               (typeof monster.ataques_especiais === 'object' || typeof monster.ataques_especiais === 'string') &&
               Array.isArray(monster.itens);
    });
}

// Função para obter a lista de favoritos do localStorage
export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Função para adicionar ou remover um monstro dos favoritos
export function toggleFavorite(monsterName) {
    let favorites = getFavorites();
    if (favorites.includes(monsterName)) {
        favorites = favorites.filter(name => name !== monsterName);
    } else {
        favorites.push(monsterName);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Função para verificar se um monstro é favorito
export function isMonsterFavorite(monsterName) {
    const favorites = getFavorites();
    return favorites.includes(monsterName);
}
