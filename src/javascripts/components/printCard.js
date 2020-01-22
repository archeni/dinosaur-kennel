import print from './helpers/utilities';
import dino from './dinos';

const idMaker = () => `_${Math.random().toString(36).substr(2, 9)}`;

const healthMaker = () => Math.floor((Math.random() * 100));

const locationDecider = () => {
  let mainLocation = '';
  if (document.getElementById('inputMainKennel').checked) {
    mainLocation = 'Main Kennel';
  } if (document.getElementById('inputHospital').checked) {
    mainLocation = 'Hospital';
  }
  if (document.getElementById('inputGraveyard').checked) {
    mainLocation = 'Graveyard';
  }
  return mainLocation;
};

function DinoObj(age, name, picture, color, type) {
  this.id = idMaker();
  this.age = age;
  this.name = name;
  this.picture = picture;
  this.location = locationDecider();
  this.color = color;
  this.type = type;
  this.health = healthMaker();
}

const cardPrinter = () => {
  let stringDom = '';
  for (let i = 0; i < dino.dinos.length; i += 1) {
    stringDom += `
    <div id="${dino.dinos[i].id}" class="card container" style="width: 25rem;">
      <div id="${dino.dinos[i].id}-reprint">
        <img src="https://cdn.shopify.com/s/files/1/1242/0796/products/54495_1024x1024.jpeg?v=1571441044" id='${dino.dinos[i].id}-p' class="overlay" alt="skull">
        <img src="${dino.dinos[i].picture}" class="card-img-top" alt="location" style="width: 23rem; height: 18rem">
      </div>
      <div class="card-body">
        <h5 class="card-title">${dino.dinos[i].name}</h5>
        <small class="form-text">${dino.dinos[i].type}</small>
        <p id='${dino.dinos[i].id}-l'>The dinosaur is in the ${dino.dinos[i].location} with a health of </p>
        <p><progress value="${dino.dinos[i].health}" max="100" id="${dino.dinos[i].id}-h"></progress></p>
        <button id="${dino.dinos[i].id}-f" type="button" class="btn btn-primary feed-button">Feed Dino</button>
        <button id="${dino.dinos[i].id}-a" type="button" class="btn btn-warning adv-button">Send dino on an adventure</button>
        <button id="${dino.dinos[i].id}-e" type="button" class="btn btn-danger expel-button">Pick Up</button>
      </div>
    </div>`;
  }
  print.printToDom('cardsHere', stringDom);

  document.getElementById('inputName').value = '';
  document.getElementById('inputAge').value = '';
  document.getElementById('inputPic').value = '';
  document.getElementById('inputType').value = '';
  document.getElementById('inputColor').value = '';
};

const submitButton = document.getElementById('submit');

const addDinoFunc = () => {
  const newName = document.getElementById('inputName').value;
  const newColor = document.getElementById('inputColor').value;
  const newAge = document.getElementById('inputAge').value;
  const newType = document.getElementById('inputType').value;
  const newPic = document.getElementById('inputPic').value;
  const testDino = new DinoObj(newAge, newName, newPic, newColor, newType);
  dino.dinos.push(testDino);
};

