// --- ១. មុខងារចុចដើម្បីចាប់ផ្តើមអ្វីៗទាំងអស់ (Start everything on click) ---
let isStarted = false;
let matrixInterval;

const startScreen = document.getElementById("start-screen");
const bgMusic = document.getElementById("bgMusic");

// ពេលគាត់ចុចលើអេក្រង់
startScreen.addEventListener('click', () => {
  if (isStarted) return;
  isStarted = true;

  // 1. លាក់ផ្ទាំងចុច
  startScreen.style.display = "none";

  // 2. ចាក់ភ្លេង
  if (bgMusic) {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(e => console.log("Music play error:", e));
  }

  // 3. ចាប់ផ្តើម Matrix
  resizeCanvases();
  matrixInterval = setInterval(drawMatrix, 33);

  // 4. ចាប់ផ្តើមរាប់លេខ ក្រោយ Matrix ធ្លាក់បាន 3 វិនាទី
  setTimeout(() => {
    startCountdown();
  }, 3000);
});


// --- ២. កូដ Matrix ---
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


// --- ៣. កូដសម្រាប់កាំជ្រួច ---
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


// --- ៤. លំដាប់លំដោយរាប់លេខ និងបង្ហាញសារ ---
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
  const bookScreen = document.getElementById("book-screen"); 

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


// --- ៥. មុខងារសម្រាប់ត្រឡប់ទំព័រសៀវភៅ 3D និងប្តូរអក្សរ ---
const pages = document.querySelectorAll('.page');
const book = document.querySelector('.book'); 
const bookMessage = document.getElementById('book-message'); 
let currentPage = 0;

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

      // បើសិនជាគាត់ចុចដល់ទំព័រចុងក្រោយអស់ហើយ
      if (currentPage === pages.length) {
        setTimeout(triggerFinalClimax, 100); // រង់ចាំ 2.5 វិនាទី រួចលោតទៅវគ្គបេះដូង
      }

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

    if (bookMessage) {
      bookMessage.style.opacity = 0;
      setTimeout(() => {
        bookMessage.innerText = messages[currentPage] || "I Love You! ❤️";
        bookMessage.style.opacity = 1;
      }, 300);
    }
  });
});
// ==========================================
// មុខងារទី ១៖ បង្កើតរូបភាព ៤០ សន្លឹក រៀបជារាងបេះដូង
// ==========================================
function setupHeartGallery() {
  const container = document.getElementById('heart-gallery-container');
  const totalImages = 45; // ចំនួនរូបភាពដែលត្រូវយកមកផ្គុំ (អ្នកអាចថែមថយបាន)
  
  for (let i = 0; i < totalImages; i++) {
    const img = document.createElement('img');
    // វិលជុំយករូបភាពពី 1 ដល់ 10
    const imgIndex = (i % 10) + 1; 
    img.src = `images/${imgIndex}.png`;
    img.className = 'dynamic-gallery-img';
    
    // រូបមន្តគណិតវិទ្យាសម្រាប់គូសរាងបេះដូង (Math Heart Equation)
    const t = (i / totalImages) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    
    // បម្លែងទីតាំង x, y ឱ្យទៅជាភាគរយ (Percentage) ដើម្បីឱ្យវានៅចំកណ្តាល Container
    const leftPos = 50 + (x / 16) * 45; // គុណនឹង 45 ដើម្បីកុំឱ្យធំពេកលៀនគែម
    const topPos = 45 + (y / 17) * 45;  // ប្រើ 45 ដើម្បីរុញបេះដូងឡើងលើបន្តិច
    
    // រក្សាទុកទីតាំងគោលដៅ ពេលដល់ម៉ោងទើបបញ្ជាឱ្យហោះទៅ
    img.dataset.targetLeft = `${leftPos}%`;
    img.dataset.targetTop = `${topPos}%`;
    
    // ធ្វើឱ្យរូបនីមួយៗហោះចេញមកមុនក្រោយគ្នា (Delay)
    img.style.transitionDelay = `${i * 0.04}s`; 
    
    container.appendChild(img);
  }
}
// ហៅមុខងារនេះឱ្យវាត្រៀមខ្លួនជាស្រេចពេល Load វេបសាយភ្លាម
setupHeartGallery();


// ==========================================
// មុខងារទី ២៖ បង្កើតមេអំបៅ ផ្កាយ និងបេះដូងហោះ
// ==========================================
function startFloatingMagic() {
  const container = document.getElementById('floating-particles-container');
  const emojis = ['🦋', '✨', '🌟', '💖', '💕'];
  
  // បង្កើតរបស់ហោះរៀងរាល់ ៤០០ មីលីវិនាទី
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'floating-item';
    el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    // កំណត់ទីតាំងផ្តើម ល្បឿន និងទំហំខុសៗគ្នាដោយចៃដន្យ
    el.style.left = `${Math.random() * 100}%`;
    el.style.fontSize = `${Math.random() * 15 + 15}px`;
    el.style.animationDuration = `${Math.random() * 4 + 4}s`; // ល្បឿនហោះ 4s ទៅ 8s
    
    container.appendChild(el);
    
    // លុបវាចោលវិញក្រោយហោះផុត ដើម្បីកុំឱ្យទូរស័ព្ទគាំង
    setTimeout(() => {
      el.remove();
    }, 8000);
  }, 400);
}


// ==========================================
// មុខងារទី ៣៖ បញ្ជាឱ្យអ្វីៗទាំងអស់ដំណើរការនៅវគ្គបញ្ចប់
// ==========================================
function triggerFinalClimax() {
  const bookScreen = document.getElementById('book-screen');
  const climaxScreen = document.getElementById('heart-climax-screen');
  const coupleImg = document.querySelector('.center-couple');
  const climaxText = document.querySelector('.climax-text');

  // 1. ធ្វើឱ្យសៀវភៅព្រាលបាត់ទៅវិញ
  bookScreen.style.transition = "opacity 1.5s ease";
  bookScreen.style.opacity = "0";

  setTimeout(() => {
    // 2. លាក់សៀវភៅ បង្ហាញផ្ទាំងថ្មី
    bookScreen.style.display = "none";
    climaxScreen.style.display = "flex";
    
    // 3. ចាប់ផ្តើមបញ្ចេញមេអំបៅ និងផ្កាយហោះ
    startFloatingMagic();

    setTimeout(() => {
      climaxScreen.style.opacity = "1";
      
      // 4. បញ្ជាឱ្យរូបភាពទាំង ៤០ សន្លឹកហោះចេញពីកណ្តាលទៅរៀបជារាងបេះដូង
      const galleryImgs = document.querySelectorAll('.dynamic-gallery-img');
      galleryImgs.forEach(img => {
        img.style.left = img.dataset.targetLeft;
        img.style.top = img.dataset.targetTop;
        img.style.transform = 'translate(-50%, -50%) scale(1)';
        img.style.opacity = '1';
      });

      // 5. លោតរូបគូស្នេហ៍ចំកណ្តាលតាមក្រោយ (Delay 2 វិនាទី)
      setTimeout(() => {
        coupleImg.style.transform = 'translate(-50%, -50%) scale(1)';
        coupleImg.style.opacity = '1';
      }, 2000);

      // 6. បង្ហាញអក្សរជូនពរខាងក្រោម (Delay 3 វិនាទី)
      setTimeout(() => {
        climaxText.style.opacity = '1';
        climaxText.style.transform = 'translateY(0)';
      }, 3000);

    }, 100);
  }, 1500);
}