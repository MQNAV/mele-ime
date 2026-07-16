// === ZAMAN KİLİDİ ===
const unlockDate = new Date("2026-07-18T00:00:00+03:00");

if(Date.now() < unlockDate.getTime()){
    window.location.replace("countdown.html");
}

const startBtn = document.getElementById("startBtn");
const loadingScreen = document.getElementById("loading-screen");
const mainContent = document.getElementById("main-content");
const bgMusic = document.getElementById("bgMusic");

mainContent.style.display = "none";

const playlist = [
    { title:"Olur Ya", file:"assets/music/olur-ya.mp3" },
    { title:"Liselim", file:"assets/music/liselim.mp3" },
    { title:"Sensiz Olmaz", file:"assets/music/sensiz-olmaz.mp3" },
    { title:"Varsa Yoksa Sen", file:"assets/music/varsa-yoksa-sen.mp3" },
    { title:"Ankara Rüzgarı", file:"assets/music/ankara-ruzgari.mp3" },
    { title:"Çıt Çıt Çedene", file:"assets/music/cit-cit-cedene.mp3" }
];

let currentSong = 0;

const trackName = document.getElementById("trackName");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

function playSong(index){
    currentSong = (index + playlist.length) % playlist.length;

    bgMusic.src = playlist[currentSong].file;
    trackName.textContent = playlist[currentSong].title;
    bgMusic.volume = 0.45;

    bgMusic.play().then(() => {
        playPauseBtn.textContent = "⏸";
    }).catch(() => {
        playPauseBtn.textContent = "▶";
    });
}

startBtn.addEventListener("click", () => {
    playSong(0);

    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "1.2s";

    setTimeout(() => {
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";

        updateCounter();
        startGalleryAnimation();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 1200);
});

function startGalleryAnimation() {
    const galleryImages = document.querySelectorAll(".gallery-grid img");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05
        }
    );

    galleryImages.forEach((img, index) => {
        img.style.transitionDelay = `${index * 60}ms`;
        observer.observe(img);
    });
}

function updateCounter() {
    const startDate = new Date(2024, 7, 14, 0, 0, 0);
    const now = new Date();
    const difference = now - startDate;

    document.getElementById("days").textContent =
        Math.floor(difference / 86400000);

    document.getElementById("hours").textContent =
        Math.floor((difference % 86400000) / 3600000);

    document.getElementById("minutes").textContent =
        Math.floor((difference % 3600000) / 60000);

    document.getElementById("seconds").textContent =
        Math.floor((difference % 60000) / 1000);
}

updateCounter();
setInterval(updateCounter, 1000);

const letter = `Tanışmamız da, ilişkimiz de çok olaylı ve sancılı oldu.

Ama milyonlarca ihtimalin içinden sana rastlayacak ve senin de ilgini çekebilecek kadar şanslıydım.

Tüm bu sancıların bir gün, düğünümüzde son bulmasını ve sonsuz bir huzura ermemizi diliyorum.

İyi ki doğdun.
İyi ki o okula gittin.
İyi ki o hikâyene yanıt verdim.
İyi ki o gün evime kadar gelip doğum günümü kutladın.

Bu fotoğrafları seçerken bile sana tekrar tekrar âşık oldum ve neyle karşı karşıya olduğumu kendime yeniden hatırlattım.

Yaşlanmaktan ne kadar korksan da, ileride torunlarımızı severken de seni böyle göreceğim.

Son nefesimi verirken görmek isteyeceğim tek yüz, yine senin yüzün olacak.

İYİ Kİ DOĞDUN GÜZELİM.
İYİ Kİ VARSIN.

ÇATLAK KARIM BENİM. ❤️`;

let letterStarted = false;

function startLetterAnimation() {
    if (letterStarted) return;
    letterStarted = true;

    const letterText = document.getElementById("letterText");
    let index = 0;

    const typeLetter = setInterval(() => {
        letterText.textContent += letter[index];
        index++;

        if (index >= letter.length) {
            clearInterval(typeLetter);
        }
    }, 28);
}

const letterSection = document.querySelector(".letter-section");

const letterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startLetterAnimation();
            letterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

letterObserver.observe(letterSection);

const giftBtn = document.getElementById("giftBtn");
const finalMessage = document.getElementById("finalMessage");

