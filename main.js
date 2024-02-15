// 유저가 값을 입력한다
// +누르면 할일이 추가된다
//delete 누르면 할일이 삭제된다
//check 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 클릭하는 순간 true, false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸ㄹ 간주하고 그대로
// 진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝남탭은 끝난 아이템만, 진행중 탭은 진행중만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterlist = [];
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);
function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterlist;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
      </div>`;
    }
  }
  document.getElementById("task-borad").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}
function randomIDGenerate() {
  return "-" + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  filterlist = [];
  mode = event.target.id;
  if (event.target.id === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterlist.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterlist.push(taskList[i]);
      }
    }
    render();
  }
}