const feedEvents = () => {
  const feedButton = document.getElementsByClassName('feed-button');
  for (let j = 0; j < feedButton.length; j += 1) {
    let stringDom2 = '';
    feedButton[j].addEventListener('click', (event2) => {
      const mainDinoCard = event2.target.parentNode.parentNode.id;
      if (mainDinoCard === dino.dinos[j].id) {
        if (dino.dinos[j].health <= 100) {
          dino.dinos[j].health += Math.floor((Math.random() * 100));
          if (dino.dinos[j].health >= 100) {
            dino.dinos[j].health = 100;
            dino.dinos[j].location = 'Main Kennel';
            stringDom2 = `The dinosaur is in the ${dino.dinos[j].location} with a health of`;
            print.printToDom(`${dino.dinos[j].id}-l`, stringDom2);
          } else if (dino.dinos[j].health < 40 && dino.dinos[j].health > 0) {
            dino.dinos[j].location = 'Hospital';
            stringDom2 = `The dinosaur is in the ${dino.dinos[j].location} with a health of`;
            print.printToDom(`${dino.dinos[j].id}-l`, stringDom2);
          } else if (dino.dinos[j].health === 0) {
            dino.dinos[j].location = 'Graveyard';
            stringDom2 = `The dinosaur is in the ${dino.dinos[j].location} with a health of`;
            print.printToDom(`${dino.dinos[j].id}-l`, stringDom2);
            document.getElementById(`${dino.dinos[j].id}-f`).className = 'btn btn-primary disabled';
            document.getElementById(`${dino.dinos[j].id}-a`).className = 'btn btn-primary disabled';
          } else {
            dino.dinos[j].location = 'Main Kennel';
            stringDom2 = `The dinosaur is in the ${dino.dinos[j].location} with a health of`;
            print.printToDom(`${dino.dinos[j].id}-l`, stringDom2);
          }
          document.getElementById(`${dino.dinos[j].id}-h`).value = dino.dinos[j].health;
        }
      }
    });
  }
};

const expelEvents = () => {
  const expelButton = document.getElementsByClassName('expel-button');
  for (let j = 0; j < expelButton.length; j += 1) {
    expelButton[j].addEventListener('click', (event2) => {
      const mainDinoCard = event2.target.parentNode.parentNode.id;
      if (mainDinoCard === dino.dinos[j].id) {
        document.getElementById(`${dino.dinos[j].id}`).remove();
      }
    });
  }
};

const advEvents = () => {
  const advButton = document.getElementsByClassName('adv-button');
  for (let j = 0; j < advButton.length; j += 1) {
    let stringDom2 = '';
    advButton[j].addEventListener('click', (event2) => {
      const mainDinoCard = event2.target.parentNode.parentNode.id;
      if (mainDinoCard === dino.dinos[j].id) {
        if (dino.dinos[j].health >= 0) {
          dino.dinos[j].health -= Math.floor((Math.random() * 100));
          if (dino.dinos[j].health <= 0) {
            dino.dinos[j].health = 0;
            dino.dinos[j].location = 'Graveyard';
            stringDom2 = `The dinosaur is in the ${dino.dinos[j].location} with a health of`;
            print.printToDom(`${dino.dinos[j].id}-l`, stringDom2);
            document.getElementById(`${dino.dinos[j].id}-h`).value = dino.dinos[j].health;
            document.getElementById(`${dino.dinos[j].id}-f`).disabled = true;
            document.getElementById(`${dino.dinos[j].id}-a`).disabled = true;
            document.getElementById(`${dino.dinos[j].id}-e`).disabled = true;
            document.getElementById(`${dino.dinos[j].id}-p`).style.display = 'inline';
            const Reprint = document.getElementById(`${dino.dinos[j].id}-reprint`);
            print.printToDom(Reprint, `${dino.dinos[j].id}-p`);
          } else if (dino.dinos[j].health < 40 && dino.dinos[j].health > 0) {
            dino.dinos[j].location = 'Hospital';
            stringDom2 = `The dinosaur is in the ${dino.dinos[j].location} with a health of`;
            print.printToDom(`${dino.dinos[j].id}-l`, stringDom2);
          } else {
            dino.dinos[j].location = 'Main Kennel';
            stringDom2 = `The dinosaur is in the ${dino.dinos[j].location} with a health of`;
            print.printToDom(`${dino.dinos[j].id}-l`, stringDom2);
          }
          document.getElementById(`${dino.dinos[j].id}-h`).value = dino.dinos[j].health;
        }
      }
    });
  }
};

// stringDom2 = `The dinosaur is in the ${dino.dinos[j].location} with a health of`;
// print.printToDom(`${dino.dinos[j].id}-l`, stringDom2);

const submitFunc = () => {
  submitButton.addEventListener('click', () => {
    addDinoFunc();
    cardPrinter();
    feedEvents();
    advEvents();
    expelEvents();
  });
};

export default { submitFunc };
