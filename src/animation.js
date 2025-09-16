import confetti from 'canvas-confetti';

export function launchBalloonBlast() {
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.6 },
    shapes: ['circle'],
    colors: ['#ff4d4d', '#ffcc00', '#66ff66', '#66ccff'],
    scalar: 1.2,
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { y: 0.4 },
      shapes: ['circle'],
      colors: ['#ff4d4d', '#ffcc00', '#66ff66', '#66ccff'],
      scalar: 1.5,
    });
  }, 300);
}

export function floatBalloons() {
  for (let i = 0; i < 50; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = `${Math.random() * 90 + 5}%`;
    document.body.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 3000);
  }
}