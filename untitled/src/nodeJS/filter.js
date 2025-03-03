// Filter leeren
function clearFilter(){
  let containers=getAllContainers();

  for(let i=0;i<containers.length;i++){
    for(let j=0;j<containers[i].children.length;j++){
      containers[i].children[j].style.color="white";
    }
  }

}


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



// Import Functions
import {getAllContainers} from './containerLogic.js';


// Export Functions
export {filterData, clearFilter};