
function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(items);
    })
}

function generateItems(items){
    let todoItems = []
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="assets/icon-check.svg">';
        checkMark.addEventListener("click", function(){
            markCompleted(item.id);
        })
        checkContainer.appendChild(checkMark);

        let todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-text");
        const todoText = document.createElement("span");
        todoText.innerText = item.text.length < 30 ? item.text : item.text.substring(0, 30) + "...";
        const todoTime = document.createElement("span");
        todoTime.innerText = item.date
        todoContainer.appendChild(todoText)
        todoContainer.appendChild(todoTime)
        todoContainer.addEventListener("click", () => {
            if (todoText.innerText.length <= 33) {
                todoText.innerText = item.text;
            } else {
                todoText.innerText = item.text.substring(0, 30) + "...";
            }
        })
        let todoDate=document.createElement("div");
        todoDate.innerHTML=item.date;
        //todoText.innerHTML += "hi" + item.date ? item.date : "";

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoContainer.classList.add("checked");
        }
        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoContainer);
        todoItems.push(todoItem)
    })
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}



function addItem(event){
    event.preventDefault();
    const date = new Date(Date.now()).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    let text = document.getElementById("todo-input");
    db.collection("todo-items").add({
        text: text.value,
        status: "active",
        date
    })
    text.value = "";
}

function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

getItems();


// ...

function clearCompletedItems() {
    db.collection("todo-items")
        .where("status", "==", "completed")
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
}

function showActiveItems() {
    // Show only active items
    db.collection("todo-items")
        .where("status", "==", "active")
        .onSnapshot((snapshot) => {
            let items = [];
            snapshot.docs.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            generateItems(items);
        });
}

function showCompletedItems() {
    // Show only completed items
    db.collection("todo-items")
        .where("status", "==", "completed")
        .onSnapshot((snapshot) => {
            let items = [];
            snapshot.docs.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            generateItems(items);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    // ...

    // Add event listener for clear completed button
    const clearCompletedButton = document.getElementById("id");
    clearCompletedButton.addEventListener("click", clearCompletedItems);

    // Add event listener for showing active items
    const activeItemsButton = document.querySelector(".items-statuses span:nth-child(2)");
    activeItemsButton.addEventListener("click", showActiveItems);

    // Add event listener for showing completed items
    const completedItemsButton = document.querySelector(".items-statuses span:nth-child(3)");
    completedItemsButton.addEventListener("click", showCompletedItems);

    // add event listener for showing all items
    const allItemsButton = document.querySelector(".items-statuses span:nth-child(1)");
    allItemsButton.addEventListener("click", getItems);
    

});



