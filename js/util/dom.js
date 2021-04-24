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

const createPokeCard = (name) => `<div class="poke-card">
    <div id="${name}_id" class="poke-img-card"></div>
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
