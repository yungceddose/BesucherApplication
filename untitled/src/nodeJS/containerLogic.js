function getAllContainers(){
  let containers=document.getElementsByClassName("box");

  return containers;
}

// Gast in anderen Container verschieben
 function moveGuest(oldContainer, newContainer, newElement){

  let newContainerId=newContainer.id;

  deleteElement(newElement,oldContainer);
  document.getElementById(newContainer).appendChild(newElement);
  console.log(newElement.getAttribute("container"));


  return true;
}


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

// Exports
export {getAllContainers, moveGuest, checkIfGuestExistsInContainer};

// Import
import{deleteElement} from './elementManipulation.js';
