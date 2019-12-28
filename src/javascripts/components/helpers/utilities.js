const printToDom = (divId, stringDom) => {
  document.getElementById(divId).innerHTML = stringDom;
};

export default { printToDom };
