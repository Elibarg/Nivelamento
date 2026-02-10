// Validação do formulário de registro
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
        
        // Resetar erros
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
        
        // Validação dos termos
        if (!terms) {
            alert('Você deve aceitar os Termos de Uso e Política de Privacidade.');
            isValid = false;
        }
        
        if (isValid) {
            // Simular cadastro bem-sucedido
            loginMessage.textContent = 'Cadastro realizado com sucesso! Faça login para continuar.';
            loginMessage.style.display = 'block';
            loginMessage.style.backgroundColor = '#81c784';
            
            // Limpar formulário
            registerForm.reset();
            
            // Mostrar formulário de login
            setTimeout(() => {
                registerForm.classList.add('hidden');
                document.getElementById('login-form').classList.remove('hidden');
                loginMessage.style.display = 'none';
            }, 3000);
        }
    });
}

// Validação em tempo real para campos de formulário
function setupRealTimeValidation() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value.trim();
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            
            if (errorElement) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (email === '') {
                    errorElement.textContent = '';
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
        
        passwordInput.addEventListener('input', validatePasswordMatch);
        confirmInput.addEventListener('input', validatePasswordMatch);
    }
}

// Inicializar validações
document.addEventListener('DOMContentLoaded', function() {
    setupRealTimeValidation();
});