const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertAbilityName(pokeAbility) {
    PokemonsDet.weight = pokeAbility.weight
    PokemonsDet.height = pokeAbility.height
    PokemonsDet.abilityName = pokeAbility.abilities.map((abilities) => abilities.ability.name)
    PokemonsDet.photo = pokeAbility.sprites.other.dream_world.front_default
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 6) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getDetailsOfPokemons = (number) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`

    return fetch(url)
    .then((res) => res.json())
    .then((DetailsOfPokemons) => DetailsOfPokemons)
    .then(convertAbilityName)
}