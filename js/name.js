
// // User name to view in screen
// var header = document.querySelector('.header');
// var userName = document.querySelector('h1');
// var userNameInput = document.querySelector('.userNameInput');
// var previousName = '';
// var previousName = localStorage.getItem('nameInput') || '';
// // ;
// // var previousName = [];


// function storeUserName(e){
// 	if(userNameInput.value.trim()){
// 		var previousName = userNameInput.value;
// 		displayingUserName();
// 		userNameInput.value = '';
// 	}
// }
// function displayingUserName(){
// 	if(previousName){
// 	userName.textContent = previousName;		
// 	userNameInput.classList.add('inputHide');
// 	localStorage.setItem('nameInput', previousName);

// 	}
// 	// header.appendChild(userName);
// 	// console.log('enter');
// 	// previousName = userName.textContent;
// 	// if(previousName){
// 	// }
// }

// function storeName(e){
// 	console.log(e, 'in');
// 	if(e.keyCode === 13){
// 		storeUserName();
// 	}
// }

// //

// userNameInput.addEventListener('keyup', storeName);
// // userName.textContent = `${userNameInput.value}`;
// // 	header.appendChild(userName);
// // 	console.log('enter');
// // 	previousName = userName.textContent;
// // 	var Name = userNameInput.value;
// // 	userNameInput.value = '';
// // 	localStorage.setItem('nameInput',previousName);
