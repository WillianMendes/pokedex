const getElementsByClass = (className) =>
  document.getElementsByClassName(className);

const getElementById = (idName) => document.getElementById(idName);

const parseHTML = (html) => {
  const t = document.createElement("template");
  t.innerHTML = html;
  return t.content.cloneNode(true);
};

const insertPokeAvatar = (id, urlImg) => {
  const pokeImg = getElementById(id);
  pokeImg.style.backgroundImage = `url('${urlImg}')`;
};

const createPokeCard = (id, name) => `<div id="${id}" class="poke-card">
    <div id="${id}_img" class="poke-img-card"></div>
    <div class="poke-body-card">
      <div class="poke-title">
        <span>${name}</span>
      </div>
    </div>
  </div>`;

export {
  getElementById,
  getElementsByClass,
  createPokeCard,
  insertPokeAvatar,
  parseHTML,
};
