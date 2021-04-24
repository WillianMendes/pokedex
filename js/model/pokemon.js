import { URL__POKEMONS } from "../const/pokeapi.js";

class Pokemon {
  constructor(id, name, weight, height, baseExperience) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.baseExperience = baseExperience;
    Object.seal(this);
  }

  static getAllPokemons(offset = 20, limit = 20) {
    return fetch(`${URL__POKEMONS}?offset=${offset}&limit=${limit}`)
      .then((response) => response.json())
      .then((pokemons) => pokemons);
  }

  static getPokemon(id) {
    return fetch(`${URL__POKEMONS}${id}`)
      .then((response) => response.json())
      .then((pokemon) => pokemon);
  }

  static getPokemonByUrl(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((pokemon) => pokemon);
  }
}

export { Pokemon as default };
