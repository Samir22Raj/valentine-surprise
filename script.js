const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const image = document.getElementById("display-image");
const question = document.getElementById("question");
const nextButton = document.getElementById("nextButton");
const mainWrapper = document.getElementById("mainWrapper");
const pickGiftHeader = document.getElementById("pick-a-gift");
const giftContainer = document.querySelector(".gift-container");
const giftContent = document.getElementById("gift-content");
couponSlider = document.getElementById("coupon-slider");
const collageGrid = document.querySelector(".collage-grid");
const valentinePackage = document.querySelector(".valentine-package");
const collageImage = collageGrid.querySelector("#collage-image");
const modalImage = document.querySelector("#modal-image");
const modal = document.getElementById("collageModal");
let flowerIntervalId = null;

// 1. The "Runaway" Logic for the No button
noButton.addEventListener("mouseover", () => {
	// 1. Get the current position of the button
	const currentPos = noButton.getBoundingClientRect();

	// 2. If the button doesn't have a 'left' style yet, set it!
	// This gives the browser the "starting point" it needs for the animation.
	if (!noButton.style.left) {
		noButton.style.left = `${currentPos.left}px`;
		noButton.style.top = `${currentPos.top}px`;
		noButton.style.position = "fixed"; // Switch to fixed for easier screen-wide movement
	}

	// 3. Calculate the random new position
	const maxX = window.innerWidth - noButton.offsetWidth;
	const maxY = window.innerHeight - noButton.offsetHeight;

	const randomX = Math.floor(Math.random() * maxX);
	const randomY = Math.floor(Math.random() * maxY);

	// 4. Move it! Now it will glide because it has a starting pixel value.
	noButton.style.left = `${randomX}px`;
	noButton.style.top = `${randomY}px`;
});

// 2. The "Success" Logic for the Yes button
yesButton.addEventListener("click", () => {
	question.classList.add("fade-in"); // Start fade-out animation
	question.innerHTML =
		"Yay! I knew you'd say yes! 🥰</br> I have some gifts for you!  🎁";
	image.classList.add("fade-in"); // Trigger fade-in animation
	image.src = "Images/Happy.gif";

	// Hide the No button
	noButton.style.display = "none";
	yesButton.style.display = "none";

	// Show the Next button
	nextButton.style.display = "inline-block";
});

// 3. The Scroll Effect
nextButton.addEventListener("click", () => {
	mainWrapper.style.transform = "translateY(-100vh)";
});

// 4. Gift Selection Logic
//1. Hide gifts on load
function hideGifts() {
	if (giftContainer.classList.contains("fade-in")) {
		giftContainer.classList.remove("fade-in");
	}
	if (pickGiftHeader.classList.contains("fade-in")) {
		pickGiftHeader.classList.remove("fade-in");
	}
	giftContainer.classList.add("fade-out");
	pickGiftHeader.classList.add("fade-out");

	// 2. Wait for fade-out to finish, then hide the elements
	setTimeout(() => {
		giftContainer.style.display = "none";
		pickGiftHeader.style.display = "none";
	}, 1000);
}

function showGifts() {
	// Stop the flower fall animation if it's running
	if (flowerIntervalId !== null) {
		clearInterval(flowerIntervalId);
		flowerIntervalId = null;
	}

	// 1. Fade out for current gift if it's visible
	if (couponSlider.classList.contains("fade-in")) {
		couponSlider.classList.remove("fade-in");
		couponSlider.classList.add("fade-out");
	}

	if (collageGrid.classList.contains("fade-in")) {
		collageGrid.classList.remove("fade-in");
		collageGrid.classList.add("fade-out");
	}

	if (valentinePackage.classList.contains("fade-in")) {
		valentinePackage.classList.remove("fade-in");
		valentinePackage.classList.add("fade-out");
	}

	// 2. Wait for fade-out to finish, then hide and show gifts
	setTimeout(() => {
		if (couponSlider.classList.contains("fade-out")) {
			couponSlider.classList.add("hide");
		}

		if (collageGrid.classList.contains("fade-out")) {
			collageGrid.classList.add("hide");
		}

		if (valentinePackage.classList.contains("fade-out")) {
			valentinePackage.classList.add("hide");
		}

		giftContainer.classList.remove("fade-out");
		pickGiftHeader.classList.remove("fade-out");
		giftContainer.classList.add("fade-in");
		pickGiftHeader.classList.add("fade-in");
		giftContainer.style.display = "flex";
		pickGiftHeader.style.display = "block";
	}, 1000);
}

