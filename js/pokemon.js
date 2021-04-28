import { initLoading, finishedLoading } from "./main.js";
import Pokemon from "./model/pokemon.js";

const getPokeId = () => {
  const pokeId = localStorage.getItem("pokemonCurrent");
  return pokeId !== null ? pokeId : 1;
};

const loadPokeDate = (id) => {
  Pokemon.getPokemon(id).then((pokemon) => {
    console.log(pokemon);
  });
};

window.onload = () => {
  initLoading();
  loadPokeDate(getPokeId());
  finishedLoading();
};
