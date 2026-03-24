// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');

const startButton = document.getElementById("startButton");
const progressText = document.getElementById("progressText");
let progressPercentage = 0;

const switchButton = document.getElementById("switchButton");
const waterCharacter = document.getElementById("water");
const iceCharacter = document.getElementById("ice");
let isLiquid = true;

const imagesList = document.getElementById("imagesList");
const obstacles = ["block", "holes", "fence", "none"];
const hardObstacles = ["block", "holes", "fence"];
let currentObstacle = "none";
const imagesDiv = document.getElementById("images");

let currentIndex = 0;
let allObstacles = [];
	
const pointsDisplay = document.getElementById("pointsDisplay");
let progressInterval;

const restartButton = document.getElementById("restartButton");

const easyDifficulty = document.getElementById("easy");
const hardDifficulty = document.getElementById("hard");

const progressBar = document.getElementById("progressBar");

let numObstacles = 7;

const gameOverMessage = document.getElementById("gameOverMessage");
const gameOverImage = document.getElementById("gameOverImage");

const howButton = document.getElementById("howButton");
const backButton = document.getElementById("backButton");

function beginProgress() {
	let speed = 0;
	if (easyDifficulty.checked === true) {
		speed = 1000; // 1 second
	}
	else {
		// hard difficulty
		speed = 700;
	}
	//const progressInterval = setInterval(function() {
	progressInterval = setInterval(function() {
		progressPercentage++;
		progressText.textContent = "progress: " + progressPercentage + "%";
		const percentage = progressPercentage + "%";
		progressBar.style.width = percentage;

		currentIndex++;
		if (progressPercentage === 100) {
			clearInterval(progressInterval);
			progressText.textContent = "progress: 100%";
			pointsDisplay.textContent = "Points: " + progressPercentage * 10;
			gameOverMessage.textContent = "Complete";
			gameOverImage.style.display = "block";
			reset();
		}

		// check if not at the end
		if (progressPercentage <= 100 - numObstacles) {
			// do obstacle things
			if ((progressPercentage % 2) != 0) {
				// check if last
				if (progressPercentage === 100 - numObstacles) {
					const newListItem = document.createElement("li");
					const newObstacle = document.createElement("img");
					newObstacle.src = "img/water-can-transparent.png";
					newObstacle.name = "water-can";
					newListItem.appendChild(newObstacle);
					imagesList.appendChild(newListItem);
					allObstacles.push("water-can");
				}
				else {
					newObstacle();
				}
			}
			else {
				addNoneObstacle();
			}
		}
		removeObstacle();

		// check collision
		doCollision();

		animateObstacles();

	}, speed);
	progressText.textContent = "progress: 0%";
}

function start() {
	switchButton.style.display = "block";
	allObstacles = [];
	//newAllObstacles();
	beginProgress();
	startWindow.style.display = "none";
	gameOverWindow.style.display = "none";
	gameWindow.style.display = "block";
	clearCharacter();
	//ice.style.display = "none";
	water.style.display = "block";
	// clear list
	imagesList.innerHTML = "";
	for (let i = 0; i < numObstacles; i++) {
		addNoneObstacle();
	}
}

function reset() {
	progressPercentage = 0;
	isLiquid = true;
	currentObstacle = "none";
	//switchButton.textContent = "Freeze";
	switchButton.innerHTML = '<span class="material-symbols-outlined">snowflake</span>';
	//startWindow.style.display = "block";
	startWindow.style.display = "none";
	gameOverWindow.style.display = "flex";
	gameWindow.style.display = "none";
	currentIndex = 0;
	switchButton.style.display = "block";
}

function gameOverReset() {
	reset();
	switchButton.style.display = "none";
}

//startButton.addEventListener('click', beginProgress);
startButton.addEventListener('click', start);

function freezeOrMelt() {
	clearCharacter();
	isLiquid = !isLiquid;
	if (isLiquid) {
		water.style.display = "block";
		//ice.style.display = "none";
		//switchButton.textContent = "Freeze";
		switchButton.innerHTML = '<span class="material-symbols-outlined">snowflake</span>';

	}
	else {
		ice.style.display = "block";
		//water.style.display = "none";
		//switchButton.textContent = "Melt";
		switchButton.innerHTML = '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M256.5 37.6C265.8 29.8 279.5 30.1 288.4 38.5C300.7 50.1 311.7 62.9 322.3 75.9C335.8 92.4 352 114.2 367.6 140.1C372.8 133.3 377.6 127.3 381.8 122.2C382.9 120.9 384 119.5 385.1 118.1C393 108.3 402.8 96 415.9 96C429.3 96 438.7 107.9 446.7 118.1C448 119.8 449.3 121.4 450.6 122.9C460.9 135.3 474.6 153.2 488.3 175.3C515.5 219.2 543.9 281.7 543.9 351.9C543.9 475.6 443.6 575.9 319.9 575.9C196.2 575.9 96 475.7 96 352C96 260.9 137.1 182 176.5 127C196.4 99.3 216.2 77.1 231.1 61.9C239.3 53.5 247.6 45.2 256.6 37.7zM321.7 480C347 480 369.4 473 390.5 459C432.6 429.6 443.9 370.8 418.6 324.6C414.1 315.6 402.6 315 396.1 322.6L370.9 351.9C364.3 359.5 352.4 359.3 346.2 351.4C328.9 329.3 297.1 289 280.9 268.4C275.5 261.5 265.7 260.4 259.4 266.5C241.1 284.3 207.9 323.3 207.9 370.8C207.9 439.4 258.5 480 321.6 480z"/></svg>';
	}
}

