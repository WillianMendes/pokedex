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

const templateAttrBase = (label, value, type = "") =>
  `<div class="attr-base">
    <p class="attr-label">${label}</p>
    <p class="attr-value">${value}${type}</p>
  </div>`;

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
      <a id="status_tab" class="title active" href="#">Status</a>
      <a id="evolution_tab" class="title" href="#">Evolution</a>
      <a id="info_tab" class="title" href="#">Info</a>
    </div>
    <div data-tab="status_tab" class="poke-body-stats">
      ${templateBaseStat(pokemon.stats, pokemon.color)}
    </div>
    <div data-tab="evolution_tab" class="poke-body-evolution util-hidden">
      ${pokemon.evolution}
    </div>
    <div data-tab="info_tab" class="poke-body-info util-hidden">
      ${templateAttrBase(
        "National ID",
        pokemon.id.length < 9 ? `#0${pokemon.id}` : `#${pokemon.id}`
      )}
      ${templateAttrBase("Name", pokemon.name)}
      ${templateAttrBase("Weight", (pokemon.weight / 100).toFixed(2), " KG")}
      ${templateAttrBase(
        "Height",
        (pokemon.height / 100).toFixed(2),
        " Meters"
      )}
      ${templateAttrBase("Base Happiness", pokemon.baseHappiness)}
      ${templateAttrBase("Capture Rate", pokemon.captureRate, "%")}
      ${templateAttrBase(
        "Gender Rate",
        `${(pokemon.genderRate * 100) / 8}`,
        "% Female"
      )}
      ${templateAttrBase("Growth Rate", pokemon.growthRate)}
      ${templateAttrBase("Habitat", pokemon.habitat)}
      ${templateAttrBase("Baby", pokemon.isBaby ? "Yes" : "No")}
      ${templateAttrBase("Legendary", pokemon.isBaby ? "Yes" : "No")}
      ${templateAttrBase("Mythical", pokemon.isBaby ? "Yes" : "No")}
      ${pokemon.abilities}
   </div>
  </div>`.replaceAll(",", "");

export default template;
