function writeTaskCard(title, description, id) {
    let taskCard = `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title fs-3">${title}</h5>
                <p class="card-text fw-light">${description}</p>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button 
                    class="btn btn-primary border border-2 border-light btn-delete" 
                    data-id="${id}"
                >Delete</button>
                <button 
                    class="btn btn-secondary border border-2 border-light btn-save" 
                    data-id="${id}"
                >Edit</button>
            </div>
        </div>`;
    return taskCard;
}

async function writeTaskCards() {

    let querySnapshot   = await firebase.firestore().collection("tasks").get();
    let tasksCards      = "";

    querySnapshot.forEach(doc => {

        let data    = doc.data();
            data.id = doc.id;

        tasksCards += writeTaskCard(data.title, data.description, data.id);

    });

    tasksContainer.innerHTML    = tasksCards;

    setupButtons();
}
