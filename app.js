import { addDoc, getDocs, collection, doc, db, deleteDoc, updateDoc, getDoc } from "./firebase.js";

let dbcollection = collection(db, "users");
let btn = document.getElementById("save");
let todo = document.getElementById("todo");
btn.addEventListener("click", async function () {
    try {
        let subject = document.getElementById("recipient-name");
        let task = document.getElementById("message-text");
        let editId = document.getElementById("edit-id").value;
        if (subject && task) {
            let obj = {
                subject: subject.value,
                message: task.value,
                dona: false,
            }
            if (editId) {
                // Update existing document
                const docRef = doc(db, "users", editId);
                await updateDoc(docRef, obj);
                document.getElementById("edit-id").value = ""; // Reset edit-id after updating
            } else {
                // Add new document
                await addDoc(dbcollection, obj);
            }
            getodos();
            subject.value = "";
            task.value = "";
        } else {
            console.log("User element not found");
        }

    } catch (error) {
        console.log("Error:", error);
    }
});

async function getodos() {
    try {
        let query = await getDocs(dbcollection);
        let arr = [];
        todo.innerHTML = "";
        query.forEach((doc) => {
            let obj = {
                id: doc.id,
                ...doc.data()
            }
            arr.push(obj)
            let doneclass = obj.dona ? "doness" : " ";
            todo.innerHTML += `<li class="task ${doneclass}"><span class="text2">${obj.subject}</span>
                <button class="done" id="${obj.id}" onclick="done(this)">Done</button>
                <button class="edit" id="edit-${obj.id}" onclick="edit('${obj.id}','${obj.subject}','${obj.message}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
             <i class="fa-regular fa-eye" id=${obj.id} onclick="show('${obj.subject}','${obj.message}',this)" data-bs-toggle="modal" data-bs-target="#exampleModl"></i>
                <i class="fa-solid fa-trash" id="${obj.id}" onclick="del(this)" style="color: #FFD43B;"></i></li>`;
        });
    }
    catch (error) {
        console.log("error", error);
    }
}

const del = async (e) => {
    try {
        await deleteDoc(doc(db, "users", e.id))
        getodos();
    } catch (error) {
        console.log("error", error);
    }
}

const done = async (e) => {
    try {
        const docRef = doc(db, "users", e.id);
        const docSnapshot = await getDoc(docRef);
        const currentData = docSnapshot.data();
        await updateDoc(docRef, { dona: !currentData.dona });
        let taskElement = e.closest(".task");
        if (taskElement) {
            taskElement.classList.toggle("doness");
        }
    }
    catch (error) {
        console.log("error", error);
    }
}



const edit = (id, subject, task) => {
    document.getElementById('recipient-name').value = subject;
    document.getElementById('message-text').value = task;
    document.getElementById('edit-id').value = id;
}

function show(subject ,message) {
    let topic = document.getElementById("topic");
    let task = document.getElementById("task");
    topic.innerHTML = subject;
    task.innerHTML = message;

}

window.addEventListener("load", getodos);
window.del = del;
window.done = done;
window.edit = edit;
window.show = show;