if (giftBtn && finalMessage) {
    giftBtn.addEventListener("click", () => {
        giftBtn.style.display = "none";
        finalMessage.classList.add("show");
        createConfetti();
    });

}



function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("span");

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-20px";
        confetti.style.fontSize = Math.random() * 18 + 12 + "px";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";
        confetti.textContent = ["❤️","✨","🎉","🌸"][Math.floor(Math.random() * 4)];

        document.body.appendChild(confetti);

        const duration = Math.random() * 2500 + 2500;

        confetti.animate(
            [
                {
                    transform:"translateY(0) rotate(0deg)",
                    opacity:1
                },
                {
                    transform:`translateY(110vh) rotate(${Math.random() * 720}deg)`,
                    opacity:0
                }
            ],
            {
                duration:duration,
                easing:"linear"
            }
        );

        setTimeout(() => {
            confetti.remove();
        }, duration);
    }

}nextBtn.addEventListener("click", () => {
    playSong(currentSong + 1);
});

prevBtn.addEventListener("click", () => {
    playSong(currentSong - 1);
});

playPauseBtn.addEventListener("click", () => {
    if(bgMusic.paused){
        bgMusic.play();
        playPauseBtn.textContent = "⏸";
    }else{
        bgMusic.pause();
        playPauseBtn.textContent = "▶";
    }
});

muteBtn.addEventListener("click", () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? "🔇" : "🔊";
});

bgMusic.addEventListener("ended", () => {
    playSong(currentSong + 1);
});

const galleryImages = Array.from(
    document.querySelectorAll(".gallery-grid img")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let currentImageIndex = 0;

function openLightbox(index){
    currentImageIndex = index;
    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeLightboxWindow(){
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
}

function showNextImage(){
    currentImageIndex =
        (currentImageIndex + 1) % galleryImages.length;

    lightboxImage.src = galleryImages[currentImageIndex].src;
}

function showPreviousImage(){
    currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length)
        % galleryImages.length;

    lightboxImage.src = galleryImages[currentImageIndex].src;
}

galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
        openLightbox(index);
    });
});

closeLightbox.addEventListener("click", closeLightboxWindow);
nextImage.addEventListener("click", showNextImage);
prevImage.addEventListener("click", showPreviousImage);

lightbox.addEventListener("click", (event) => {
    if(event.target === lightbox){
        closeLightboxWindow();
    }
});

document.addEventListener("keydown", (event) => {
    if(!lightbox.classList.contains("show")) return;

    if(event.key === "Escape"){
        closeLightboxWindow();
    }

    if(event.key === "ArrowRight"){
        showNextImage();
    }

    if(event.key === "ArrowLeft"){
        showPreviousImage();
    }
});

let lastHeartTime = 0;

document.addEventListener("mousemove", (event) => {
    const now = Date.now();

    if(now - lastHeartTime < 90) return;

    lastHeartTime = now;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.25 ? "❤️" : "✨";

    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";
    heart.style.fontSize = (12 + Math.random() * 10) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1600);
});

const introLines = document.querySelectorAll(".intro-line");
const introStartBtn = document.getElementById("startBtn");

introLines.forEach((line, index) => {
    setTimeout(() => {
        line.classList.add("show");
    }, index * 1400);
});

setTimeout(() => {
    introStartBtn.classList.add("show");
}, introLines.length * 1400);

document.addEventListener("DOMContentLoaded", () => {
    const passwordScreen = document.getElementById("passwordScreen");
    const passwordInput = document.getElementById("passwordInput");
    const passwordBtn = document.getElementById("passwordBtn");
    const passwordError = document.getElementById("passwordError");
    const passwordCard = document.querySelector(".password-card");

    const correctPassword = "14082024";

    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === correctPassword) {
            passwordError.classList.remove("show");
            passwordScreen.classList.add("unlocked");

            setTimeout(() => {
                passwordScreen.remove();
            }, 800);
        } else {
            passwordError.classList.add("show");
            passwordCard.classList.remove("shake");

            void passwordCard.offsetWidth;

            passwordCard.classList.add("shake");
            passwordInput.value = "";
            passwordInput.focus();
        }
    }

    passwordBtn.addEventListener("click", checkPassword);

    passwordInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkPassword();
        }
    });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then(() => {
                console.log("Uygulama modu hazır.");
            })
            .catch((error) => {
                console.error("Service worker hatası:", error);
            });
    });
}
