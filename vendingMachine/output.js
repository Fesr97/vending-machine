import { sendMessage, handleMessage } from "./messages.js";
import { Product } from "./Product.js";
import config from "./config.js";

/** @type {HTMLCanvasElement} */
export const canvas = document.querySelector(".output-canvas");
canvas.style.cursor=" grab"
const context = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width;
canvas.height = rect.height;
canvas.style.display = "flex";
canvas.style.flexGrow = "1";

/** @type {Product[]} */
const items = [];

const render = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const height = canvas.height / 2;
  const y = (canvas.height - height) / 2;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.y = y;
    item.render(context, item.x, item.y, config.ITEM_WIDTH, config.ITEM_HEIGHT);
  }
};
handleMessage("item-drop", (...itemParams) => {
  sendMessage("audio", "item-drop");
  const item = new Product(...itemParams);
  item.x = Math.random() * (canvas.width - config.ITEM_WIDTH);
  items.push(item);
  render();
});

render();

// Removes the clicked item
addEventListener("click", (e) => {
  e.preventDefault();
  const point = {
    x: e.clientX,
    y: e.clientY,
  };
  for (let i = items.length - 1; i >= 0; i--) {
    const item=items[i]
    const rect = {
      x: item.x + canvas.offsetLeft,
      y: item.y + canvas.offsetTop,
      w: config.ITEM_WIDTH,
      h: config.ITEM_HEIGHT,
    };
    if (isPointToRect(point, rect)) {
      console.log(`Removed item: ${item.name} (${item.price})`);
      items.splice(items.indexOf(item), 1);
      render();
      break;
    }
  }
});

/** Checks if a point is colliding with a rectangle */
export function isPointToRect(point, rect) {
  if (point.x < rect.x) return false;
  if (point.x > rect.x + rect.w) return false;
  if (point.y < rect.y) return false;
  if (point.y > rect.y + rect.h) return false;
  return true;
}
