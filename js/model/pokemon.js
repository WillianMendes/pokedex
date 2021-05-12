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

  static createPokemonResumed(id, name, types, imgSrc, color) {
    return {
      id,
      name,
      types: types.map((type) => type.type.name),
      imgSrc: imgSrc.other["official-artwork"].front_default,
      color: `poke-card-${color}`,
    };
  }

  static async createPokemon(pokemon) {
    const specie = await Pokemon.getSpecie(pokemon.species.url);
    const evolution = await Pokemon.getEvolutionChain(
      specie.evolution_chain.url
    );
    return {
      ...this.createPokemonResumed(
        pokemon.id,
        pokemon.name,
        pokemon.types,
        pokemon.sprites,
        specie.color.name
      ),
      weight: pokemon.weight * 10,
      height: pokemon.height * 10,
      stats: this.formatStats(pokemon.stats),
      abilities: this.formatAbilities(pokemon.abilities),
      baseHappiness: specie.base_happiness,
      captureRate: specie.capture_rate,
      genderRate: specie.gender_rate,
      growthRate: specie.growth_rate.name,
      habitat: specie.habitat.name,
      isBaby: specie.is_baby,
      isLegendary: specie.is_legendary,
      isMythical: specie.is_mythical,
      evolution,
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
      .then((specie) => specie);
  }

  static getEvolutionChain(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((evolution) => evolution.chain);
  }

  static formatStats(stats) {
    return stats.map((stat) => ({
      name: stat.stat.name.replace("-", " "),
      value: stat.base_stat,
    }));
  }

  static formatAbilities(abilities) {
    return abilities.map(({ ability }) => ability.name.replace("-", " "));
  }
}

export { Pokemon as default };