switchButton.addEventListener('click', freezeOrMelt);


function newObstacle() {
	const newListItem = document.createElement("li");
	const newObstacle = document.createElement("img");
	if (easyDifficulty.checked === true) {
		name = obstacles[Math.floor(Math.random() * obstacles.length)];
	}
	else {
		// hard difficulty
		name = hardObstacles[Math.floor(Math.random() * hardObstacles.length)];
	}
	//name = obstacles[Math.floor(Math.random() * obstacles.length)];
	newObstacle.src = "img/" + name + ".png";
	newObstacle.name = name;
	newListItem.appendChild(newObstacle);
	imagesList.appendChild(newListItem);

	allObstacles.push(name);
}

function addNoneObstacle() {
	const newListItem = document.createElement("li");
	const newObstacle = document.createElement("img");
	newObstacle.src = "img/none.png";
	newObstacle.name = "none";
	newListItem.appendChild(newObstacle);
	imagesList.appendChild(newListItem);

	allObstacles.push("none");
}

function removeObstacle() {
//	currentObstacle = (imagesList.firstElementChild);
	currentObstacle = allObstacles[currentIndex-1];
	//console.log(currentObstacle);
//	console.log(progressPercentage);
	imagesList.removeChild(imagesList.firstElementChild);
	updateCharacterImage();
}

function doCollision() {
	if (currentObstacle === "none") {
		return;
	}
	if (currentObstacle === "holes") {
		if (isLiquid) {
			// game over
			gameOver();
			return;
		}
		// else continue
		return;
	}
	if (currentObstacle === "fence") {
		if (!isLiquid) {
			// game over
			gameOver();
			return;
		}
		// else continue
		return;

	}
	// block
	if (!isLiquid) {
		// game over
		gameOver();
		return;
	}
	// else continue
	return;
}

function updateCharacterImage() {
	clearCharacter();
	if (currentObstacle === "none") {
		if (isLiquid) {
			// water
			water.style.display = "block";
		}
		else {
			//ice
			ice.style.display = "block";
		}
		return;
	}
	else if (currentObstacle === "block") {
		if (isLiquid) {
			waterblock.style.display = "block";
		}
		else {
			iceblock.style.display = "block";
		}
		return;
	}
	else if (currentObstacle === "fence") {
		if (isLiquid) {
			waterfence.style.display = "block";
		}
		else {
			icefence.style.display = "block";
		}
		return;
	}
	else { // holes
		//console.log(currentObstacle);
		if (isLiquid) {
			waterholes.style.display = "block";
		}
		else {
			iceholes.style.display = "block";
		}
		return;
	}
}

function clearCharacter() {
	ice.style.display = "none";
	water.style.display = "none";
	iceholes.style.display = "none";
	waterholes.style.display = "none";
	icefence.style.display = "none";
	waterfence.style.display = "none";
	iceblock.style.display = "none";
	waterblock.style.display = "none";
	//water0.style.display = "none";
	//water1.style.display = "none";
	//water2.style.display = "none";
}

function gameOver() {
	clearInterval(progressInterval);
	//gameOverWindow.style.display = "block";
	pointsDisplay.textContent = "Points: " + progressPercentage * 10;
	gameOverMessage.textContent = "game over";
	gameOverImage.style.display = "none";

	gameOverReset();
}

/**function newAllObstacles() {
	allObstacles = [];
	for (let i = 0; i < 10; i++) {
		allObstacles.push("none");
	}
}**/

/**const frames = [water0, water1, water2];

function animateDrop() {
	let frame = 0
	animationInterval = setInterval(function() {
		if (frame === 100) {
			clearInterval(animationInterval);
		}
		clearCharacter();
		frames[frame % frames.length].style.display = "block";
		frame++;
	}, 10);
}**/

function animateObstacles() {
	let imgWidth = 0;
	if (screen.width > 500) {
		imgWidth = 500/8;
	}
	else {
		imgWidth = screen.width / 8;
	}
	let obstacles = imagesList.getElementsByTagName("li");
	for (let i = 0; i < obstacles.length; i++) {
		var obstacle = obstacles[i];
		obstacle.animate({ transform: `translateX(${imgWidth}px)`, offset: 0 }, 1000);
	}

}

restartButton.addEventListener('click', start);

howButton.addEventListener('click', function() {
	startWindow.style.display = "none";
	howWindow.style.display = "flex";
});

backButton.addEventListener('click', function() {
	howWindow.style.display = "none";
	startWindow.style.display = "block";
});
