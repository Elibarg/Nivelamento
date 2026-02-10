// JavaScript para a página de Reciclagem

document.addEventListener('DOMContentLoaded', function() {
    // Sistema de abas dos materiais
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todas as abas
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active à aba clicada
            btn.classList.add('active');
            
            // Mostrar conteúdo correspondente
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Sistema do Quiz de Reciclagem
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    const restartBtn = document.getElementById('restart-quiz');
    let currentQuestion = 0;
    let userAnswers = [];
    
    // Mostrar primeira pergunta
    showQuestion(currentQuestion);
    
    // Evento para opções do quiz
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const questionId = this.closest('.quiz-question').id;
            const questionIndex = parseInt(questionId.replace('q', '')) - 1;
            
            // Remover seleção anterior nesta pergunta
            const questionOptions = this.parentElement.querySelectorAll('.quiz-option');
            questionOptions.forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Marcar esta opção como selecionada
            this.classList.add('selected');
            
            // Armazenar resposta
            userAnswers[questionIndex] = this.getAttribute('data-correct') === 'true';
            
            // Atualizar navegação
            updateQuizNavigation();
        });
    });
    
    // Botão Próxima
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateQuizNavigation();
            }
        });
    }
    
    // Botão Anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
                updateQuizNavigation();
            }
        });
    }
    
    // Botão Ver Resultado
    if (submitBtn) {
        submitBtn.addEventListener('click', showQuizResults);
    }
    
    // Botão Refazer Quiz
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            currentQuestion = 0;
            userAnswers = [];
            document.querySelector('.quiz-results').classList.add('hidden');
            showQuestion(currentQuestion);
            updateQuizNavigation();
            
            // Resetar seleções
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.classList.remove('selected', 'correct', 'incorrect');
            });
        });
    }
    
    // Função para mostrar uma pergunta específica
    function showQuestion(index) {
        quizQuestions.forEach((q, i) => {
            if (i === index) {
                q.classList.add('active');
            } else {
                q.classList.remove('active');
            }
        });
    }
    
    // Função para atualizar navegação do quiz
    function updateQuizNavigation() {
        // Atualizar botões
        prevBtn.disabled = currentQuestion === 0;
        
        if (currentQuestion === quizQuestions.length - 1) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }
    
    // Função para mostrar resultados do quiz
    function showQuizResults() {
        // Calcular pontuação
        const score = userAnswers.filter(answer => answer === true).length;
        const total = quizQuestions.length;
        
        // Atualizar display
        document.getElementById('quiz-score').textContent = score;
        
        // Mensagem personalizada
        const message = document.getElementById('quiz-message');
        if (score === total) {
            message.textContent = 'Excelente! Você é um mestre da reciclagem!';
            message.style.color = '#4CAF50';
        } else if (score >= total / 2) {
            message.textContent = 'Bom trabalho! Você sabe bastante sobre reciclagem.';
            message.style.color = '#FF9800';
        } else {
            message.textContent = 'Continue aprendendo! A reciclagem é importante para o planeta.';
            message.style.color = '#F44336';
        }
        
        // Mostrar resultados
        document.querySelector('.quiz-results').classList.remove('hidden');
        
        // Destacar respostas corretas/incorretas
        quizQuestions.forEach((question, index) => {
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(option => {
                if (option.getAttribute('data-correct') === 'true') {
                    option.classList.add('correct');
                } else if (option.classList.contains('selected') && option.getAttribute('data-correct') !== 'true') {
                    option.classList.add('incorrect');
                }
            });
        });
    }
    
    // Sistema de busca de pontos de coleta (simulado)
    const buscarColetaBtn = document.getElementById('buscar-coleta');
    const cepInput = document.getElementById('cep');
    const cepError = document.getElementById('cep-error');
    
    if (buscarColetaBtn) {
        buscarColetaBtn.addEventListener('click', function() {
            const cep = cepInput.value.replace(/\D/g, '');
            
            // Validação básica de CEP
            if (cep.length !== 8) {
                cepError.textContent = 'CEP inválido. Digite 8 números.';
                return;
            }
            
            cepError.textContent = '';
            
            // Simular busca (em um projeto real, seria uma API)
            const resultadosDiv = document.getElementById('resultados-coleta');
            const pontosLista = document.querySelector('.pontos-lista');
            
            // Limpar resultados anteriores
            pontosLista.innerHTML = '';
            
            // Dados simulados
            const pontosSimulados = [
                {
                    nome: 'Ecoponto Centro',
                    endereco: 'Rua das Flores, 123 - Centro',
                    horario: 'Seg-Sex: 8h-18h, Sáb: 8h-12h',
                    materiais: 'Papel, plástico, vidro, metal'
                },
                {
                    nome: 'Cooperativa Recicla Mais',
                    endereco: 'Av. Principal, 456 - Bairro Novo',
                    horario: 'Ter-Sáb: 9h-17h',
                    materiais: 'Todos os materiais recicláveis'
                },
                {
                    nome: 'Ponto Verde Shopping',
                    endereco: 'Shopping Center, Loja 45',
                    horario: 'Todos os dias: 10h-22h',
                    materiais: 'Pilhas, eletrônicos, lâmpadas'
                }
            ];
            
            // Adicionar pontos à lista
            pontosSimulados.forEach(ponto => {
                const pontoItem = document.createElement('div');
                pontoItem.className = 'ponto-item';
                pontoItem.innerHTML = `
                    <h4>${ponto.nome}</h4>
                    <p><strong>Endereço:</strong> ${ponto.endereco}</p>
                    <p><strong>Horário:</strong> ${ponto.horario}</p>
                    <p><strong>Aceita:</strong> ${ponto.materiais}</p>
                `;
                pontosLista.appendChild(pontoItem);
            });
            
            // Mostrar resultados
            resultadosDiv.classList.remove('hidden');
            
            // Scroll para resultados
            resultadosDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Formatar CEP
    cepInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        this.value = value;
    });
});