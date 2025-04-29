// Choose Width / Height / Characters
const width = 160;
const height = 60;
const charset = ['.', ':', '+', '*', 'o', 'O', '#', '%', '@', '$'];
const spiralEl = document.getElementById("spiral");

const start = performance.now();
let delay = 0;
let stopAnimation = false;

// Choose your Text / Logo (important must be @-symbols only)
const asciiName = [
  "@@@@@   @@@@@           @@@@  @@@@                             ",
  " @@@     @@@             @@@   @@@                             ",
  " @@@     @@@   @@@@@@@   @@@   @@@   @@@@@@@                   ",
  " @@@@@@@@@@@  @@@   @@@  @@@   @@@  @@@   @@@                  ",
  " @@@     @@@  @@@@@@@@   @@@   @@@  @@@   @@@                  ",
  " @@@     @@@  @@@        @@@   @@@  @@@   @@@                  ",
  "@@@@@   @@@@@  @@@@@@@  @@@@@ @@@@@  @@@@@@@                   ",
  "                                                               ",
  "                                                               ",
  "                                                               ",
  "@@@@@@   @@@@@@   @@@@@@                   @@@@        @@@  @@@",
  "  @@@      @@@     @@@                      @@@        @@@  @@@",
  "   @@@    @@@@@   @@@    @@@@@@@  @@@ @@@@  @@@   @@@@@@@@  @@@",
  "    @@@  @@@ @@@ @@@    @@@   @@@  @@@@@    @@@  @@@   @@@  @@@",
  "     @@@@@@   @@@@@     @@@   @@@  @@@      @@@  @@@   @@@     ",
  "      @@@@     @@@      @@@   @@@  @@@      @@@  @@@   @@@  @@@",
  "       @@      @@        @@@@@@@  @@@@@    @@@@@  @@@@@@@@  @@@"
];

function renderFrame(t) {
  const currentTime = (performance.now() - start) / 1000;
  const scale = 0.04;

  if (currentTime >= 1 && delay < 70) {
    delay = Math.min(70, (currentTime - 1) * 15);
  }

  if (currentTime >= 5 && !stopAnimation) {
    stopAnimation = true;
  }

  let output = '';

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const fx = (x - width / 2) * scale;
      const fy = (y - height / 2) * scale;
      const r = Math.sqrt(fx * fx + fy * fy) + 0.0001;
      const theta = Math.atan2(fy, fx);
      const swirl = Math.sin(8 * theta - r * 3 - t * 0.0015);
      const baseNoise = (Math.random() - 0.5) * 0.2;
      const value = swirl + baseNoise;

      const textY = y - Math.floor((height - asciiName.length) / 2);
      const textX = x - Math.floor((width - asciiName[0].length) / 2);
      const charFromText = (asciiName[textY] && asciiName[textY][textX]) || null;

      if (charFromText === '@') {
        if (currentTime < 1) {
          let index = Math.floor((value + 1) / 2 * (charset.length - 1));
          index = Math.max(0, Math.min(index, charset.length - 1));
          output += charset[index];
        } else {
          const revealProgress = Math.min(1, (currentTime - 1) / 1.5);
          const disappear = Math.random() < revealProgress ** 2;
          output += disappear ? ' ' : charset[Math.floor((value + 1) / 2 * (charset.length - 1))];
        }
      } else {
        let index = Math.floor((value + 1) / 2 * (charset.length - 1));
        index = Math.max(0, Math.min(index, charset.length - 1));
        output += charset[index];
      }
    }
    output += '\n';
  }

  spiralEl.textContent = output;

  if (!stopAnimation) {
    setTimeout(() => requestAnimationFrame(renderFrame), delay);
  }
}

function animate(t) {
  renderFrame(t);
}

animate(0);