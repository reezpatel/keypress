const colors = [
  ["#8900f2", "#6a00f4"],
  ["#2b2d42", "#8d99ae"],
  ["#5dd39e", "#348aa7"],
  ["#4cc9f0", "#4361ee"],
  ["#e0fbfc", "#ee6c4d"],
  ["#3a506b", "#5bc0be"],
  ["#118ab2", "#06d6a0"],
  ["#00a896", "#028090"],
];

const getKey = (name, keyCode, code) => {
  const key = document.createElement("div");
  const h3 = document.createElement("h3");
  const container = document.createElement("div");

  h3.innerText = name;

  const meta = [
    { name: "KeyCode", value: keyCode },
    { name: "Code", value: code },
  ];

  meta.forEach(({ name, value }) => {
    const p = document.createElement("p");
    const span = document.createElement("span");
    const text = document.createTextNode(name);
    span.innerText = value;
    p.appendChild(text);
    p.appendChild(span);
    container.appendChild(p);
  });

  key.classList.add("key");
  key.appendChild(h3);
  key.appendChild(container);

  return key;
};

const getColors = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const setBgColor = (root, color) => {
  const [colorLight, colorDark] = color;
  root.style.setProperty("--bg-color", colorLight);
  root.style.setProperty("--bg-dark-color", colorDark);
};
const setBgAltColor = (root, color) => {
  const [colorLight, colorDark] = color;
  root.style.setProperty("--bg-alt-color", colorLight);
  root.style.setProperty("--bg-dark-alt-color", colorDark);
};

const init = () => {
  const root = document.documentElement;
  const instruction = document.querySelector("#instructions");
  const keysContainer = document.getElementById("keys");

  keysContainer.innerHTML = "";

  setBgColor(root, getColors());
  let nextColor = getColors();
  setBgAltColor(root, nextColor);

  document.onkeydown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    keysContainer.innerHTML = "";
    instruction.style.display = "none";

    const { code, key, keyCode } = e;
    console.log(e);

    const element = getKey(key, keyCode, code);
    keysContainer.appendChild(element);

    document.body.classList.add("animate");
    setTimeout(() => {
      setBgColor(root, nextColor);
      nextColor = getColors();
      setBgAltColor(root, nextColor);
      document.body.classList.remove("animate");
    }, 400);
  };
};

window.onload = init;
