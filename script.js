// ====== ÍCONE DO MENU ANIMADO (DESKTOP) ======
const icons = ["icons/futebol-icone.png", "icons/pneu-icone.png", "icons/tenis-icone.png"];
let i = 0;
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

// Troca o ícone automaticamente (apenas em desktop)
let iconInterval;

function startIconAnimation() {
  if (window.innerWidth > 768) {
    iconInterval = setInterval(() => {
      i = (i + 1) % icons.length;
      menuIcon.src = icons[i];
    }, 2000);
  }
}

function stopIconAnimation() {
  clearInterval(iconInterval);
}
startIconAnimation();

// ====== MENU MOBILE (TOGGLE) ======
menuIcon.addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    menu.classList.toggle('active');
    
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.classList.add('menu-overlay');
      document.body.appendChild(overlay);
      
      overlay.addEventListener('click', () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
      });
    }
    overlay.classList.toggle('active');
  }
});

// Fecha o menu ao clicar em um link (mobile)
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      menu.classList.remove('active');
      const overlay = document.querySelector('.menu-overlay');
      if (overlay) overlay.classList.remove('active');
    }
  });
});

// Ajusta o menu quando redimensiona a tela
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menu.classList.remove('active');
    const overlay = document.querySelector('.menu-overlay');
    if (overlay) overlay.classList.remove('active');
    stopIconAnimation();
    startIconAnimation();
  } else {
    stopIconAnimation();
  }
});

// ====== SCROLL SUAVE PARA ÂNCORAS ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = 70;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ====== CARROSSEL PRINCIPAL (BANNER) ======
const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const totalSlides = slideItems.length;

function showSlide(i) {
  index = (i + totalSlides) % totalSlides;
  slides.style.transform = `translateX(${-index * 100}%)`;
}

// Botões do carrossel
prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Autoplay (passa a cada 5 segundos)
setInterval(() => {
  showSlide(index + 1);
}, 5000);

// ====== CARROSSEL DE ÍDOLOS ======
function initIdoloCarrossel(container) {
  const slides = container.querySelectorAll('.idolo-slide');
  const prevBtn = container.querySelector('.idolo-prev');
  const nextBtn = container.querySelector('.idolo-next');
  const indicatorsContainer = container.querySelector('.idolo-indicators');
  
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlide(newIndex) {
    currentIndex = (newIndex + totalSlides) % totalSlides;
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
    updateIndicators();
  }
  
  function updateIndicators() {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('idolo-indicator');
      if (i === currentIndex) {
        indicator.classList.add('active');
      }
      indicator.addEventListener('click', () => updateSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
  }
  
  updateSlide(0); 
}

document.querySelectorAll('.idolo-carrossel-container').forEach(initIdoloCarrossel);

// ====== SISTEMA DE ABAS (REGRAS) ======
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    button.classList.add('active');
    
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// ====== FAVICON ANIMADO ======
const faviconIcons = ["icons/futebol-icone.png", "icons/pneu-icone.png", "icons/tenis-icone.png"];
let faviconIndex = 0;
const favicon = document.getElementById("favicon");

setInterval(() => {
  faviconIndex = (faviconIndex + 1) % faviconIcons.length;
  favicon.href = faviconIcons[faviconIndex];
}, 2000); // Troca a cada 2 segundos
