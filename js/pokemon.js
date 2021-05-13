import { initLoading, finishedLoading } from "./main.js";
import Pokemon from "./model/pokemon.js";
import template from "../template/pokemon.js";
import { getElementById, getElementsByClass, parseHTML } from "./util/dom.js";

const changeTabLinkActive = (event) => {
  const otherTabs = getElementsByClass("poke-body-tabs")[0];
  const tabActive = event.target;

  for (let i = 0; i < otherTabs.childElementCount; i += 1) {
    otherTabs.children[i].classList.remove("active");
  }
  tabActive.classList.add("active");
};

const changeTabVisible = (event) => {
  const pokeBody = getElementsByClass("poke-body")[0];

  for (let i = 1; i < pokeBody.childElementCount; i += 1) {
    const tab = pokeBody.children[i];
    if (event.target.id !== tab.dataset.tab) tab.classList.add("util-hidden");
    else tab.classList.remove("util-hidden");
  }
};

const changeTab = (event) => {
  changeTabLinkActive(event);
  changeTabVisible(event);
};

const initListenerTab = () => {
  getElementById("status_tab").addEventListener("click", changeTab);
  getElementById("evolution_tab").addEventListener("click", changeTab);
  getElementById("info_tab").addEventListener("click", changeTab);
};

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
    initListenerTab();
  });
};

window.onload = () => {
  initLoading();
  loadPokemon(getPokeId());
  finishedLoading();
};
