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
let currentObstacle = "none";
const imagesDiv = document.getElementById("images");

let currentIndex = 0;
let allObstacles = [];
	
const pointsDisplay = document.getElementById("pointsDisplay");
let progressInterval;

const restartButton = document.getElementById("restartButton");

function beginProgress() {
	//const progressInterval = setInterval(function() {
	progressInterval = setInterval(function() {
		progressPercentage++;
		progressText.textContent = "progress: " + progressPercentage + "%";

		currentIndex++;
		if (progressPercentage === 100) {
			clearInterval(progressInterval);
			progressText.textContent = "progress: 100%";
			pointsDisplay.textContent = "Points: " + progressPercentage * 10;
			reset();
		}

		// do obstacle things
		if ((progressPercentage % 2) != 0) {
			newObstacle();
		}
		else {
			addNoneObstacle();
		}
		removeObstacle();

		// check collision
		doCollision();

	}, 1000); // 1 second
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
	for (let i = 0; i < 10; i++) {
		addNoneObstacle();
	}
}

function reset() {
	progressPercentage = 0;
	isLiquid = true;
	currentObstacle = "none";
	switchButton.textContent = "Freeze";
	//startWindow.style.display = "block";
	startWindow.style.display = "none";
	gameOverWindow.style.display = "block";
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
		switchButton.textContent = "Freeze";
	}
	else {
		ice.style.display = "block";
		//water.style.display = "none";
		switchButton.textContent = "Melt";
	}
}

switchButton.addEventListener('click', freezeOrMelt);


function newObstacle() {
	const newListItem = document.createElement("li");
	const newObstacle = document.createElement("img");
	name = obstacles[Math.floor(Math.random() * obstacles.length)];
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
}

function gameOver() {
	clearInterval(progressInterval);
	//gameOverWindow.style.display = "block";
	pointsDisplay.textContent = "Points: " + progressPercentage * 10;

	gameOverReset();
}

/**function newAllObstacles() {
	allObstacles = [];
	for (let i = 0; i < 10; i++) {
		allObstacles.push("none");
	}
}**/
restartButton.addEventListener('click', start);
