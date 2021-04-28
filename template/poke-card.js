const templateTypes = (types) =>
  types.map((type) => `<span class='poke-card-type'>${type}</span>`);

const template = (pokemon) =>
  `<div id="${pokemon.id}" class="poke-card">
    <div class="poke-card-info">
      <h2>${pokemon.name}</h2>
      ${templateTypes(pokemon.types)}
      <span class="poke-card-id">#${pokemon.id}</span>
    </div>
    <div class="poke-card-img">
      <img src="${pokemon.imgSrc}" alt="${pokemon.name}">
    </div>
  </div>`.replace(",", "");

export default template;
