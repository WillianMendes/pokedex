import {
  getElementById,
  getElementsByClass,
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
  }, 1000);
};

const createCardElement = (pokemon) => {
  Pokemon.getPokemonByUrl(pokemon.url).then((details) => {
    const pokeCard = createPokeCard(pokemon.name);
    const container = getElementsByClass("poke-container")[0];
    container.innerHTML += pokeCard;
    insertPokeAvatar(
      `${details.name}_id`,
      details.sprites.other["official-artwork"].front_default
    );
  });
};

const getPaginationPokemons = (offset = 0, limit = 20) => {
  Pokemon.getAllPokemons(offset, limit).then((poke) => {
    initLoading();
    poke.results.forEach((pokemon) => createCardElement(pokemon));
    finishedLoading();
  });
};

window.onload = async () => {
  getPaginationPokemons();
};
