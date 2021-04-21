import {
  createPokeball,
  addPokeballStyle,
  removePokeball,
  removePokeballStyle,
} from "./pokeballLoading.js";

window.onload = () => {
  createPokeball(addPokeballStyle);
  setTimeout(() => removePokeball(removePokeballStyle), 5000);
};
