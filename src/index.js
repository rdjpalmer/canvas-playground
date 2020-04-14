import "./styles.css";

/* <img src="https://www.dropbox.com/s/3h2jel6twmfj9yz/output-00001.jpg?dl=1" /> */

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const arr = new Array(19).fill(" ").map((_, i) => {
  let number = i + 1;

  if (number < 10) {
    number = `0${number}`;
  }

  const str = `https://unruffled-stonebraker-a2f373.netlify.com/output-000${number}.jpg`;
  return str;
});

let i = 0;

function renderNext() {
  const image = new Image();

  image.src = arr[i];
  image.width = canvas.clientWidth;
  image.height = canvas.clientHeight;

  image.onload = () => {
    context.drawImage(
      image,
      0,
      canvas.clientHeight / 2,
      canvas.clientWidth,
      canvas.clientHeight / 2
    );

    i = i + 1;

    if (i === 19) {
      i = 0;
    }

    requestAnimationFrame(renderNext);
  };
}

const images = document.querySelectorAll("img");

if (images.length === 19) {
  Promise.all(
    [...images].map(img => {
      return new Promise(resolve => {
        img.addEventListener("load", () => {
          console.log("resolving...");
          resolve();
        });
      });
    })
  ).then(() => {
    requestAnimationFrame(renderNext);
  });
}

// requestAnimationFrame(renderNext);

function resizeCanvasToDisplaySize(canvas) {
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

resizeCanvasToDisplaySize(context.canvas);
