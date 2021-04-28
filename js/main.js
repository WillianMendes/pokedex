import {
  getElementById,
  getElementsByClass,
  parseHTML,
  createPokeCard,
  insertPokeAvatar,
} from "./util/dom.js";
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

const createCardElement = async (pokemon) =>
  Pokemon.getPokemonByUrl(pokemon.url).then((details) => {
    console.log(details);
    const pokeImg = details.sprites.other["official-artwork"].front_default;

    const pokeCard = template({
      id: details.id,
      name: details.name,
      types: details.types,
      src: pokeImg,
    });
    const pokeCardElement = parseHTML(pokeCard);
    const container = getElementsByClass("poke-container")[0];
    container.appendChild(pokeCardElement);
    container.lastElementChild.addEventListener("click", () =>
      loadPagePokemon(details.id)
    );
    orderPokemons(details.id);
  });

const getPaginationPokemons = (offset = 0, limit = 20) => {
  Pokemon.getAllPokemons(offset, limit).then((poke) => {
    poke.results.forEach((pokemon) => createCardElement(pokemon).then());
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
