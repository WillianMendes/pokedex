const getElementsByClass = (className) =>
  document.getElementsByClassName(className);

const getElementById = (idName) => document.getElementById(idName);

const parseHTML = (html) => {
  const t = document.createElement("template");
  t.innerHTML = html;
  return t.content.cloneNode(true);
};

export { getElementById, getElementsByClass, parseHTML };
