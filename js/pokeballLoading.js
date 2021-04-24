import { template, css } from "../template/pokeball.js";

const createPokeball = (addStyle, pokeballHtml = template, style = css) => {
  const body = document.getElementsByTagName("body")[0];
  body.innerHTML = pokeballHtml;
  addStyle(style);
};

const addPokeballStyle = (style) => {
  const header = document.getElementsByTagName("head")[0];
  const styleElement = document.createElement("style");
  styleElement.innerText = style;
  header.appendChild(styleElement);
};

const removePokeball = (removeStyle) => {
  const pokeball = document.getElementById("pokeball");
  pokeball.remove();
  removeStyle();
};

const removePokeballStyle = () => {
  const header = document.getElementsByTagName("head")[0];
  const styleElement = header.getElementsByTagName("style")[0];
  styleElement.remove();
};

export {
  createPokeball,
  removePokeball,
  addPokeballStyle,
  removePokeballStyle,
};
