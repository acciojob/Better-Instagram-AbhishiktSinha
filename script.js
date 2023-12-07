//your code here
const parentContainer = document.querySelector("#parent");

const draggingInfo = {
    beingDragged: null,
    nextSibling: null,
    reset: function() {
        this.beingDragged=null;
        this.nextSibling=null;
    }
}

function onDragenter(event) {
    const dragenterDiv = event.target;
    
    if(dragenterDiv === draggingInfo.beingDragged) {
        return;
    }
    
    dragenterDiv.classList.toggle("dragover");
}
function onDragover(event) {
    event.preventDefault();

    const dragoverDiv = event.target;
    
    if(dragoverDiv === draggingInfo.beingDragged) {
        return;
    }
    console.info("dragging over:",dragoverDiv.textConent);
    
}
function onDrop(event) {
    event.preventDefault();

    const droppedOnDiv = event.target;

    
    if(droppedOnDiv === draggingInfo.beingDragged) {
        return;
    }

    parentContainer.replaceChild(draggingInfo.beingDragged, droppedOnDiv);

    console.log(droppedOnDiv);

    if(droppedOnDiv === draggingInfo.nextSibling) {
        parentContainer.insertBefore(droppedOnDiv, draggingInfo.beingDragged);
    }
    else {
        parentContainer.insertBefore(droppedOnDiv, draggingInfo.nextSibling);

    }


    droppedOnDiv.classList.remove("dragover");

    draggingInfo.reset();
}
function onDragLeave(event) {
    
    const dragleaveDiv = event.target;
    dragleaveDiv.classList.remove("dragover");
}

function onDragstart(event) {
    draggingInfo.beingDragged = event.target;
    draggingInfo.nextSibling = event.target.nextElementSibling ? event.target.nextElementSibling : null;

    console.log(draggingInfo);
}
function onDragend(event) {
    draggingInfo.reset();
}

for(let div of parentContainer.children) {
    div.addEventListener("dragenter", onDragenter);
    div.addEventListener("dragover", onDragover);
    div.addEventListener("drop", onDrop);
    div.addEventListener("dragleave", onDragLeave);

    div.addEventListener("dragstart", onDragstart);
    div.addEventListener("dragend", onDragend);
}