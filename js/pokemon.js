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
    const pokemonFull = await Pokemon.createPokemon(pokemon);
    const pokePage = template(pokemonFull);
    const pokePageElement = parseHTML(pokePage);
    const container = getElementsByClass("poke-container")[0];
    container.appendChild(pokePageElement);
  });
};

window.onload = () => {
  initLoading();
  loadPokemon(getPokeId());
  finishedLoading();
};
