const movingImage = document.getElementById('astronauta');
let moveUp = true;

function animateImage() {
  const currentPosition = parseFloat(getComputedStyle(movingImage).top);

  if (moveUp) {
    movingImage.style.top = (currentPosition - 50) + 'px';
  } else {
    movingImage.style.top = (currentPosition + 50) + 'px';
  }

  moveUp = !moveUp;
}

setInterval(animateImage, 2000);