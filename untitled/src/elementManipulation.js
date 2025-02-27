
let elementArr=[];

// Funktion zum verarbeiten der Klicks

function addUserToBox(target){
  const userInput=document.getElementById("eingabe"); // Eingabe Feld holen
  const input=userInput.value; // Value des Eingabefelds in input speichern


  if(userInput.value!==""){
    elementManipulation(input,target);
    userInput.value="";

  }else{
    alert("Bitte etwas eingeben!");
  }

}

// Create Element Funktion

function elementManipulation(eingabe, target){

  const newElement=document.createElement("div");
  const guestType=document.getElementById("guest-type").value;
  const date=Date.now();
  let targetElement=document.getElementById(target);

  const elementId=guestType.toUpperCase()+"-"+eingabe+"-"+date;
  newElement.id=eingabe.trim();
  newElement.className="draggable";
  newElement.draggable=true;
  newElement.textContent=elementId;
  newElement.setAttribute("name",eingabe.trim());
  newElement.setAttribute("guestType",guestType);
  newElement.setAttribute("date", date.toString());
  newElement.setAttribute("container", targetElement.id);
  console.log(newElement.getAttribute("name"));
  console.log(newElement.getAttribute("guestType"));
  console.log(newElement.getAttribute("date"));
  console.log(newElement.getAttribute("container"));

  // Drag-Event hinzufügen
  newElement.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  });

  if(checkIfGuestExistsInContainer(target,newElement)){
    console.log("Guest exists");
  }else{
    console.log("Guest does not exist");
    document.getElementById(target).appendChild(newElement);
    elementArr.push(newElement);
    console.log(elementArr.length);
  }


}


// Löschen Button Logik
function deleteButton(){
  let containers=getAllContainers();
  let name=document.getElementById("eingabe").value;
  console.log("deleteElement aufgerufen");
  for(let i=0; i<containers.length;i++){
    for(let j=0;j<containers[i].children.length;j++){
      if(containers[i].children[j].id===name){
        deleteElement(containers[i].children[j],containers[i]);
      }
    }
  }


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
  deleteElementFromArray(element);
}

// Funktion um ein Element anhand der ID aus dem Array löschen

function deleteElementFromArray(element){
  let elementId=element.id;

  for(let i=0; i<elementArr.length; i++){
    if(elementArr[i].getAttribute("name")===elementId){
      elementArr.splice(i,1);
      console.log("Element gelöscht");
    }
  }

}


// Funktion um das Container-Attribut zu ändern
function changeContainer(newContainer, element){

  let elementId=element.id;
  let elementObj=document.getElementById(elementId);

  elementObj.setAttribute("container",newContainer.getAttribute("data-container"));


}



// Import Functions
import {getAllContainers, checkIfGuestExistsInContainer, moveGuest} from './containerLogic.js';

// Export Functions
export {deleteElement, deleteButton, elementManipulation, addUserToBox, deleteElementFromArray, changeContainer};