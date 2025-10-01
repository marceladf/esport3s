const icons = ["icons/futebol-icone.png", "icons/pneu-icone.png", "icons/tenis-icone.png"];
let i = 0;
const menuIcon = document.getElementById("menu-icon");

setInterval(() => {
  i = (i + 1) % icons.length;
  menuIcon.src = icons[i];
}, 2000);

const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const totalSlides = slideItems.length;

function showSlide(i) {
  index = (i + totalSlides) % totalSlides; // loop infinito
  slides.style.transform = `translateX(${-index * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// autoplay opcional (remova se não quiser automático)
setInterval(() => {
  showSlide(index + 1);
}, 5000);

// ====================================
// 4. CARROSSEL DE ÍDOLOS (Mini-carrossel dentro do prog-card)
// ====================================

function initIdoloCarrossel(progCard) {
  const slides = progCard.querySelectorAll('.idolo-slide');
  const prevBtn = progCard.querySelector('.prev-idolo');
  const nextBtn = progCard.querySelector('.next-idolo');
  const indicatorsContainer = progCard.querySelector('.idolo-indicators');
  
  let currentIndex = 0;
  const totalSlides = slides.length;

  // 1. Função que atualiza o slide visível
  function updateSlide(newIndex) {
    // Garante o loop
    currentIndex = (newIndex + totalSlides) % totalSlides;

    // Remove 'active' de todos e adiciona no atual
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
    
    // Atualiza os indicadores
    updateIndicators();
  }
  
  // 2. Cria e atualiza os indicadores (bolinhas)
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

  // 3. Adiciona Event Listeners nos botões
  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
  }
  
  // Inicializa o carrossel (garante que o slide 0 esteja ativo e os indicadores criados)
updateSlide(0); 
}

// Inicializa todos os carrosséis na página (Futebol, Tênis, F1)
document.querySelectorAll('.prog-card').forEach(initIdoloCarrossel);

