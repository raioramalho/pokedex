
const pokeApi = {}

function convertPokeApiDetailToPokemon(detailPokemon) {
    const pokemon = new Pokemon()
    pokemon.number = detailPokemon.id
    pokemon.name = detailPokemon.name

    const abilities = detailPokemon.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    const [abilitie] = abilities

    pokemon.abilities = abilities
    pokemon.abilitie = abilitie

    const types = detailPokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.peso = (detailPokemon.weight / 10)

    pokemon.altura = (detailPokemon.height / 10)

    pokemon.photo = detailPokemon.sprites.other.home.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

export default pokeApi
