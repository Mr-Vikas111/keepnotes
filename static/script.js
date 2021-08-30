const addbutton = document.querySelector('#add');


const updateLSData = () => {

    const textarea = document.querySelectorAll('textarea');
    const notes = [];
    //console.log(textarea);
    textarea.forEach((note) => {
        return notes.push(note.value);
    })
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));
}


const addnewNotes = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');
    const htmldata = `
    <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"} "></div>
        <textarea class="${text ? "hidden" : ""}" ></textarea>
    
    `
    note.insertAdjacentHTML('afterbegin', htmldata);
    console.log(note);

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    // delete note
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
        swal("Notes deleted successfully", "", "success");
    })

    // toggle using edit button 
    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden')
    })


    textarea.addEventListener('change', (event) => {

        const value = event.target.value;
        // console.log(value);
        mainDiv.innerHTML = value;
        updateLSData();
        swal("Notes successfully Save", "", "success");
    })

    document.body.appendChild(note);
    //add a node too the last of the element

}

// getting data back from localstorage

const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) { notes.forEach((note) => addnewNotes(note)) };

addbutton.addEventListener('click', () => addnewNotes());