console.log("JS cargado");

const vendingMachine = {
  11: { name: "Cocacola", quantity: 1, price: 1.25 },
  12: { name: "Fanta Naranja", quantity: 2, price: 1 },
  13: { name: "Fanta Limón", quantity: 2, price: 1.5 },
  14: { name: "Agua 500ml", quantity: 2, price: 1 },
  15: { name: "Sprite", quantity: 2, price: 1.25 },
  16: { name: "Cocacola Light", quantity: 2, price: 2 },
  17: { name: "Chocolate", quantity: 2, price: 2.5 },
  18: { name: "Kinder Bueno", quantity: 2, price: 1.25 },
  19: { name: "Kikos", quantity: 2, price: 1 },
};

let writtenNumbersOnScreen = "";
let writtenCashOnScreen = [];

console.log(vendingMachine["11"]); // esta es la forma de acceder a un objeto

//siempre que hagamos la selección de un elemento del DOM lo vamos a hacer dentro de una función
//si lo seleccionamos antes podemos almacenar un valor que luego no se va a actualizar

const selectButton = document.querySelector(".select-button");
// const productLight = document.querySelector(".ball");
const machineHatch = document.querySelector(".machine-hatch");
const picOfTheProduct = document.querySelector(".product-pic");
const hatchOfTheProducts = document.querySelector(".hatch");

const picProduct1 = document.querySelector("#product-1");
const picProduct2 = document.querySelector("#product-2");
const picProduct3 = document.querySelector("#product-3");
const picProduct4 = document.querySelector("#product-4");
const picProduct5 = document.querySelector("#product-5");
const picProduct6 = document.querySelector("#product-6");
const picProduct7 = document.querySelector("#product-7");
const picProduct8 = document.querySelector("#product-8");
const picProduct9 = document.querySelector("#product-9");

selectButton.addEventListener("click", sellProduct);

function sellProduct() {
  // 1.Obtener el num de producto de la pantalla

  const productNumber = writtenNumbersOnScreen;
  const productLight = document.querySelector(
    `#ball-${writtenNumbersOnScreen}`
  );

  if (vendingMachine[productNumber].quantity === 0) {
    // if (vendingMachine[productNumber].quantity > 0) {
    const screenElement = document.querySelector(".screen");
    screenElement.textContent = "No disponible";
    productLight.style.backgroundColor = "red";
    setTimeout(deleteNumberOnScreen, 3000);

    return; //return sólo termina la ejecución de una función. Aquí se termina la ejecución de sellProduct()
  } else if (writtenNumbersOnScreen.length > 2) {
    const screenElement = document.querySelector(".screen");
    screenElement.textContent = "Código Erróneo";
    setTimeout(deleteNumberOnScreen, 3000);
  } else if (writtenNumbersOnScreen.length === 1) {
    const screenElement = document.querySelector(".screen");
    screenElement.textContent = "Código Erróneo 1 cifra";
    setTimeout(deleteNumberOnScreen, 3000);
  }
  // else {
  //   const screenElement = document.querySelector(".screen");
  //   screenElement.textContent = "Error";
  //   setTimeout(deleteNumberOnScreen, 3000);
  // }

  // 2.Comprobar si está disponible -- se hace con el return
  // 3.Si está disponible, restar el producto y que parpadee la luz

  vendingMachine[productNumber].quantity -= 1;

  // mejor utilizar -=1 así me aseguro que se está haciendo la aignación correcta

  setTimeout(() => {
    productLight.style.backgroundColor = "rgb(27, 194, 27)";
  }, 300);
  setTimeout(() => {
    productLight.style.backgroundColor = "green";
  }, 600);
  setTimeout(() => {
    productLight.style.backgroundColor = "rgb(27, 194, 27)";
  }, 900);
  setTimeout(() => {
    productLight.style.backgroundColor = "green";
  }, 1200);
  setTimeout(() => {
    productLight.style.backgroundColor = "rgb(27, 194, 27)";
  }, 1500);

  setTimeout(deleteNumberOnScreen, 3000);

  // 4.Si está disponible se tiene que mostrar el producto en la trampilla

  const pictureOfTheProductsInHatch = document.querySelector(
    ".product-pic-in-hatch"
  );

  pictureOfTheProductsInHatch.classList.add("active");

  setTimeout(() => {
    pictureOfTheProductsInHatch.classList.remove("active");
  }, 4000);
}

