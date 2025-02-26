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

    } else if (event.target.parentElement.classList.contains('box')) {
      event.target.parentElement.appendChild(draggableElement);

    }
  });
});

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



});

// Funktion, um Drag- and Drop Elemente hinzuzufügen
function addDragAndDropListeners(draggableElement) {
  draggableElement.setAttribute('draggable', 'true');

  // Drag-Start-Event hinzufügen
  draggableElement.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  });
}

// Import Functions


// Export Functions
export {addDragAndDropListeners};