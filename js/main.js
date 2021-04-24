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

const createCardElement = async (pokemon) => {
  await Pokemon.getPokemonByUrl(pokemon.url).then((details) => {
    const pokeCard = createPokeCard(pokemon.name);
    const pokeCardElement = parseHTML(pokeCard);
    const container = getElementsByClass("poke-container")[0];
    container.appendChild(pokeCardElement);
    insertPokeAvatar(
      `${details.name}_id`,
      details.sprites.other["official-artwork"].front_default
    );
  });
};

const getPaginationPokemons = (offset = 0, limit = 20) => {
  Pokemon.getAllPokemons(offset, limit).then(async (poke) => {
    initLoading();
    const pokemons = poke.results;
    for (let i = 0; i < pokemons.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createCardElement(pokemons[i]);
    }
    finishedLoading();
  });
};

window.onload = async () => {
  getPaginationPokemons();
};
