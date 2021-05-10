const templateTypes = (types) =>
  types.map((type) => `<div class='poke-type'>${type}</div>`);

const template = (pokemon) =>
  `<div class="poke-header ${pokemon.color}">
    <div class="poke-header-main">
      <div class="poke-header-info">
        <h1 class="title">${pokemon.name}</h1>
        <span class="poke-id">${
          pokemon.id < 9 ? `#0${pokemon.id}` : `#${pokemon.id}`
        }</span>
      </div>
      <div class="poke-header-type">
        ${templateTypes(pokemon.types)}
      </div>
    </div>
    <img class="poke-header-img" src="${pokemon.imgSrc}" alt="">
  </div>
  <div class="poke-body">
    
  </div>`.replace(",", "");

export default template;
