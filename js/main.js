//displaying the time at regular intervals.
var secondHand = document.querySelector('.seconds-hand');
var minuteHand = document.querySelector('.minute-hand');
var hourHand = document.querySelector('.hour-hand');

//displaying userName/
var header = document.querySelector('.header');
var userName = document.querySelector('h1');
var userNameInput = document.querySelector('.userNameInput');
var previousName = '';
var previousName = localStorage.getItem('nameInput') || '';

function clockDisplay(){
	var clock = new Date();
	var hours = clock.getHours();
	var minutes = clock.getMinutes();
	var minutesDegree = ((minutes / 60)* 360) + 90;
	minuteHand.style.transform = `rotate(${minutesDegree}deg)`;
	var seconds = clock.getSeconds();
	var secondDegrees = ((seconds / 60)* 360) + 90;
	secondHand.style.transform = `rotate(${secondDegrees}deg)`;
	var hoursDegrees = ((hours / 12) * 360) + 90;
	hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
	var digitalClock = hours + ":" + minutes + ':' + seconds;
	var clockFace = document.querySelector('.clock-face');
	var clockDigits = document.querySelector('.clockDigits');
	clockDigits.textContent = digitalClock;
	// console.dir(clockDigits);
}
clockDisplay();
setInterval(clockDisplay, 1000);

// displaying the to do list
var allToDo = JSON.parse(localStorage.getItem('todo')) || [];
var input = document.querySelector('.input');
var button = document.querySelector('.addBtn');
var activeStatus = document.querySelector('.activeStatus');
var allStatus = document.querySelector('.allStatus');
var completedStatus = document.querySelector('.completedStatus');
var clearStatus = document.querySelector('.clearStatus');
var toggleButton = document.querySelector('.fas');
var taskStatus = document.querySelector('.taskStatus');

//Storing all the data inside the allToDo variable.
	function storeTask(e){
		if(input.value.trim()) {
			var newTodo = {
				toDoText: input.value,
				toDoStatus: false
			};
			allToDo.push(newTodo);
			input.value = '';
			displayToDo(allToDo)
		}
	}
	
//this function is for 
	function checked(e){
		var done = e.target.dataset.id;
		allToDo[done].toDoStatus = !allToDo[done].toDoStatus;
		filteredLength();
		displayToDo(allToDo);
	}
	function remove(event){
		var del = event.target.dataset.a;
		allToDo.splice(del, 1);
		displayToDo(allToDo);
	}

	function filteredLength(){
		var itemLeftCount = allToDo.filter(value => value.toDoStatus === false).length;
		var itemLeft = document.querySelector('.itemLeftstatus');
		itemLeft.textContent = `${itemLeftCount} Item left`;
	}

	function	unSelected(){
		var activeList = allToDo.filter(value => value.toDoStatus === false);
		displayToDo(activeList);
	}

	function selected(){
		var completedList = allToDo.filter(value => value.toDoStatus === true);
		displayToDo(completedList);
	}

	function clearSelected(){
		allToDo = allToDo.filter(value => value.toDoStatus === false);
		displayToDo(allToDo);
	}

	function handleEnter(e){
		if (e.keyCode === 13){
			storeTask();
		}
	}
function toggleSwitch() {
	let flag = allToDo.every(value => value.toDoStatus);
	if(flag){
		allToDo.map(value =>  value.toDoStatus = false);
	}else{
		allToDo.map(value =>  value.toDoStatus = true);
	}
	displayToDo(allToDo);
}
//function to edit the added list
function editOnDoubleClick(e){
	var editSpanIndex = e.target.dataset.id;
	var spanParent = e.target.parentElement;
	var input = document.createElement('input');
	input.type = 'text';
	input.value = e.target.textContent;
	spanParent.replaceChild(input, e.target);
	input.focus(); 
	input.addEventListener('blur', ()=> {
		allToDo[editSpanIndex].toDoText = input.value;
		displayToDo(allToDo);
	});
}

