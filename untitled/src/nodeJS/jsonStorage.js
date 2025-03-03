const elementArray=[];

// Jeden Container durchgehen und davon jedes einzelne Element speichern
function saveData(){

  const allContainer=getAllContainers();


  for (let i=0; i<allContainer.length; i++) {
    for (let j=0; j<allContainer[i].childNodes.length; j++) {
      if(allContainer[i].childNodes[j].getAttribute('name')!==null){
        const element=allContainer[i].childNodes[j];
        const elementValues={
          guestType: element.getAttribute('guestType'),
          name: element.getAttribute('name'),
          date: element.getAttribute('date'),
          container: element.getAttribute('container'),
        }
        elementArray.push(elementValues);
      }
    }
  }
}


export function getElementArray(){
  return elementArray;
}


export {saveData};
import { getAllContainers } from './containerLogic.js';

