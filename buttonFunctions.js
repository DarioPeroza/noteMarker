function setBtnListeners(btnArray, callback = console.log) {
    btnArray.forEach(btn => {
        btn.addEventListener("click", (e) => {
            callback(e.target.dataset.id);
        })
    })
}

async function editTask(id) {

    let snapshot    = await firebase.firestore().collection("tasks").doc(id).get();
    let title       = snapshot.data().title;
    let description = snapshot.data().description;

    taskForm.set("title", title);
    taskForm.set("description", description);
    taskForm.editing = true;
    taskForm.id = id;

    changeSaveButton();
}

function changeSaveButton() {
    if (taskForm.editing) {
        taskForm.saveButton.innerText = "Update";
    }
    if (!taskForm.editing) {
        taskForm.saveButton.innerText = "Save";
    }
}

function setupButtons() {

    let buttons             = {};
        buttons.delete      = document.querySelectorAll(".btn-delete");
        buttons.save        = document.querySelectorAll(".btn-save");

    setBtnListeners(buttons.delete, deleteTask);
    setBtnListeners(buttons.save, editTask);

}
