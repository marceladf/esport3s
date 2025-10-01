// ====== ÍCONE DO MENU ANIMADO (DESKTOP) ======
const icons = ["icons/futebol-icone.png", "icons/pneu-icone.png", "icons/tenis-icone.png"];
let i = 0;
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

// Troca o ícone automaticamente (apenas em desktop)
let iconInterval;

function startIconAnimation() {
  // Só anima em desktop (tela maior que 768px)
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

// Inicia a animação
startIconAnimation();

// ====== MENU MOBILE (TOGGLE) ======
menuIcon.addEventListener('click', () => {
  // Só funciona como toggle em mobile
  if (window.innerWidth <= 768) {
    menu.classList.toggle('active');
    
    // Opcional: adicionar overlay escuro
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.classList.add('menu-overlay');
      document.body.appendChild(overlay);
      
      // Fecha o menu ao clicar no overlay
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
      const headerHeight = 70; // altura do header fixo
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ====== CARROSSEL DE ÍDOLOS ======
function initIdoloCarrossel(container) {
  const slides = container.querySelectorAll('.idolo-slide');
  const prevBtn = container.querySelector('.idolo-prev');
  const nextBtn = container.querySelector('.idolo-next');
  const indicatorsContainer = container.querySelector('.idolo-indicators');
  
  let currentIndex = 0;
  const totalSlides = slides.length;

  // Função para atualizar o slide visível
  function updateSlide(newIndex) {
    // Garante o loop
    currentIndex = (newIndex + totalSlides) % totalSlides;

    // Remove 'active' de todos e adiciona no atual
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
    
    // Atualiza os indicadores
    updateIndicators();
  }
  
  // Cria e atualiza os indicadores (bolinhas)
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

  // Adiciona Event Listeners nos botões
  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
  }
  
  // Inicializa o carrossel
  updateSlide(0); 
}

// Inicializa todos os carrosséis de ídolos na página
document.querySelectorAll('.idolo-carrossel-container').forEach(initIdoloCarrossel);

