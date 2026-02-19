/* ============================================================
   SUMÁRIO validacao.js
   ------------------------------------------------------------
   1. VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
   2. VALIDAÇÃO EM TEMPO REAL (e-mail, confirmação de senha)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    /* ===== 1. VALIDAÇÃO DO FORMULÁRIO DE CADASTRO ===== */
    /*
       Objetivo: Validar todos os campos do formulário de registro antes de simular o envio.
       Como funciona:
       - Capturamos o evento submit e impedimos o envio real.
       - Obtemos os valores de cada campo e os elementos de erro correspondentes.
       - Realizamos validações sequenciais:
           * Nome: não vazio, mínimo 3 caracteres.
           * E-mail: formato válido com regex.
           * Senha: mínimo 8 caracteres, deve conter letra maiúscula, minúscula e número (regex).
           * Confirmação: deve ser igual à senha.
           * Termos: deve estar marcado.
       - Se alguma validação falhar, exibimos mensagem de erro no respectivo elemento.
       - Se todas passarem, exibimos mensagem de sucesso, limpamos o formulário e,
         após 3 segundos, voltamos para o formulário de login (simulando cadastro concluído).
    */
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-register-error');
            const passwordError = document.getElementById('password-register-error');
            const confirmError = document.getElementById('confirm-error');
            const loginMessage = document.getElementById('login-message');
            
            // Limpa mensagens de erro anteriores
            nameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmError.textContent = '';
            
            let isValid = true;
            
            // Validação do nome
            if (name === '') {
                nameError.textContent = 'Por favor, informe seu nome completo.';
                isValid = false;
            } else if (name.length < 3) {
                nameError.textContent = 'O nome deve ter pelo menos 3 caracteres.';
                isValid = false;
            }
            
            // Validação do e-mail com regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                emailError.textContent = 'Por favor, informe seu e-mail.';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = 'Por favor, informe um e-mail válido.';
                isValid = false;
            }
            
            // Validação da senha: mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula e um número
            if (password === '') {
                passwordError.textContent = 'Por favor, crie uma senha.';
                isValid = false;
            } else if (password.length < 8) {
                passwordError.textContent = 'A senha deve ter pelo menos 8 caracteres.';
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
                passwordError.textContent = 'A senha deve conter letras maiúsculas, minúsculas e números.';
                isValid = false;
            }
            
            // Validação da confirmação de senha
            if (confirmPassword === '') {
                confirmError.textContent = 'Por favor, confirme sua senha.';
                isValid = false;
            } else if (password !== confirmPassword) {
                confirmError.textContent = 'As senhas não coincidem.';
                isValid = false;
            }
            
            // Validação dos termos (checkbox)
            if (!terms) {
                alert('Você deve aceitar os Termos de Uso e Política de Privacidade.');
                isValid = false;
            }
            
            if (isValid) {
                loginMessage.textContent = 'Cadastro realizado com sucesso! Faça login para continuar.';
                loginMessage.style.display = 'block';
                loginMessage.style.backgroundColor = '#81c784';
                
                registerForm.reset();
                
                // Após 3 segundos, volta para o formulário de login
                setTimeout(() => {
                    registerForm.classList.add('hidden');
                    document.getElementById('login-form').classList.remove('hidden');
                    loginMessage.style.display = 'none';
                }, 3000);
            }
        });
    }

    /* ===== 2. VALIDAÇÃO EM TEMPO REAL ===== */
    /*
       Objetivo: Fornecer feedback imediato ao usuário enquanto ele digita ou sai de um campo.
       Isso melhora a experiência do usuário, evitando que ele só descubra erros após o envio.

       Implementação:
       - Para campos de e-mail: usamos o evento 'blur' (quando o campo perde o foco) para validar
         o formato do e-mail e exibir erro se necessário.
       - Para confirmação de senha: usamos 'input' (enquanto digita) para verificar se as senhas coincidem,
         atualizando a mensagem de erro em tempo real.
    */
    function setupRealTimeValidation() {
        // Validação de e-mail ao perder o foco (blur)
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', function() {
                const email = this.value.trim();
                const errorId = this.id + '-error'; // Ex: "login-email" -> "login-email-error"
                const errorElement = document.getElementById(errorId);
                
                if (errorElement) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (email === '') {
                        errorElement.textContent = ''; // Campo vazio não gera erro (pode ser opcional)
                    } else if (!emailRegex.test(email)) {
                        errorElement.textContent = 'Por favor, informe um e-mail válido.';
                    } else {
                        errorElement.textContent = '';
                    }
                }
            });
        });
        
        // Validação de confirmação de senha em tempo real
        const passwordInput = document.getElementById('register-password');
        const confirmInput = document.getElementById('confirm-password');
        const confirmError = document.getElementById('confirm-error');
        
        if (passwordInput && confirmInput && confirmError) {
            const validatePasswordMatch = () => {
                if (passwordInput.value && confirmInput.value) {
                    if (passwordInput.value !== confirmInput.value) {
                        confirmError.textContent = 'As senhas não coincidem.';
                    } else {
                        confirmError.textContent = '';
                    }
                }
            };
            // Dispara a cada tecla digitada nos dois campos
            passwordInput.addEventListener('input', validatePasswordMatch);
            confirmInput.addEventListener('input', validatePasswordMatch);
        }
    }
    
    setupRealTimeValidation();
});