// 5. Gift 1: Coupon Slider
function showCoupons() {
	hideGifts();

	// 1. Wait for fade to finish, then show the slider
	setTimeout(() => {
		if (couponSlider.classList.contains("fade-out")) {
			couponSlider.classList.remove("fade-out");
		}
		couponSlider.classList.add("fade-in");
		couponSlider.classList.remove("hide");
	}, 1000);
}

let currentSlide = 0;
const totalSlides = 4;

function moveSlider(direction) {
	const track = document.getElementById("sliderTrack");
	const viewport = document.querySelector(".slider-viewport");

	// Get the viewport width to calculate card width dynamically
	const viewportWidth = viewport.offsetWidth;

	// Update the index with infinite loop logic
	currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

	const shift = currentSlide * viewportWidth;

	// Apply the animation
	track.style.transform = `translateX(-${shift}px)`;
}

// 5. Gift 2: Photo Collage (Placeholder)
// Function to get a random collage image
function getRandomCollage() {
	const totalCollages = 7; // Total number of collage images
	const randomNumber = Math.floor(Math.random() * totalCollages) + 1;
	return `Images/collage${randomNumber}.png`;
}

function showCollage() {
	hideGifts();

	// Set random collage image
	const randomCollage = getRandomCollage();
	collageImage.src = randomCollage;
	modalImage.src = randomCollage;
	// 1. Wait for fade to finish, then show the collage
	setTimeout(() => {
		if (collageGrid.classList.contains("fade-out")) {
			collageGrid.classList.remove("fade-out");
		}
		collageGrid.classList.add("fade-in");
		collageGrid.classList.remove("hide");
	}, 1000);
}

// Modal functions for collage
function openCollageModal() {
	modal.classList.remove("hide");
}

function closeCollageModal() {
	modal.classList.add("fade-out");

	setTimeout(() => {
		modal.classList.add("hide");
		modal.classList.remove("fade-out");
	}, 300);
}

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
	const modal = document.getElementById("collageModal");
	if (event.target === modal) {
		closeCollageModal();
	}
});

// 6. Gift 3: Flower Downpour and Valentine Package
function startFlowers() {
	hideGifts();

	// Wait for fade to finish, then show the package
	setTimeout(() => {
		if (valentinePackage.classList.contains("fade-out")) {
			valentinePackage.classList.remove("fade-out");
		}
		valentinePackage.classList.add("fade-in");
		valentinePackage.classList.remove("hide");
		startKissingAnimation();
	}, 1000);

	//Start the flower animation
	flowerIntervalId = setInterval(() => {
		const flower = document.createElement("div");
		flower.classList.add("flower");
		flower.innerText = ["🌸", "🌹", "🌷", "🌻", "🌺"][
			Math.floor(Math.random() * 5)
		];
		flower.style.left = Math.random() * 100 + "vw";
		flower.style.animationDuration = Math.random() * 2 + 3 + "s";
		document.body.appendChild(flower);

		// Clean up memory
		setTimeout(() => flower.remove(), 5000);
	}, 300);

	function startKissingAnimation() {
		if (!valentinePackage) return;

		if (valentinePackage.classList.contains("hide")) return;

		const kisses = ["💋", "💋", "💖", "😘", "💕"];
		if (window.kissInterval) {
			clearInterval(window.kissInterval);
		}

		window.kissInterval = setInterval(() => {
			if (valentinePackage.classList.contains("hide")) {
				clearInterval(window.kissInterval);
				window.kissInterval = null;
				return;
			}

			const kiss = document.createElement("div");
			kiss.classList.add("kiss");

			kiss.textContent = kisses[Math.floor(Math.random() * kisses.length)];

			const valentinePackageRect = valentinePackage.getBoundingClientRect();
			const randomLeft = Math.random() * (valentinePackageRect.width - 80) + 20;
			kiss.style.left = randomLeft + "px";
			const randomTopPercent = Math.random() * 100;
			kiss.style.top = randomTopPercent + "%";
			kiss.style.transform = `rotate(${(Math.random() - 0.5) * 40}deg)`;
			const duration = Math.random() * 4 + 4;
			kiss.style.animationDuration = duration + "s";

			kiss.style.animationDelay = Math.random() * 1.5 + "s";

			if (Math.random() > 0.4) {
				kiss.classList.add("wobble");
			}

			valentinePackage.appendChild(kiss);

			setTimeout(
				() => {
					if (kiss.parentNode) kiss.remove();
				},
				(duration + 1.5) * 1000,
			);
		}, 600);
	}

	function stopKissingAnimation() {
		if (window.kissInterval) {
			clearInterval(window.kissInterval);
			window.kissInterval = null;
		}

		document.querySelectorAll(".kiss").forEach((k) => k.remove());
	}
}