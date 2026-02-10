// Menu Hamburguer
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Troca entre Login e Cadastro
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

if (showRegisterLink && showLoginLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
}

// Validação do formulário de newsletter
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const nomeError = document.getElementById('nome-error');
        const emailError = document.getElementById('email-error');
        const messageDiv = document.getElementById('newsletter-message');
        
        // Resetar erros
        nomeError.textContent = '';
        emailError.textContent = '';
        
        let isValid = true;
        
        // Validação do nome
        if (nome === '') {
            nomeError.textContent = 'Por favor, informe seu nome.';
            isValid = false;
        } else if (nome.length < 2) {
            nomeError.textContent = 'O nome deve ter pelo menos 2 caracteres.';
            isValid = false;
        }
        
        // Validação do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Por favor, informe seu e-mail.';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor, informe um e-mail válido.';
            isValid = false;
        }
        
        if (isValid) {
            // Simular envio (em um projeto real, seria uma requisição AJAX)
            messageDiv.textContent = `Obrigado, ${nome}! Você receberá nossas dicas sustentáveis em ${email}.`;
            messageDiv.style.display = 'block';
            newsletterForm.reset();
            
            // Esconder mensagem após 5 segundos
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    });
}

// Sistema de login simulado
const loginFormElement = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

if (loginFormElement) {
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const emailError = document.getElementById('email-login-error');
        const passwordError = document.getElementById('password-error');
        
        // Resetar erros
        emailError.textContent = '';
        passwordError.textContent = '';
        
        let isValid = true;
        
        // Validação do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Por favor, informe seu e-mail.';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor, informe um e-mail válido.';
            isValid = false;
        }
        
        // Validação da senha
        if (password === '') {
            passwordError.textContent = 'Por favor, informe sua senha.';
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            isValid = false;
        }
        
        if (isValid) {
            // Simulação de login bem-sucedido
            loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
            loginMessage.style.display = 'block';
            loginMessage.style.backgroundColor = '#81c784';
            
            // Redirecionar após 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

// Contador de impacto ambiental (exemplo interativo)
function initImpactCounter() {
    const impactCards = document.querySelectorAll('.card');
    
    if (impactCards.length > 0) {
        impactCards.forEach(card => {
            const link = card.querySelector('.btn-secondary');
            if (link) {
                link.addEventListener('click', function(e) {
                    // Simular que cada clique contribui para o meio ambiente
                    if (localStorage.getItem('ecoPoints')) {
                        let points = parseInt(localStorage.getItem('ecoPoints'));
                        points += 10;
                        localStorage.setItem('ecoPoints', points);
                    } else {
                        localStorage.setItem('ecoPoints', '10');
                    }
                    
                    // Feedback visual
                    const originalText = this.textContent;
                    this.textContent = '✓ Contribuição registrada!';
                    this.style.backgroundColor = '#2e7d32';
                    this.style.color = 'white';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.backgroundColor = '';
                        this.style.color = '';
                    }, 1500);
                });
            }
        });
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initImpactCounter();
    
    // Adicionar ano atual no rodapé
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
});