// let y = 0;
// let moveProductToHatch = setInterval(moveProduct, 5);

// function moveProduct() {
//   if (y == 100) {
//     // suponiendo que 100 es la posición de la foto del producto

//     clearInterval(moveProductToHatch); // posición del hatch
//   } else {
//     y++;

//     picProduct1.style.top = y;
//     picProduct1.style.left = y;
//   }
// }

function writeCashNumberOnScreen(event) {
  console.log("Llamando función de cash");
  console.log("EVENT INFO", event);

  console.log(event.target.parent);

  let clickedElement = event.target;

  if (event.target.nodeName === "P") {
    clickedElement = event.target.parentElement;
  }

  const clickedElementCashValue = clickedElement.textContent;

  // writtenCashsOnScreen += clickedElementCashValue;

  writtenCashOnScreen.push(clickedElementCashValue);

  let writtenCashsOnScreenNumber = writtenCashOnScreen.map(Number); // array convertido a number

  let totalCashAmount = 0;

  for (let i = 0; i < writtenCashsOnScreenNumber.length; i++) {
    totalCashAmount += writtenCashsOnScreenNumber[i];
  }
  const screenElement = document.querySelector(".screen");

  screenElement.textContent = totalCashAmount.toFixed(2) + " €";

  console.log(clickedElementCashValue);
  console.log(writtenCashOnScreen);
  console.log(writtenCashsOnScreenNumber);
  console.log(totalCashAmount);
}

function writeNumberOnScreen(event) {
  console.log("Llamando función");
  console.log("EVENT INFO", event);

  console.log(event.target.parent);

  let clickedElement = event.target;

  const screenElement = document.querySelector(".screen");

  // Comprobamos si estamos haciendo click sobre el p y seleccionamos siempre el div (su padre)
  if (event.target.nodeName === "P") {
    // no se podría poner directamente event.target.parentElement === "div"   ??
    clickedElement = event.target.parentElement;
  }

  const clickedElementValue = clickedElement.textContent;

  writtenNumbersOnScreen += clickedElementValue;

  screenElement.textContent = writtenNumbersOnScreen;

  // Falta poner select button - quiero que salgan bien las opciones antes

  console.log(clickedElementValue);
  console.log(writtenNumbersOnScreen);
  console.log(typeof writtenNumbersOnScreen);
}

function deleteNumberOnScreen() {
  const screenElement = document.querySelector(".screen");
  writtenNumbersOnScreen = "";
  let dotMessage = (screenElement.textContent = ".");
  dotMessage;
}

function deleteCashOnScreen() {
  const screenElement = document.querySelector(".screen");
  writtenNumbersOnScreen = "";
  let dotMessage = (screenElement.textContent = ".");
  dotMessage;
  writtenCashOnScreen.length = 0;
}

// if (writtenNumbersOnScreen.length === 2) {
//   const productLight = document.querySelector(
//     `#ball-${writtenNumbersOnScreen}`
//   );

//   if (vendingMachine[writtenNumbersOnScreen].quantity >= 1)
//     screenElement.textContent = "Gracias";

//   vendingMachine[writtenNumbersOnScreen].quantity--;

//   console.log(vendingMachine[writtenNumbersOnScreen]);

//   //pasar a una función aparte

//   if (vendingMachine[writtenNumbersOnScreen].quantity >= 1) {
//     productLight.style.backgroundColor = "green";

//     setTimeout(() => {
//       productLight.style.backgroundColor = "rgb(27, 194, 27)";
//     }, 300);
//     setTimeout(() => {
//       productLight.style.backgroundColor = "green";
//     }, 600);
//     setTimeout(() => {
//       productLight.style.backgroundColor = "rgb(27, 194, 27)";
//     }, 900);
//     setTimeout(() => {
//       productLight.style.backgroundColor = "green";
//     }, 1200);
//     setTimeout(() => {
//       productLight.style.backgroundColor = "rgb(27, 194, 27)";
//     }, 1500);
//   }

//   if (vendingMachine[writtenNumbersOnScreen].quantity === 0) {
//     productLight.style.backgroundColor = "red";

//     screenElement.textContent = "No disponible";
//   }

//   setTimeout(deleteNumberOnScreen, 3000);
// } else if (writtenNumbersOnScreen.length > 2) {
//   screenElement.textContent = "Código Erróneo";
//   setTimeout(deleteNumberOnScreen, 3000);
