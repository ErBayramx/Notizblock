let noticeArray = [];
let trash = [];
let titles = [];
let trashTitle = [];
getFromLocalStorage();

function noticeRender() {

    let header = document.getElementById('header');
    header.innerHTML = `<div class="header"><h1>Notice Block</h1><div><button class="headerBtn" onclick="openWindow()"> New Notice  |</button><button class="headerBtn" onclick="openTrash()">Trash  |</button><button class="headerBtn" onclick="mainMenu()">Startseite </button></div> </div>`;
    let middle = document.getElementById('middle');

    for (let i = 0; i < noticeArray.length; i++) {
        middle.innerHTML += `
    <div class="noticeBlock">
    <div class="windowTitle">${titles[i]}</div>
    <div class="windowNotice">${noticeArray[i]} </div>
    <button onclick="pushToTrash(${(i)})">X</button>
    </div>`;
    }



}

function mainMenu() {
    middle.innerHTML = '';
    getFromLocalStorage();
    noticeRender();
}

function openTrash() {
    middle.innerHTML = '';

    for (let i = 0; i < trash.length; i++) {
        middle.innerHTML += `<div class="noticeBlock">
    <div class="windowTitle">${trashTitle[i]}</div>   
    <div class="windowNotice" >${trash[i]}  </div>
    <button  onclick="deleteNoticeTrash(${(i)})">X</button>
    </div>`;
    }
}



function addNotice() {
    let noteInputRef = document.getElementById('input');
    let noteInput = noteInputRef.value;
    let titleInputRef = document.getElementById('input-title');
    let titleInput = titleInputRef.value;
    titles.push(titleInput);
    noticeArray.push(noteInput);
    middle.innerHTML = '';
    save();
    noticeRender();

}

function pushToTrash(i) {
    trashTitle.push(titles[i])
    trash.push(noticeArray[i])
    noticeArray.splice(i, 1);
    titles.splice(i, 1);
    middle.innerHTML = '';
    save();
    saveTrash();
    noticeRender();

}

function deleteNotice(i) {


    trashTitle.splice(i, 1);
    trash.splice(i, 1);
    middle.innerHTML = '';
    save();
    noticeRender();

}

function deleteNoticeTrash(i) {

    trashTitle.splice(i, 1);
    trash.splice(i, 1);
    middle.innerHTML = '';
    for (let i = 0; i < trash.length; i++) {
        middle.innerHTML += `<div class="noticeBlock">
        <div class="windowTitle">${trashTitle[i]}</div>   
        <div class="windowNotice" >${trash[i]}  </div>
        <button  onclick="deleteNoticeTrash(${(i)})">X</button>
        </div>`;
    }

    saveTrash();
    noticeRender();

}

function openWindow() {
    header.innerHTML = '<h1> Notice Block </h1>';
    middle.innerHTML =
        `<div class="overlay">
    <div class="window">
    <input type="text" class="input-title" id="input-title" placeholder="Titel">     
    <input type="text" class="input" id="input" placeholder="Notiz"><button class="addNoticeBtn" onclick="addNotice()">Notiz Hinzufuegen</button>
    </div>
    </div>`;

}

function save() {

    localStorage.setItem("Titel", JSON.stringify(titles));
    localStorage.setItem("Notizen", JSON.stringify(noticeArray));
}

function saveTrash() {

    localStorage.setItem("Papierkorb Titel", JSON.stringify(trashTitle));
    localStorage.setItem("Papierkorb Notizen", JSON.stringify(trash));
}

function getFromLocalStorage() {

    JSON.parse(localStorage.getItem("Titel"));
    JSON.parse(localStorage.getItem("Notizen"));


}

