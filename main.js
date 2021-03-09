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
})

taskForm.deleteButton.addEventListener("click", e => {
    e.preventDefault();
    taskFormContent.reset();
})

firebase.firestore().collection("tasks").onSnapshot(() => {
    writeTaskCards();
});

window.addEventListener("DOMContentLoaded", (e) => {
    writeTaskCards();
})