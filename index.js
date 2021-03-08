const taskFormContent   = document.getElementById("task-form");
const taskForm          = {
    title           : taskFormContent[0],
    description     : taskFormContent[1],
    saveButton      : taskFormContent[2],
    deleteButton    : taskFormContent[3],
    get             : function (propiety) {
        try {
            return this[propiety].value;
        } catch (error) {
            return 'propiety: "' + propiety + '" not found'
        }
    }
};
const tasksContainer    = document.getElementById("tasks-container");

//-------------------------------------------- Functions --------------------------------------------

function setTask(title, description) {
    firebase.firestore().collection("tasks").doc().set({
        title,
        description
    })
} 

async function writeTasks() {

    let querySnapshot   = await firebase.firestore().collection("tasks").get();
    let tasksCards      = "";

    querySnapshot.forEach(doc => {
        let data = doc.data();
        let taskCard = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title fs-3">${data.title}</h5>
                <p class="card-text fw-light">${data.description}</p>
            </div>
        </div>`;
        
        tasksCards += taskCard;
    });
    tasksContainer.innerHTML = tasksCards;
}

async function readForm() {
    let title       = taskForm.get("title");
    let description = taskForm.get("description");

    if (!title || !description) {
        alert("Title or description are empty");
    } else {
        setTask(title, description);
        taskFormContent.reset();
    }

    taskForm.title.focus();
}

//-------------------------------------------- Events --------------------------------------------

taskForm.saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    readForm();
    writeTasks();
})

taskForm.deleteButton.addEventListener("click", e => {
    e.preventDefault();
    taskFormContent.reset();
})

window.addEventListener("DOMContentLoaded", (e) => {
    writeTasks();
})