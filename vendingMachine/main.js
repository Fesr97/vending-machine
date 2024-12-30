import { VendingMachine } from "./VendingMachine.js";
import { handleMessage, sendMessage } from "./messages.js";
import config from "./config.js";
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".canvas");
canvas.width = config.WIDTH;
canvas.height = config.HEIGHT;
const context = canvas.getContext("2d");

const products = [
  undefined,
  ["Lays", 1.25, 0],
  ["Doritos", 2, 1],
  ["7UP", 1.65, 2],
  ["Coca Cola", 1.5, 3],
  ["Kinder Bueno", 0.6, 4],
  ["Ritz", 1.8, 5],
  ["Fruity Snacks", 1.6, 6],
  ["Skittles", 1.1, 7],
];

const vendingMachine = new VendingMachine(products);

handleMessage("drop-item", (code) => {
  const item = vendingMachine.slots[code[0]][code[1]];
  console.log(item);
  if (item.stock < 1) {
    throw new Error("NO STOCK");
  }
  item.stock -= 1;
  const params = products.find((product) => {
    return product && product[0] === item.product.name;
  });
  render();
  sendMessage("item-drop", ...params);
});

/** @param {CanvasRenderingContext2D} context */
export const clear = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const render = () => {
  clear();
  vendingMachine.renderItemMatrix(context);
};

const initialize = async () => {
  render();
};
initialize();

/** @type {HTMLDivElement} */
const display = document.querySelector(".display");
handleMessage("print", (text) => {
  display.value = text;
});
