// Daten im Browser speichern

function saveData(){
  localStorage.setItem("erwartet", document.getElementById("box-left").innerHTML);
  localStorage.setItem("anwesend", document.getElementById("box-center").innerHTML);
  localStorage.setItem("verlassen", document.getElementById("box-right").innerHTML);
  console.log("Daten gespeichert");
}

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

// Export Functions
export {saveData, loadData};

// Import Functions
import {addDragAndDropListeners} from './dragAndDrop.js';