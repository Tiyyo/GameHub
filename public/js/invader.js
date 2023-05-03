// ton code ici
const container = document.querySelector(".pixel-container");
const form = document.querySelector(".configuration");
const pickers = document.querySelectorAll(".picker");

const app = {
  styles: {
    plain: "rgb(91, 110, 195)",
    empty: "rgb(214, 129, 123)",
    light: "rgb(69, 119, 61)",
    highlight: "rgb(151, 52, 151)",
    base: "rgb(168, 166, 166)",
  },
  gridConfig: {
    numberPixel: 8 ** 2,
    sizePixel: `50px`,
    numberColumns: 8,
  },
  color: "rgb(168, 166, 166)",
  pixels: [],
  addPixel: function () {
    const pixel = document.createElement("div");
    container.appendChild(pixel);
    pixel.classList.add("pixel");
    pixel.style.width = app.gridConfig.sizePixel;
    pixel.style.height = app.gridConfig.sizePixel;
    pixel.addEventListener("click", () => {
      app.toggleColor(pixel);
    });
  },
  addAllPixels: function () {
    container.style.gridTemplateColumns = `repeat(${app.gridConfig.numberColumns},1fr)`;
    for (let i = 0; i < app.gridConfig.numberPixel; i++) {
      app.addPixel();
    }
    app.pixels = document.querySelectorAll(".pixel");
  },
  toggleColor: function (domElement) {
    domElement.style.backgroundColor = app.color;
  },
  remove: function () {
    app.pixels.forEach((pixel) => {
      pixel.remove();
    });
  },
  handleSubmit: function (event) {
    event.preventDefault();
    app.remove();

    inputGridValue = event.target.gridSize.value;
    inputPixelValue = event.target.pixelSize.value;

    app.gridConfig.numberPixel = inputGridValue ** 2;
    app.gridConfig.sizePixel = `${inputPixelValue}px`;
    app.gridConfig.numberColumns = inputGridValue;

    app.addAllPixels();

    event.target.gridSize.value = "";
    event.target.pixelSize.value = "";
  },
};

// window.addEventListener("load", app.init());
form.addEventListener("submit", app.handleSubmit);

pickers.forEach((picker) => {
  picker.addEventListener("click", (event) => {
    let isActive = picker.classList.value.includes("isActive");
    let colorType = event.target.dataset.color;

    if (isActive) {
      picker.classList.remove("isActive");
    } else {
      picker.classList.add("isActive");

      pickers.forEach((picker) => {
        if (picker.dataset.color !== colorType) {
          picker.classList.remove("isActive");
        }
      });
    }

    if (colorType === "plain" && !isActive) {
      app.color = app.styles.plain;
    } else if (colorType === "empty" && !isActive) {
      app.color = app.styles.empty;
    } else if (colorType === "light" && !isActive) {
      app.color = app.styles.light;
    } else if (colorType === "highlight" && !isActive) {
      app.color = app.styles.highlight;
    } else {
      app.color = app.styles.base;
    }
  });
});
