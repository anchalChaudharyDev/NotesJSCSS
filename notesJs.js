console.log('notes-project');

let notes = document.querySelector(".added-notes");
console.log(notes);

let addedNotes = getAddedNotes();
console.log("added notes : ",addedNotes);

let count = addedNotes.length;

//if no note is being added
let noNodesEle;
display(count);

function getAddedNotes(){
    let n = localStorage.getItem("notes");
    let locallyStoredNotes = n==='' ? [] : JSON.parse(n);
    return locallyStoredNotes === null ? [] : locallyStoredNotes;
}

//adding new note
document.getElementById("noteAddBtn").addEventListener("click", ()=>{

    if(count==0)
        notes.removeChild(this.noNodesEle);

    addedNotes.push(document.getElementById("note").value);    

    showNotes();
    
    localStorage.setItem("notes", JSON.stringify(addedNotes));
    note.textContent = "Write something...";
});

function showNotes(){

    notes.innerHTML = '';

    Array.from(addedNotes).forEach((val, index) => {

        let newNoteDiv = document.createElement("div");
        newNoteDiv.className = "note-box";
        newNoteDiv.id = "n"+(index+1);
        
        let divHeading = document.createElement("h3");
        divHeading.textContent = "#"+(index+1);
        divHeading.className = "note-heading";
    
        let divText = document.createElement("p");
        divText.textContent = val;
        divText.className = "note-content";
    
        let divButton = document.createElement("input");
        divButton.setAttribute("value", "Delete");
        divButton.setAttribute("type", "button");
        divButton.className = "note-delete-btn";
        divButton.id = "b"+(index+1);
        divButton.setAttribute("onClick", "deleteNote("+divButton.id+")");
    
        newNoteDiv.appendChild(divHeading);
        newNoteDiv.appendChild(divText);
        newNoteDiv.appendChild(divButton);
    
        console.log(newNoteDiv);
    
        notes.appendChild(newNoteDiv);
        console.log(notes);

        let inputField = document.getElementById("note");
        console.log(inputField);
        inputField.value = "Write something ... ";
    });
}

//deleteNode
function deleteNote(id){

    // let noteToDelete = document.getElementById("note"+id);
    // notes.removeChild(noteToDelete);

    addedNotes.splice(id, 1);
    localStorage.setItem("notes", addedNotes);
    let newNotes = getAddedNotes();
    display(newNotes.length);
}

function display(count){
    if(count==0){
        noNotesPresent();
    } else {
        showNotes();
    }
}

function noNotesPresent(){
    this.noNodesEle = document.createElement("div");
    this.noNodesEle.setAttribute("id", "no-note-text");
    this.noNodesEle.textContent="Nothing to show! Add note";
    console.log("added node :", this.noNodesEle);
    notes.appendChild(this.noNodesEle);
}