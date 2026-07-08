// --- ១. កូដ Matrix ថ្មី ---
const mCanvas = document.getElementById("matrixCanvas");
const mCtx = mCanvas.getContext("2d");

const fCanvas = document.getElementById("fireworksCanvas");
const fCtx = fCanvas.getContext("2d");

const letters = "HAPPYBIRTHDAYTOLEAKCHOLLANA";
const chars = letters.split("");
const fontSize = 16;
let columns = 0;
let drops = [];

function initMatrix() {
  columns = mCanvas.width / fontSize;
  drops = [];
  for (let i = 0; i < columns; i++) {
    // កែកំហុសត្រង់នេះ: ចែកនឹង fontSize ដើម្បីឱ្យអក្សរចេញមកភ្លាមៗមិនបាត់ទៅណា
    drops[i] = (Math.random() * mCanvas.height) / fontSize;
  }
}

function resizeCanvases() {
  mCanvas.width = window.innerWidth;
  mCanvas.height = window.innerHeight;
  fCanvas.width = window.innerWidth;
  fCanvas.height = window.innerHeight;
  initMatrix();
}
window.addEventListener("resize", resizeCanvases);
resizeCanvases();

function drawMatrix() {
  mCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
  mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);
  mCtx.fillStyle = "#ff2da0";
  mCtx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    mCtx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
let matrixInterval = setInterval(drawMatrix, 33);

// --- ២. កូដសម្រាប់កាំជ្រួច ---
let particles = [];
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = { x: (Math.random() - 0.5) * 15, y: (Math.random() - 0.5) * 15 };
    this.alpha = 1;
    this.friction = 0.95;
    this.gravity = 0.2;
  }
  draw() {
    fCtx.save();
    fCtx.globalAlpha = this.alpha;
    fCtx.beginPath();
    fCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    fCtx.fillStyle = this.color;
    fCtx.fill();
    fCtx.restore();
  }
  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

function createFirework() {
  const x = fCanvas.width / 2;
  const y = fCanvas.height / 2;
  const colors = ["#ff3366", "#ff0000", "#ffb3d9", "#ffffff", "#ffd700"];
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

function animateFireworks() {
  requestAnimationFrame(animateFireworks);
  fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);
  particles.forEach((particle, index) => {
    if (particle.alpha > 0) {
      particle.update();
      particle.draw();
    } else {
      particles.splice(index, 1);
    }
  });
}
animateFireworks();

// --- ៣. លំដាប់លំដោយរាប់លេខ និងបង្ហាញសារ ---
setTimeout(() => {
  startCountdown();
}, 3000);

function startCountdown() {
  let count = 3;
  const countdownElement = document.getElementById("countdown");
  const happyText = document.getElementById("happy-text");
  const birthdayText = document.getElementById("birthday-text");
  const toText = document.getElementById("to-text");
  const chollanaText = document.getElementById("chollana-text");
  const heartShape = document.getElementById("heart-shape");
  const stickerHbd = document.getElementById("sticker-hbd"); 
  const welcomeScreen = document.getElementById("welcome-screen");
  const bookScreen = document.getElementById("book-screen"); // ទាញយកសៀវភៅ

  countdownElement.style.display = "block";
  countdownElement.innerText = count;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdownElement.innerText = count;
    } else {
      clearInterval(timer);
      countdownElement.style.display = "none";

      createFirework();
      if (happyText) happyText.style.display = "block";

      setTimeout(() => {
        if (happyText) happyText.style.display = "none";
        createFirework();
        if (birthdayText) birthdayText.style.display = "block";

        setTimeout(() => {
          if (birthdayText) birthdayText.style.display = "none";
          if (toText) toText.style.display = "block";

          setTimeout(() => {
            if (toText) toText.style.display = "none";
            if (chollanaText) chollanaText.style.display = "block";
            createFirework();
            setTimeout(() => createFirework(), 500);

            setTimeout(() => {
              if (chollanaText) chollanaText.style.display = "none";
              if (heartShape) heartShape.style.display = "block";
              createFirework();
              setTimeout(() => createFirework(), 400);

              setTimeout(() => {
                if (heartShape) heartShape.style.display = "none";
                if (stickerHbd) stickerHbd.style.display = "block";
                createFirework();

                setTimeout(() => {
                  if (stickerHbd) stickerHbd.style.display = "none";
                  
                  clearInterval(matrixInterval);
                  mCanvas.style.display = "none";
                  fCanvas.style.display = "none";
                  document.body.style.backgroundColor = "black";
                  
                  if (welcomeScreen) welcomeScreen.style.display = "flex";

                  setTimeout(() => {
                    // លាក់នំខេក ហើយបើកសៀវភៅ 3D
                    if (welcomeScreen) welcomeScreen.style.display = "none";
                    if (bookScreen) bookScreen.style.display = "flex";
                  }, 10000); 

                }, 2500);
              }, 2500);
            }, 2500);
          }, 1200);
        }, 1500);
      }, 1500);
    }
  }, 1000);
}


// --- ៤. មុខងារសម្រាប់ត្រឡប់ទំព័រសៀវភៅ 3D និងប្តូរអក្សរ ---
const pages = document.querySelectorAll('.page');
const book = document.querySelector('.book'); 
const bookMessage = document.getElementById('book-message'); // ទាញយកកន្លែងអក្សរខាងលើ
let currentPage = 0;

// បញ្ជីអក្សរជូនពរដែលត្រូវប្តូរទៅតាមទំព័រនីមួយៗ (បន្ថែមពាក្យជូនពរផ្អែមល្ហែម)
const messages = [
  "កាដូពិសេសសម្រាប់អូន 🎁", 
  "រីករាយថ្ងៃកំណើតណា៎ ម្ចាស់បេះដូងរបស់បង 🎂", 
  "អនុស្សាវរីយ៍ដ៏ផ្អែមល្ហែមរបស់យើង... ❤️", 
  "អរគុណដែលតែងតែនៅក្បែរ និងយល់ចិត្តបង... ✨",
  "ជូនពរអូនសម្រស់កាន់តែស្អាត និងមានក្ដីសុខរាល់ថ្ងៃ 🥰",
  "សូមឱ្យក្តីស្រលាញ់ពួកយើងស្ថិតស្ថេរជារៀងរហូត 💕",
  "បងស្រលាញ់អូនខ្លាំងបំផុត! I Love You 3000 💖"
];

pages.forEach((page, index) => {
  page.style.zIndex = pages.length - index;

  page.addEventListener('click', () => {
    
    if (currentPage === index) {
      page.classList.add('flipped');
      setTimeout(() => { page.style.zIndex = index; }, 500); 
      currentPage++;
    } 
    else if (currentPage === index + 1) {
      page.classList.remove('flipped');
      page.style.zIndex = pages.length - index;
      currentPage--;
    }
    
    if (currentPage > 0) {
      book.classList.add('is-open'); 
    } else {
      book.classList.remove('is-open'); 
    }

    // --- មុខងារប្តូរអក្សរនៅខាងលើសៀវភៅដោយស្វ័យប្រវត្តិ ---
    if (bookMessage) {
      // ធ្វើឱ្យអក្សររលត់បន្តិចរួចភ្លឺមកវិញពេលប្តូរ
      bookMessage.style.opacity = 0;
      setTimeout(() => {
        // ធានាថាមិន error បើចំនួន page ច្រើនជាងអត្ថបទក្នុង array
        bookMessage.innerText = messages[currentPage] || "I Love You! ❤️";
        bookMessage.style.opacity = 1;
      }, 300); // ប្តូរអក្សរក្រោយ 0.3 វិនាទី
    }
  });
});