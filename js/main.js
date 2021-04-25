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

let offsetActual = 20;
const limitActual = 20;

const initLoading = () => {
  const content = getElementsByClass("container")[0];
  content.classList.add("util-hidden");
  createPokeball(addPokeballStyle);
};

const finishedLoading = () => {
  const content = getElementsByClass("container")[0];
  setTimeout(() => {
    removePokeball(removePokeballStyle);
    content.classList.remove("util-hidden");
  }, 500);
};

const orderPokemons = (id) => {
  const element = getElementById(id);
  element.style.order = id;
};

const createCardElement = async (pokemon) =>
  Pokemon.getPokemonByUrl(pokemon.url).then((details) => {
    const pokeCard = createPokeCard(details.id, pokemon.name);
    const pokeCardElement = parseHTML(pokeCard);
    const container = getElementsByClass("poke-container")[0];
    container.appendChild(pokeCardElement);
    orderPokemons(details.id);
    insertPokeAvatar(
      `${details.id}_img`,
      details.sprites.other["official-artwork"].front_default
    );
  });

const getPaginationPokemons = (offset = 0, limit = 20) => {
  Pokemon.getAllPokemons(offset, limit).then((poke) => {
    poke.results.forEach((pokemon) => createCardElement(pokemon).then());
  });
};

const activatePagination = () => {
  const windowRelativeBottom = document.documentElement.getBoundingClientRect()
    .bottom;

  if (windowRelativeBottom < document.documentElement.clientHeight + 150) {
    getPaginationPokemons(offsetActual);
    offsetActual += 20;
  }
};

window.onload = async () => {
  const touch = matchMedia("(hover: none), (pointer: coarse)").matches;

  initLoading();
  getPaginationPokemons();
  finishedLoading();

  if (touch) window.addEventListener("touchmove", activatePagination);
  else window.addEventListener("scroll", activatePagination);
};
