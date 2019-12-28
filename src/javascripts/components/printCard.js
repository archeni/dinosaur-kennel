import print from './helpers/utilities';
import dino from './dinos';

const idMaker = () => `_${Math.random().toString(36).substr(2, 9)}`;

const healthMaker = () => `_${Math.floor((Math.random() * 100))}`;

function DinoObj(age, name, picture, location, color, type) {
  this.id = idMaker();
  this.age = age;
  this.name = name;
  this.picture = picture;
  this.location = location;
  this.color = color;
  this.type = type;
  this.health = healthMaker();
}

const cardPrinter = () => {
  let stringDom = '';
  for (let i = 0; i < dino.dinos.length; i += 1) {
    stringDom += `<div id="${dino.dinos[i].id}" class="card container" style="width: 25rem;">
      <img src="${dino.dinos[i].picture}" class="card-img-top" alt="location" style="width: 23rem; height: 18rem">
      <div class="card-body">
        <h5 class="card-title">${dino.dinos[i].name}</h5>
        <small class="form-text">${dino.dinos[i].type}</small>
        <p>The dinosaur is in the ${dino.dinos[i].location} with a health of ${dino.dinos[i].health}</p>
        <button id="${dino.dinos[i].id}-b" type="button" class="btn btn-danger attempt-button">Attempt at a fish</button>
        <button id="${dino.dinos[i].id}-c" type="button" class="btn btn-success success-button">Successful catch</button>
    </div>`;
  }
  print.printToDom('cardsHere', stringDom);

  document.getElementById('inputName').value = '';
  document.getElementById('inputAge').value = '';
  document.getElementById('inputPic').value = '';
  document.getElementById('inputLocation').value = '';
  document.getElementById('inputType').value = '';
  document.getElementById('inputColor').value = '';
};

const submitButton = document.getElementById('submit');

const addDinoFunc = () => {
  const newName = document.getElementById('inputName').value;
  const newColor = document.getElementById('inputColor').value;
  const newAge = document.getElementById('inputAge').value;
  const newLocation = document.getElementById('inputLocation').value;
  const newType = document.getElementById('inputType').value;
  const newPic = document.getElementById('inputPic').value;
  const testDino = new DinoObj(newAge, newName, newPic, newLocation, newColor, newType);
  dino.dinos.push(testDino);
};

const submitFunc = () => {
  submitButton.addEventListener('click', () => {
    addDinoFunc();
    cardPrinter();
  });
};

export default { submitFunc };