function displayToDo(list){
	displayingUserName();
	localStorage.setItem('todo',JSON.stringify(allToDo));
	if(list) {
		var ul = document.querySelector('ul');
		ul.innerHTML = '';
		list.forEach((value, index) => {
			var list = document.createElement('li');
			var checkBox = document.createElement('input');
			checkBox.type = 'checkbox';
			checkBox.setAttribute('data-id', index);
			if(value.toDoStatus){
				checkBox.setAttribute('checked', true);
			}
	var attribute = document.createElement('p');
	attribute.textContent = 'X';
	attribute.setAttribute('data-a', index);
	var span = document.createElement('span');
	span.classList.add('editText')
	span.textContent = value.toDoText;
	list.setAttribute('data-id', index);
	span.setAttribute('data-id',index);
	list.appendChild(checkBox);
	list.appendChild(span);
	list.appendChild(attribute);
	ul.appendChild(list);
			// taskStatus.classList.remove('none');
	// ul.innerHTML += `<li><input type="checkbox" data-id=${index} ${ (value.toDoStatus) ? "checked" : "" } ><span>${value.toDoText}</span><p data-a=${index}>X </p></li>`;
	filteredLength();
	span.addEventListener('dblclick', editOnDoubleClick);
	attribute.addEventListener('click', remove);
	checkBox.addEventListener('click', checked);
}) }
	if(allToDo.length === 0){
		taskStatus.classList.add('none');
	}else {taskStatus.classList.remove('none');}
}

allStatus.classList.add('border');
displayToDo(allToDo);
// taskStatus.classList.add('none');
toggleButton.addEventListener('click', toggleSwitch);
//addEventListener for Enter handling
document.addEventListener('keydown', handleEnter);
//addEventListener for clear status and adding and deleting the class 
clearStatus.addEventListener('click', () => {
	allStatus.classList.remove('border');
	activeStatus.classList.remove('border');
	completedStatus.classList.remove('border');
	clearStatus.classList.add('border');
	clearSelected()});
//addEventListener for Completed Status status and adding and deleting the class 
completedStatus.addEventListener('click', () => {
	allStatus.classList.remove('border');
	activeStatus.classList.remove('border');
	clearStatus.classList.remove('border');
	completedStatus.classList.add('border');
	selected()});
//addEventListener for All status and adding and deleting the class 
allStatus.addEventListener('click', () => {
	activeStatus.classList.remove('border');
	completedStatus.classList.remove('border');
	clearStatus.classList.remove('border');
	allStatus.classList.add('border');
	displayToDo(allToDo)});
//addEventListener for Active status and adding and deleting the class 
activeStatus.addEventListener('click', () => {
	allStatus.classList.remove('border');
	completedStatus.classList.remove('border');
	clearStatus.classList.remove('border');
	activeStatus.classList.add('border');
	unSelected()});
//addEventListener for storing and displaying the data
// button.addEventListener('click', storeTask);


//function to store userName.
function storeUserName(e){
	if(userNameInput.value.trim()){
		previousName = userNameInput.value;
		displayingUserName();
		userNameInput.value = '';
	}
}
//function to display userName.
function displayingUserName(){
	if(previousName){
	userName.textContent = `Welcome Mr. ${previousName}`;		
	userNameInput.classList.add('inputHide');
	localStorage.setItem('nameInput', previousName);
	}
}

//handlingEnter to cal storeUserName function. 
function storeName(e){
	// console.log(e, 'in');
	if(e.keyCode === 13){
		storeUserName();
	}
}


userName.addEventListener('click', () => {
	console.log('remove element');
	localStorage.removeItem('nameInput');
	userName.textContent = `Hello!`;
	userNameInput.classList.remove('inputHide');
})

//event listener for userName input box
userNameInput.addEventListener('keyup', storeName);
















