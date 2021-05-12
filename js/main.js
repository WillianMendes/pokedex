import { getElementById, getElementsByClass, parseHTML } from "./util/dom.js";
import {
  createPokeball,
  addPokeballStyle,
  removePokeball,
  removePokeballStyle,
} from "./pokeballLoading.js";
import Pokemon from "./model/pokemon.js";
import template from "../template/poke-card.js";

let offsetActual = 0;

const initLoading = () => {
  const content = getElementsByClass("main")[0];
  content.classList.add("util-hidden");
  createPokeball(addPokeballStyle);
};

const finishedLoading = () => {
  const content = getElementsByClass("main")[0];
  setTimeout(() => {
    removePokeball(removePokeballStyle);
    content.classList.remove("util-hidden");
  }, 500);
};

const orderPokemons = (id) => {
  const element = getElementById(id);
  element.style.order = id;
};

const loadPagePokemon = (id) => {
  localStorage.setItem("pokemonCurrent", id);
  window.location.href = "/pokedex/pokemon.html";
};

const createPokeCardElement = async (pokemon) => {
  Pokemon.getPokemonByUrl(pokemon.url).then(async (pokemonFull) => {
    const specie = await Pokemon.getSpecie(pokemonFull.species.url);
    const pokemonResumed = Pokemon.createPokemonResumed(
      pokemonFull.id,
      pokemonFull.name,
      pokemonFull.types,
      pokemonFull.sprites,
      specie.color.name
    );

    const pokeCard = template(pokemonResumed);
    const pokeCardElement = parseHTML(pokeCard);
    const container = getElementsByClass("poke-container")[0];
    container.appendChild(pokeCardElement);
    container.lastElementChild.addEventListener("click", () =>
      loadPagePokemon(pokemonFull.id)
    );
    orderPokemons(pokemonFull.id);
  });
};

const getPaginationPokemons = (offset = 0, limit = 20) => {
  Pokemon.getAllPokemons(offset, limit).then((poke) => {
    poke.results.forEach((pokemon) => createPokeCardElement(pokemon).then());
  });
};

const activatePagination = () => {
  const windowRelativeBottom = document.documentElement.getBoundingClientRect()
    .bottom;

  if (windowRelativeBottom < document.documentElement.clientHeight + 125) {
    offsetActual += 20;
    getPaginationPokemons(offsetActual);
  }
};

window.onload = async () => {
  initLoading();
  getPaginationPokemons();
  finishedLoading();

  window.addEventListener("scroll", activatePagination);
};

export { initLoading, finishedLoading };
