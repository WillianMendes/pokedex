const templateTypes = (types) =>
  types.map((type) => `<div class='poke-type'>${type}</div>`);

const templateBaseStat = (stats, color) =>
  stats.map(
    (stat) =>
      `<div class="bar-box">
        <span class="label">${stat.name}:</span> ${stat.value}
        <div class="bar">
          <div class="bar-fill ${color}" style="width: ${stat.value / 2.55}%;">
          </div>
        </div>
      </div>`
  );

const templateAttrBase = (label, value) =>
  `<p class="attr-base">${label} ${value}</p>`;

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
    <div class="poke-body-tabs">
      <a class="title active" href="#">Status</a>
      <a class="title" href="#">Evolution</a>
      <a class="title" href="#">Info</a>
    </div>
    <div class="poke-body-stats">
      ${templateBaseStat(pokemon.stats, pokemon.color)}
      ${templateAttrBase("Weight", pokemon.weight)}
      ${templateAttrBase("Height", pokemon.height)}
    </div>
  </div>`.replaceAll(",", "");

export default template;
