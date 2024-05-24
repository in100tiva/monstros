import { fetchMonsters, toggleFavorite, isMonsterFavorite } from './data.js';
import { displayMonsters, setupPagination, setupFavoriteFilter } from './ui.js';

const itemsPerPage = 5; // Define o número de itens por página
let currentPage = 1; // Define a página inicial

document.addEventListener("DOMContentLoaded", async () => {
    const monsters = await fetchMonsters(); // Busca os monstros do arquivo JSON
    displayMonsters(monsters, currentPage, itemsPerPage); // Exibe os monstros na página inicial
    setupPagination(monsters, currentPage, itemsPerPage, displayMonsters); // Configura a paginação
    setupFavoriteFilter(monsters, displayMonsters, currentPage, itemsPerPage); // Configura o filtro de favoritos

    // Adiciona um listener para filtrar os monstros conforme o usuário digita
    document.getElementById('searchInput').addEventListener('keyup', () => filterMonsters(monsters));
});

// Função para filtrar os monstros conforme o usuário digita
function filterMonsters(monsters) {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredMonsters = monsters.filter(monster => monster.nome.toLowerCase().includes(input));
    currentPage = 1; // Reseta para a primeira página ao filtrar
    displayMonsters(filteredMonsters, currentPage, itemsPerPage); // Exibe os monstros filtrados
    setupPagination(filteredMonsters, currentPage, itemsPerPage, displayMonsters); // Configura a paginação para os monstros filtrados
}
