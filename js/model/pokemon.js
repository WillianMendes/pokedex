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

  static createPokemonResumed(id, name, types, imgSrc, color, stats = []) {
    return {
      id,
      name,
      types: types.map((type) => type.type.name),
      imgSrc: imgSrc.other["official-artwork"].front_default,
      color: `poke-card-${color}`,
      stats: this.formatStats(stats),
    };
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

  static getSpecie(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((specie) => specie.color.name);
  }

  static formatStats(stats) {
    return stats.map((stat) => ({
      name: stat.stat.name.replace("-", " "),
      value: stat.base_stat,
    }));
  }
}

export { Pokemon as default };
