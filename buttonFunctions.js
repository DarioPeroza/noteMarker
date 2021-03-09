function setBtnListeners(btnArray, callback = console.log) {
    btnArray.forEach(btn => {
        btn.addEventListener("click", (e) => {
            callback(e.target.dataset.id);
        })
    })
}

function deleteTask(id) {
    firebase.firestore().collection("tasks").doc(id).delete();
}

function setupButtons() {

    let buttons             = {};
        buttons.delete      = document.querySelectorAll(".btn-delete");
        buttons.save        = document.querySelectorAll(".btn-save");

    setBtnListeners(buttons.delete, deleteTask);
    setBtnListeners(buttons.save);

}
