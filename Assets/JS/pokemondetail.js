document.addEventListener('DOMContentLoaded', async () => {
  console.log("DOM completamente carregado e analisado.");
  const pokemonId = getQueryParam("pokemon");
  console.log(`Carregando dados do Pokémon com ID: ${pokemonId}`);

  if (pokemonId) {
      try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          const pokeDetail = await response.json();
          const pokemonData = ConvertPokeApi(pokeDetail);
          console.log("Dados do Pokémon recebidos:", pokemonData);
          displayPokemonDetails(pokemonData);
      } catch (error) {
          console.error("Erro ao buscar dados do Pokémon:", error);
      }
  } else {
      console.log("Nenhum parâmetro 'pokemon' fornecido na URL.");
  }
});

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function displayPokemonDetails(pokemon) {
  const pokemonDetailsSection = document.getElementById('pokemon-details');
  if (!pokemonDetailsSection) {
      console.error("Elemento #pokemon-details não encontrado.");
      return;
  }
  console.log("Elemento #pokemon-details encontrado.");
  pokemonDetailsSection.innerHTML = `
      <div class="card ${pokemon.type}">
          <div class="top ${pokemon.type}">
              <div class="top-number"><span class="number">#${pokemon.number}</span></div>
              <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
          <div class="bottom">
              <h3 class="name">${pokemon.name}</h3>
              <div class="skills">
                  <ol>
                      ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                  </ol>
              </div>
              <div class="details">
                  <div class="about">
                      <p>Tamanho: ${pokemon.height} m</p>
                      <p>Peso: ${pokemon.weight} kg</p>
                  </div>
                  <span class="ability"><p class="abilities">Habilidades:</p>${pokemon.abilities.map((ability) => `<p>${ability}</p>`).join("")}</span>
              </div>
              <button id="back-home">Voltar</button>
          </div>
      </div>
  `;

  document.getElementById("back-home").addEventListener("click", goHome);
}

function goHome() {
  window.location.href = "index.html";
}
