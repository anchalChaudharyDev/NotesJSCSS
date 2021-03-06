console.log('notes-project');

let notes = document.querySelector(".added-notes");
console.log(notes);

let addedNotes = getAddedNotes();
console.log("added notes : ",addedNotes);

let count = addedNotes.length;

let noteTitleMap = getNotesTitleMap();

//if no note is being added
let noNodesEle;
display(count);

function getNotesTitleMap(){
    let m = localStorage.getItem("notesTitle");
    return m === null ? new Map() : JSON.parse(m);
}

function getAddedNotes(){
    let n = localStorage.getItem("notes");
    let locallyStoredNotes = n==='' ? [] : JSON.parse(n);
    return locallyStoredNotes === null ? [] : locallyStoredNotes;
}

//adding new note
document.getElementById("noteAddBtn").addEventListener("click", ()=>{

    if(count==0)
        notes.removeChild(this.noNodesEle);

    let note = document.getElementById("note");
    let title = document.getElementById("noteTitle");
    let valueOfNote = note.value;
    if(valueOfNote === null || valueOfNote === undefined || valueOfNote === ''){
        alert("Enter some note before submitting");
    } else {
        addedNotes.push(valueOfNote);    
        noteTitleMap.set(valueOfNote, title.value);

        showNotes();
        
        localStorage.setItem("notes", JSON.stringify(addedNotes));
        localStorage.setItem("notesTitle", JSON.stringify(Object.fromEntries(noteTitleMap)));
        note.setAttribute("placeholder", "Write something...");
        note.value=null;
        title.value=null;
    }

});

function showNotes(){

    notes.innerHTML = '';

    Array.from(addedNotes).forEach((val, index) => {

        let newNoteDiv = document.createElement("div");
        newNoteDiv.className = "note-box";
        newNoteDiv.id = "n"+(index+1);
        
        let divHeading = document.createElement("h3");
        // divHeading.textContent = "#"+(index+1);
        divHeading.textContent = noteTitleMap.get(val);
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
        inputField.setAttribute("placeholder", "Write something ... ");
    });

    count = addedNotes.length;
}

//deleteNode
function deleteNote(id){
    let noteToDel =id.parentElement.childNodes[1].textContent;
    addedNotes.splice(addedNotes.indexOf(noteToDel), 1);
    localStorage.setItem("notes", JSON.stringify(addedNotes));
    // delete noteTitleMap[noteToDel.textContent];
    noteTitleMap.delete(noteToDel);
    localStorage.setItem("notesTitle", JSON.stringify(Object.fromEntries(noteTitleMap)));
    let newNotes = getAddedNotes();
    display(newNotes.length);
}

function display(count){
    if(count==0){
        showNotes();
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