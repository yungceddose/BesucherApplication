/*
// !
// Event-Listener für die Buttons
document.getElementById('erwartet-button').addEventListener('click', function () {
  addUserToBox('box-left');
});

document.getElementById('anwesend-button').addEventListener('click', function () {
  addUserToBox('box-center');
});

document.getElementById('verlassen-button').addEventListener('click', function () {
  addUserToBox('box-right');
});

document.getElementById('löschen-button').addEventListener('click', function () {
  deleteButton();
});

document.getElementById("speichern-button").addEventListener("click", function(){
  saveData();
});

document.getElementById("laden-button").addEventListener("click", function(){
  loadData();
});

document.getElementById("filter-button").addEventListener("click", function(){
  filterData();
});

document.getElementById("clear-filter-button").addEventListener("click", function(){
  clearFilter();
});


// !
// Filter leeren
function clearFilter(){
  let containers=getAllContainers();

  for(let i=0;i<containers.length;i++){
    for(let j=0;j<containers[i].children.length;j++){
        containers[i].children[j].style.color="white";
    }
  }
  saveData();

}


// !
// Namen (Daten) filtern
function filterData(){
  let containers=getAllContainers();
  let filter=document.getElementById("sucheGast").value.trim();

  if(filter===""){
    return;
  }

  for(let i=0;i<containers.length;i++){
    for(let j=0;j<containers[i].children.length;j++){
      if(containers[i].children[j].id===filter){
        containers[i].children[j].style.color="dodgerblue";
      }
    }
  }
}

// !
// Daten im Browser speichern
function saveData(){
  localStorage.setItem("erwartet", document.getElementById("box-left").innerHTML);
  localStorage.setItem("anwesend", document.getElementById("box-center").innerHTML);
  localStorage.setItem("verlassen", document.getElementById("box-right").innerHTML);
  console.log("Daten gespeichert");
}

// !
// Daten aus dem Browserspeicher holen
function loadData(){

  const erwartet=localStorage.getItem("erwartet");
  const anwesend=localStorage.getItem("anwesend");
  const verlassen=localStorage.getItem("verlassen");

  if(erwartet){
    document.getElementById("box-left").innerHTML=erwartet;
  }
  if(anwesend){
    document.getElementById("box-center").innerHTML=anwesend;
  }
  if(verlassen){
    document.getElementById("box-right").innerHTML=verlassen;
  }

  // Füge Drag-and-Drop Events zu allen geladenen Elementen hinzu
  document.querySelectorAll('.draggable').forEach(item => {
    addDragAndDropListeners(item);
  });

}


// !
// Funktion zum verarbeiten der Klicks

function addUserToBox(target){
  const userInput=document.getElementById("eingabe"); // Eingabe Feld holen
  const input=userInput.value; // Value des Eingabefelds in input speichern


  if(userInput.value!==""){
    createElement(input,target);
    userInput.value="";
    saveData();
  }else{
    alert("Bitte etwas eingeben!");
  }

}


// !
// Create Element Funktion

function createElement(eingabe,target){
  const newElement=document.createElement("div");
  const guestType=document.getElementById("guest-type").value;
  const date=Date.now();



  const elementId=guestType.toUpperCase()+"-"+eingabe+"-"+date;
  newElement.id=eingabe.trim();
  newElement.className="draggable";
  newElement.draggable=true;
  newElement.textContent=elementId;
  newElement.classList.add("guest-element");
  newElement.classList.add(guestType);



  // Drag-Event hinzufügen
  newElement.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  });

  if(checkIfGuestExistsInContainer(target,newElement)){
    console.log("Guest exists");
  }else{
    console.log("Guest does not exist");
    document.getElementById(target).appendChild(newElement);
  }


}

// !
// Check if guest exists

function checkIfGuestExistsInContainer(target, newElement){

  let containers=getAllContainers();
  let name=newElement.id;



  for(let i=0;i<containers.length;i++){ // Anzahl an Container durchgehen (3)
    for(let j=0;j<containers[i].children.length;j++){ // Alle Elemente des jeweiligen Containers durchgehen
      if(containers[i].children[j].id===name){
        if(containers[i].id===target){ // Wenn die ID des neuen Containers die selbe ist wie der alte Container
          return true;  // dann true zurück geben und der Gast wurde schon erstellt und muss nicht gemoved werden
        }else{
          moveGuest(containers[i],target,newElement); // wenn die IDs nicht übereinstimmen, dann muss der Gast verschoben werden
        }
      }
    }
  }

  return false;

}

// !
// Löschen Button Logik
function deleteButton(){
  let containers=getAllContainers();
  let name=document.getElementById("eingabe").value;

  for(let i=0; i<containers.length;i++){
    for(let j=0;j<containers[i].children.length;j++){
      if(containers[i].children[j].id===name){
        deleteElement(containers[i].children[j],containers[i]);
      }
    }
  }

  saveData();
  deleteEingabe();

}

// !
// Gast in anderen Container verschieben

function moveGuest(oldContainer, newContainer, newElement){

  deleteElement(newElement,oldContainer);
  document.getElementById(newContainer).appendChild(newElement);
  return true;
}


// !
function getAllContainers(){
  let containers=document.getElementsByClassName("box");

  return containers;
}

// !
// Funktion um das Eingabefeld zu leeren
function deleteEingabe(){
  document.getElementById("eingabe").value="";
}

// !
// Funktion um Elemente zu löschen aus einem bestimmten Container
function deleteElement(element, target){
  let name=element.id;
  target.removeChild(document.getElementById(name));
}

// !
// Funktion, um Drag- and Drop Elemente hinzuzufügen
function addDragAndDropListeners(draggableElement) {
  draggableElement.setAttribute('draggable', 'true');

  // Drag-Start-Event hinzufügen
  draggableElement.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  });
}

// !
// Drop Container
const dropContainer = document.getElementById('box-delete');
dropContainer.addEventListener('dragover', function (event) {
  event.preventDefault();
});
dropContainer.addEventListener('drop', function (event) {
  event.preventDefault();
  const draggableId = event.dataTransfer.getData('text/plain');
  const element = document.getElementById(draggableId);

  // Entferne dragged Element
  if (element) {
    element.remove();
  }

  saveData();

});


// !
// Füge das Drag-Start-Event hinzu
document.querySelectorAll('.draggable').forEach(item => {
  item.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  });
});

// Verhindere das Standardverhalten beim Drag-Over
document.querySelectorAll('.box').forEach(container => {
  container.addEventListener('dragover', function (event) {
    event.preventDefault(); // Erlaubt das Ablegen
  });

// Füge das Drop-Event hinzu
  container.addEventListener('drop', function (event) {
    event.preventDefault(); // Verhindere das Standardverhalten
    const draggableElementId = event.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(draggableElementId);

    // Nur ablegen, wenn der Drop-Bereich eine Box ist
    if (event.target.classList.contains('box')) {
      event.target.appendChild(draggableElement);
      saveData();
    } else if (event.target.parentElement.classList.contains('box')) {
      event.target.parentElement.appendChild(draggableElement);
      saveData();
    }
  });
});

*/







