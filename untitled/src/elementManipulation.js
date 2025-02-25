// Funktion zum verarbeiten der Klicks

function addUserToBox(target){
  const userInput=document.getElementById("eingabe"); // Eingabe Feld holen
  const input=userInput.value; // Value des Eingabefelds in input speichern


  if(userInput.value!==""){
    elementManipulation(input,target);
    userInput.value="";
    saveData();
  }else{
    alert("Bitte etwas eingeben!");
  }

}

// Create Element Funktion

function elementManipulation(eingabe, target){
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

// Funktion um das Eingabefeld zu leeren
function deleteEingabe(){
  document.getElementById("eingabe").value="";
}


// Funktion um Elemente zu löschen aus einem bestimmten Container
function deleteElement(element, target){
  let name=element.id;
  target.removeChild(document.getElementById(name));
}

// Import Functions
import {getAllContainers, checkIfGuestExistsInContainer, moveGuest} from './containerLogic.js';
import {saveData} from './browserStorage.js';
// Export Functions
export {deleteElement, deleteButton, elementManipulation, addUserToBox};