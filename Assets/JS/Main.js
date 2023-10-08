const pokemonsList = document.getElementById('pokemonList')
const loadMorebutton = document.getElementById('Loadmore')
const maxRecords = 151
const limit = 20
let offset = 0



function loadPokemonItens(offset, limit) {
       PokeApi.getPokemon(offset, limit).then((pokemon = []) => {
        const newHtml = pokemon.map((pokemon) => `
            <li class="pokemon ${pokemon.type}"id="pokemon" onClick=redirectToPokemonDetails(${pokemon.number})>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
        
            <div class="detail">
                <ol class="types">
                ${pokemon.types.map ((type) => `<li class="type ${type}"> ${type}</li>`).join('')}
                </ol>
        
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        
        </li>
        `        
        ).join('')
        pokemonsList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMorebutton.addEventListener('click', () => {
    offset += limit

    const qtdRecordnextpage = offset + limit

    if (qtdRecordnextpage >= maxRecords){
    const newLimit =  maxRecords - offset
    loadPokemonItens(offset, newLimit)
        loadMorebutton.parentElement.removeChild(loadMorebutton)

    } else {
        loadPokemonItens(offset, limit)}

    })

    function redirectToPokemonDetails(pokemon) {
        window.location.href = `/pokemon.html?pokemon=${pokemon}`;
    }