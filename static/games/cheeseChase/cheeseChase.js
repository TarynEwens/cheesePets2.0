console.log('test');

  // Create the canvas
const canvas = document.getElementById("cheeseChase");
canvas.width = window.innerWidth - (window.innerWidth * .25);
if (canvas.width > 800) {
  canvas.width = 800;
}
canvas.height = 300;
console.log(document.getElementById("cheeseChase"));
let ctx = canvas.getContext("2d");

// Background image
let bgReady = false;
let bgImage = new Image();

bgImage.src = "/backgrounds/background__summer.jpg";

bgImage.onload = function () {
	bgReady = true;
};


// Hero image
let petReady = false;
let petImage = new Image();
petImage.onload = function () {
	petReady = true;
};
petImage.src = "/games/cheeseChase/hero.png";

// Monster image
let cheeseReady = false;
let cheeseImage = new Image();
cheeseImage.onload = function () {
	cheeseReady = true;
};
cheeseImage.src = "/games/cheeseChase/cheese.png";

// Game objects
let pet = {
	speed: 256 // movement in pixels per second
};
let cheese = {};
let cheesesCaught = 0;

// Handle keyboard controls
let keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
  e.preventDefault();
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
  e.preventDefault();
}, false);

// Reset the game when the player catches a cheese
let reset = function () {
	pet.x = canvas.width / 2;
	pet.y = canvas.height / 2;

	// Throw the cheese somewhere on the screen randomly
	cheese.x = 32 + (Math.random() * (canvas.width - 64));
	cheese.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
let update = function (modifier) {
	if (38 in keysDown && pet.y >= 5) { // Player holding up
		pet.y -= pet.speed * modifier;
	}
  if (40 in keysDown && pet.y <= canvas.height - 40) { // Player holding down
		pet.y += pet.speed * modifier;
	}
	if (37 in keysDown && pet.x >= 5) { // Player holding left
		pet.x -= pet.speed * modifier;
	}
	if (39 in keysDown&& pet.x <= canvas.width - 40) { // Player holding right
		pet.x += pet.speed * modifier;
	}

	// Are they touching?
	if (
		pet.x <= (cheese.x + 32)
		&& cheese.x <= (pet.x + 32)
		&& pet.y <= (cheese.y + 32)
		&& cheese.y <= (pet.y + 32)
	) {
		++cheesesCaught;
		reset();
	}
};

// Draw everything
let render = function () {
	if (bgReady) {
		let ptrn = ctx.createPattern(bgImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // context.fillRect(x, y, width, height);
	}

	if (petReady) {
		ctx.drawImage(petImage, pet.x, pet.y);
	}

	if (cheeseReady) {
		ctx.drawImage(cheeseImage, cheese.x, cheese.y);
  }

	// Score
	ctx.fillStyle = "rgb(50, 50, 50)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Pieces of cheese: " + cheesesCaught, 32, 32);
};

// The main game loop
let main = function () {
	let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
let then = Date.now();
reset();
main();


