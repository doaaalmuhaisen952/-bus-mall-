'use strict';

function Goods(title, src) {
  this.title = title;
  this.src = src;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Goods.all.push(this);
}

Goods.roundCtr = 0;
Goods.roundLimit = 25;

Goods.all = [];

Goods.container = document.getElementById('goods-container');

Goods.leftImg = document.getElementById('left-goods-img');
Goods.centerImg = document.getElementById('center-goods-img')
Goods.rightImg = document.getElementById('right-goods-img');

Goods.leftTitle = document.getElementById('left-goods-title');
Goods.centerTitle = document.getElementById('center -goods-title')
Goods.rightTitle = document.getElementById('right-goods-title');


Goods.leftObject = null;
Goods.rightObject = null;
Goods.centerObject = null;


new Goods('Bag', 'img/bag.jpg');
new Goods('Banana', 'img/banana.jpg');
new Goods('Bathroom', 'img/bathroom.jpg');
new Goods('Boots', 'img/boots.jpg');
new Goods('breakfast', 'img/breakfast.jpg');
new Goods('bubblegum', 'img/bubblegum.jpg');
new Goods('chair', 'img/chair.jpg');
new Goods('cthulhu', 'img/cthulhu.jpg');
new Goods('dog-duck', 'img/dog-duck.jpg');
new Goods('dragon', 'img/dragon.jpg');
new Goods('pen', 'img/pen.jpg');
new Goods('pet-sweep', 'img/pet-sweep.jpg');
new Goods('scissors', 'img/scissors.jpg');
new Goods('shark', 'img/shark.jpg');
new Goods('sweep', 'img/sweep.png');
new Goods('tauntaun', 'img/tauntaun.jpg');
new Goods('unicorn', 'img/unicorn.jpg');
new Goods('usb', 'img/usb.gif');
new Goods('water-can', 'img/water-can (1).jpg');
new Goods('wine-glass', 'img/wine-glass.jpg');

function renderNewGoods() {

  var forbidden = [Goods.leftObject, Goods.centerObject, Goods.rightObject];

  do {

    Goods.leftObject = getRandomGoods();

  } while (forbidden.includes(Goods.leftObject))

  forbidden.push(Goods.leftObject);

  do{

    Goods.centerObject = getRandomGoods();

  } while (forbidden.includes(Goods.centerObject))

  forbidden.push(Goods.centerObject);

  do {

    Goods.rightObject = getRandomGoods();

  } while(forbidden.includes(Goods.rightObject));
  
  Goods.leftObject.shownCtr++;
  Goods.centerObject.shownCtr++;
  Goods.rightObject.shownCtr++;

  var leftGoodsImgElement = Goods.leftImg;
  var centerGoodsImgElement = Goods.centerImg;
  var rightGoodsImgElement = Goods.rightImg;

  leftGoodsImgElement.setAttribute('src', Goods.leftObject.src);
  leftGoodsImgElement.setAttribute('alt', Goods.leftObject.title);

  centerGoodsImgElement.setAttribute('src', Goods.centerObject.src);
  centerGoodsImgElement.setAttribute('alt', Goods.centerObject.title);

  rightGoodsImgElement.setAttribute('src', Goods.rightObject.src);
  rightGoodsImgElement.setAttribute('alt', Goods.rightObject.title);

  Goods.leftTitle.textContent = Goods.leftObject.title;
  Goods.centerTitle.textContent = Goods.centerObject.title;
  Goods.rightTitle.textContent = Goods.rightObject.title;
}

function getRandomGoods() {
  var index = Math.floor(Math.random() * Goods.all.length);
  return Goods.all[index];
}

function randomInRange(min, max) {
  var range = max - min + 1; 
  var rand = Math.floor(Math.random() * range) + min
  return rand;
}

function updateTotals() {

  var tableBody = document.getElementById('news');

  tableBody.innerHTML = '';

  for (var i = 0; i < Goods.all.length; i++) {
    var goods = Goods.all[i];
    var row = addElement('tr', tableBody);
    addElement('td', row, goods.title);
    addElement('td', row, '' + goods.clickCtr);
    addElement('td', row, '' + goods.shownCtr);
  }
}

function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if(text) {
    element.textContent = text;
  }
  return element;
}

function clickHandler(event) {

  var clickedId = event.target.id;
  var GoodsClicked;

  if(clickedId === 'left-goods-img') {
    GoodsClicked = Goods.leftObject;
  } else if(clickedId === 'center-goods-img') {
    GoodsClicked = Goods.centerObject;
  } else if (clickedId === 'right-goods-img') {
    GoodsClicked = Goods.rightObject;
  } else {
    alert('Please chose one of the THREE goods that show at the screen')
  }

  if(GoodsClicked) {
    GoodsClicked.clickCtr++;
    Goods.roundCtr++;

    updateTotals();

    if(Goods.roundCtr === Goods.roundLimit) {

      alert('No more clicking for you!');

      Goods.container.removeEventListener('click', clickHandler);

    } else {

      renderNewGoods();
    }
  }
}

Goods.container.addEventListener('click', clickHandler);

updateTotals();

renderNewGoods();
