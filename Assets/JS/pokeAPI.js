const PokeApi = {}

function ConvertPokeApi(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typesSlot) => typesSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.base_experience = pokeDetail.base_experience;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name);
    pokemon.species = pokeDetail.species.name;

    const moves = pokeDetail.moves.map((movesData) => movesData.move.name);
    const [move] = moves;
    pokemon.moves = moves;
    pokemon.move = move;

    const stats = pokeDetail.stats.map((statsData) => ({
        stat: statsData.stat.name,
        base_stat: statsData.base_stat
    }));
    const [stat] = stats;
    pokemon.stats = stats;
    pokemon.stat = stat;

    return pokemon;
}

PokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(ConvertPokeApi);
}

PokeApi.getPokemon = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
}
