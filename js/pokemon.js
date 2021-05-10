import { initLoading, finishedLoading } from "./main.js";
import Pokemon from "./model/pokemon.js";
import template from "../template/pokemon.js";
import { getElementsByClass, parseHTML } from "./util/dom.js";

const getPokeId = () => {
  const pokeId = localStorage.getItem("pokemonCurrent");
  return pokeId !== null ? pokeId : 1;
};

const loadPokemon = (id) => {
  Pokemon.getPokemon(id).then(async (pokemon) => {
    const pokemonResumed = Pokemon.createPokemonResumed(
      pokemon.id,
      pokemon.name,
      pokemon.types,
      pokemon.sprites,
      await Pokemon.getSpecie(pokemon.species.url)
    );

    const pokeCard = template(pokemonResumed);
    const pokeCardElement = parseHTML(pokeCard);
    const container = getElementsByClass("poke-container")[0];
    container.appendChild(pokeCardElement);
    console.log(pokemonResumed);
  });
};

window.onload = () => {
  initLoading();
  loadPokemon(getPokeId());
  finishedLoading();
};
