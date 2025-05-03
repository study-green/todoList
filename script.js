const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const tasks = [];

taskList.addEventListener('dragover', function(e) {
  // ドロップできるように既定の動作を停止
  e.preventDefault();
});

taskList.addEventListener('drop', function(e) {
  const id = e.dataTransfer.getData('text');
  const draggableElement = document.getElementById(id);
  const dropzone = e.target;
  taskList.insertBefore(draggableElement, dropzone);
});

addTaskButton.addEventListener('click', function() {
  const taskText = newTaskInput.value;
  if (taskText !== "") {
    if (tasks.includes(taskText)) {
      const popup = document.createElement('div');
      popup.textContent = '同じタスクは追加できません。';
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.backgroundColor = '#e0f2f1';
      popup.style.padding = '20px';
      popup.style.borderRadius = '10px';
      popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      popup.style.zIndex = '1000';
      const closeButton = document.createElement('button');
      closeButton.textContent = '閉じる';
      closeButton.style.marginLeft = '10px';
      closeButton.addEventListener('click', function() {
        document.body.removeChild(popup);
      });
      popup.appendChild(closeButton);
      document.body.appendChild(popup);
      return;
    }
    tasks.push(taskText);
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    listItem.draggable = true;
    listItem.id = taskText;
    listItem.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text', e.target.id);
    });
    listItem.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    listItem.addEventListener('drop', function(e) {
      return false;
    });
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    listItem.appendChild(checkbox);
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        listItem.style.color = '#ccc';
      } else {
        listItem.style.color = '';
      }
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.addEventListener('click', function() {
      taskList.removeChild(listItem);
      tasks.splice(tasks.indexOf(taskText), 1);
    });
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
    newTaskInput.value = "";
  }
});
