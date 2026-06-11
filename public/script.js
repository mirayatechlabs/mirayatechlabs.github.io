document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });

  // Scroll reveal: gli elementi .reveal entrano quando diventano visibili
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Chatbot Logic
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotWindow = document.getElementById('chatbot-window');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotInput = document.getElementById('chatbot-input-field');
  const chatbotBody = document.getElementById('chatbot-body');

  if (chatbotToggle && chatbotWindow && chatbotClose) {
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.remove('hidden');
      chatbotToggle.style.display = 'none';
    });

    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.add('hidden');
      chatbotToggle.style.display = 'flex';
    });

    const sendMessage = () => {
      const text = chatbotInput.value.trim();
      if (!text) return;
      
      // Add user message
      const userMsg = document.createElement('p');
      userMsg.className = 'user-msg';
      userMsg.textContent = text;
      chatbotBody.appendChild(userMsg);
      chatbotInput.value = '';
      chatbotBody.scrollTop = chatbotBody.scrollHeight;

      // Simulate bot reply
      setTimeout(() => {
        const botMsg = document.createElement('p');
        botMsg.className = 'bot-msg';
        botMsg.textContent = "Grazie per il tuo messaggio! Un nostro esperto ti risponderà a breve.";
        chatbotBody.appendChild(botMsg);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
      }, 1000);
    };

    if (chatbotSend && chatbotInput) {
      chatbotSend.addEventListener('click', sendMessage);
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    }
  }
});
