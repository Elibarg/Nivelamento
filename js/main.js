/* =========================================================
   SUMÁRIO main.js
   ---------------------------------------------------------
   1. MENU HAMBURGUER
   2. TROCA ENTRE LOGIN E CADASTRO
   3. VALIDAÇÃO DA NEWSLETTER
   4. SIMULAÇÃO DE LOGIN
   5. CONTADOR DE IMPACTO (simulação)
   6. INICIALIZAÇÃO (atualização do ano, etc.)
   ========================================================= */

/* ===== 1. MENU HAMBURGUER ===== */
/*
   Objetivo: Controlar a abertura/fechamento do menu em dispositivos móveis.
   Como funciona:
   - Seleciona o ícone do hamburguer e o menu de navegação.
   - Ao clicar no hamburguer, alterna a classe 'active' em ambos.
   - A classe 'active' no hamburguer aciona a animação dos traços (transformando em X).
   - A classe 'active' no menu faz com que ele entre na tela vindo da esquerda (left: 0).
   - Também fecha o menu quando qualquer link é clicado, para melhor usabilidade.
*/
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ===== 2. TROCA ENTRE LOGIN E CADASTRO ===== */
/*
   Objetivo: Alternar entre o formulário de login e o de cadastro na mesma página.
   Como funciona:
   - Inicialmente, o formulário de cadastro tem a classe 'hidden' (display: none).
   - Ao clicar em "Cadastre-se aqui", escondemos o login e mostramos o cadastro.
   - O link "Faça login aqui" faz o oposto.
   - Previne o comportamento padrão do link (não recarrega a página).
*/
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

/* ===== 3. VALIDAÇÃO DA NEWSLETTER ===== */
/*
   Objetivo: Validar os campos do formulário de newsletter antes de simular o envio.
   Como funciona:
   - Captura o evento submit e previne o envio real.
   - Obtém os valores dos campos e os elementos de erro.
   - Valida nome (não vazio, mínimo 2 caracteres).
   - Valida e-mail usando regex simples (formato texto@dominio.com).
   - Se válido, exibe mensagem de sucesso, limpa o formulário e esconde a mensagem após 5s.
   - Se inválido, exibe as mensagens de erro nos respectivos elementos.
*/
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const nomeError = document.getElementById('nome-error');
        const emailError = document.getElementById('email-error');
        const messageDiv = document.getElementById('newsletter-message');
        
        nomeError.textContent = '';
        emailError.textContent = '';
        
        let isValid = true;
        
        if (nome === '') {
            nomeError.textContent = 'Por favor, informe seu nome.';
            isValid = false;
        } else if (nome.length < 2) {
            nomeError.textContent = 'O nome deve ter pelo menos 2 caracteres.';
            isValid = false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Por favor, informe seu e-mail.';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor, informe um e-mail válido.';
            isValid = false;
        }
        
        if (isValid) {
            messageDiv.textContent = `Obrigado, ${nome}! Você receberá nossas dicas sustentáveis em ${email}.`;
            messageDiv.style.display = 'block';
            newsletterForm.reset();
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    });
}

/* ===== 4. SIMULAÇÃO DE LOGIN ===== */
/*
   Objetivo: Simular um processo de login com validação de credenciais.
   Como funciona:
   - Captura submit do formulário de login.
   - Valida e-mail (formato) e senha (não vazia e mínimo 6 caracteres).
   - Se válido, exibe mensagem de sucesso e após 2 segundos redireciona para a página inicial.
   - Em um projeto real, isso faria uma requisição AJAX para autenticar.
*/
const loginFormElement = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

if (loginFormElement) {
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const emailError = document.getElementById('email-login-error');
        const passwordError = document.getElementById('password-error');
        
        emailError.textContent = '';
        passwordError.textContent = '';
        
        let isValid = true;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            emailError.textContent = 'Por favor, informe seu e-mail.';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Por favor, informe um e-mail válido.';
            isValid = false;
        }
        
        if (password === '') {
            passwordError.textContent = 'Por favor, informe sua senha.';
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            isValid = false;
        }
        
        if (isValid) {
            loginMessage.textContent = 'Login realizado com sucesso! Redirecionando...';
            loginMessage.style.display = 'block';
            loginMessage.style.backgroundColor = '#81c784';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}

/* ===== 5. CONTADOR DE IMPACTO (SIMULAÇÃO) ===== */
/*
   Objetivo: Simular um sistema de pontos de engajamento.
   Como funciona:
   - Seleciona todos os botões "Saiba mais" dentro dos cards na página inicial.
   - Ao clicar, armazena no localStorage um contador de pontos (incrementa 10).
   - Feedback visual temporário: o botão muda de texto e cor por 1.5s.
   - Isso demonstra interatividade e possibilidade de gamificação.
*/
function initImpactCounter() {
    const impactCards = document.querySelectorAll('.card');
    if (impactCards.length > 0) {
        impactCards.forEach(card => {
            const link = card.querySelector('.btn-secondary');
            if (link) {
                link.addEventListener('click', function(e) {
                    if (localStorage.getItem('ecoPoints')) {
                        let points = parseInt(localStorage.getItem('ecoPoints'));
                        points += 10;
                        localStorage.setItem('ecoPoints', points);
                    } else {
                        localStorage.setItem('ecoPoints', '10');
                    }
                    
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

/* ===== 6. INICIALIZAÇÃO ===== */
/*
   - Executa funções após o carregamento completo do DOM.
   - Atualiza o ano no rodapé automaticamente, garantindo que o copyright esteja sempre correto.
*/
document.addEventListener('DOMContentLoaded', function() {
    initImpactCounter();
    
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }
});