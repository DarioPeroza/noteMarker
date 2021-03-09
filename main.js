const taskFormContent   = document.getElementById("task-form");
const taskForm          = {
    title           : taskFormContent[0],
    description     : taskFormContent[1],
    saveButton      : taskFormContent[2],
    deleteButton    : taskFormContent[3],
    id              : "",
    editing         : false,
    get             : function (propiety) {
        try {
            return this[propiety].value;
        } catch (error) {
            return 'propiety: "' + propiety + '" not found'
        }
    },
    set             : function (propiety, value) {
        try {
            this[propiety].value = value;
            return value;
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

async function deleteTask(id) {
    await firebase.firestore().collection("tasks").doc(id).delete();
}

async function updateTask(id) {

    let task = {
        title       : taskForm.get("title"),
        description : taskForm.get("description")
    };

    await firebase.firestore().collection("tasks").doc(id).update(task);

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

    if (!taskForm.editing) {

        readForm();

    } else if (taskForm.editing) {

        updateTask(taskForm.id);

        taskForm.id = "";
        taskForm.editing = false;

        changeSaveButton();

        taskFormContent.reset();
        taskForm.title.focus();

    }
    
})

taskForm.deleteButton.addEventListener("click", e => {

    e.preventDefault();

    if (taskForm.editing) {

        deleteTask(taskForm.id);

        taskForm.id = "";
        taskForm.editing = false;

        changeSaveButton();

    }

    taskFormContent.reset();
})

firebase.firestore().collection("tasks").onSnapshot(() => {
    writeTaskCards();
});

window.addEventListener("DOMContentLoaded", (e) => {
    writeTaskCards();
})