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
  // Load Data Funktion
});

document.getElementById("filter-button").addEventListener("click", function(){
  filterData();
});

document.getElementById("clear-filter-button").addEventListener("click", function(){
  clearFilter();
});

// Import Functions
import {deleteButton, addUserToBox} from './elementManipulation.js';
import {saveData} from './jsonStorage.js';
import {filterData, clearFilter} from './filter.js';