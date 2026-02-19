/* ===========================================================
   SUMÁRIO reciclagem.js
   -----------------------------------------------------------
   1. SISTEMA DE ABAS DE MATERIAIS
   2. QUIZ INTERATIVO
      2.1 Navegação entre perguntas
      2.2 Registro de respostas
      2.3 Exibição de resultados
   3. BUSCA DE PONTOS DE COLETA (simulada)
      3.1 Validação de CEP
      3.2 Exibição de resultados fictícios
   =========================================================== */

document.addEventListener('DOMContentLoaded', function() {
    /* ===== 1. SISTEMA DE ABAS DE MATERIAIS ===== */
    /*
       Objetivo: Permitir que o usuário navegue entre as informações de diferentes materiais recicláveis.
       Como funciona:
       - Seleciona todos os botões de aba e os conteúdos correspondentes.
       - Ao clicar em um botão, remove a classe 'active' de todos e adiciona apenas no clicado.
       - O atributo data-tab do botão contém o ID do conteúdo a ser exibido.
       - Usamos esse ID para encontrar a div correta e adicionar a classe 'active' nela.
       - Isso garante que apenas um conteúdo seja visível por vez.
    */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    /* ===== 2. QUIZ INTERATIVO ===== */
    /*
       Objetivo: Testar o conhecimento do usuário sobre reciclagem de forma lúdica.
       Estrutura:
       - Três perguntas, cada uma com quatro opções.
       - Apenas uma pergunta é exibida por vez.
       - As respostas são armazenadas em um array (userAnswers) como booleanos.
       - Navegação entre perguntas com botões "Anterior" e "Próxima".
       - Ao final, botão "Ver Resultado" calcula a pontuação e destaca as respostas.
    */
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prev-question');
    const nextBtn = document.getElementById('next-question');
    const submitBtn = document.getElementById('submit-quiz');
    const restartBtn = document.getElementById('restart-quiz');
    let currentQuestion = 0;
    let userAnswers = [];
    
    // Exibe a primeira pergunta
    showQuestion(currentQuestion);
    
    // Evento para as opções de resposta
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const questionId = this.closest('.quiz-question').id;
            const questionIndex = parseInt(questionId.replace('q', '')) - 1;
            
            // Remove a classe 'selected' de todas as opções desta pergunta
            const questionOptions = this.parentElement.querySelectorAll('.quiz-option');
            questionOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Marca a opção clicada como selecionada
            this.classList.add('selected');
            
            // Armazena se a resposta está correta (data-correct="true")
            userAnswers[questionIndex] = this.getAttribute('data-correct') === 'true';
            
            updateQuizNavigation();
        });
    });
    
    // Botão "Próxima"
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentQuestion < quizQuestions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateQuizNavigation();
            }
        });
    }
    
    // Botão "Anterior"
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
                updateQuizNavigation();
            }
        });
    }
    
    // Botão "Ver Resultado"
    if (submitBtn) {
        submitBtn.addEventListener('click', showQuizResults);
    }
    
    // Botão "Refazer Quiz"
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            currentQuestion = 0;
            userAnswers = [];
            document.querySelector('.quiz-results').classList.add('hidden');
            showQuestion(currentQuestion);
            updateQuizNavigation();
            
            // Remove todas as classes de correção e seleção
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.classList.remove('selected', 'correct', 'incorrect');
            });
        });
    }
    
    // Função auxiliar para mostrar uma pergunta específica
    function showQuestion(index) {
        quizQuestions.forEach((q, i) => {
            if (i === index) {
                q.classList.add('active');
            } else {
                q.classList.remove('active');
            }
        });
    }
    
    // Atualiza o estado dos botões de navegação
    function updateQuizNavigation() {
        prevBtn.disabled = currentQuestion === 0;
        
        if (currentQuestion === quizQuestions.length - 1) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }
    
    // Exibe os resultados e destaca as respostas
    function showQuizResults() {
        const score = userAnswers.filter(answer => answer === true).length;
        const total = quizQuestions.length;
        
        document.getElementById('quiz-score').textContent = score;
        
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
        
        document.querySelector('.quiz-results').classList.remove('hidden');
        
        // Destaca as respostas corretas (verde) e as incorretas selecionadas (vermelho)
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
    
    /* ===== 3. BUSCA DE PONTOS DE COLETA (SIMULADA) ===== */
    /*
       Objetivo: Simular uma busca por pontos de coleta a partir de um CEP.
       Como funciona:
       - O usuário digita um CEP (com formatação automática).
       - Ao clicar em "Buscar", validamos se o CEP tem 8 dígitos.
       - Se válido, limpamos resultados anteriores e inserimos dados fictícios.
       - A lista de pontos é gerada dinamicamente via JavaScript.
       - Isso demonstra como seria uma integração com uma API real.
    */
    const buscarColetaBtn = document.getElementById('buscar-coleta');
    const cepInput = document.getElementById('cep');
    const cepError = document.getElementById('cep-error');
    
    if (buscarColetaBtn) {
        buscarColetaBtn.addEventListener('click', function() {
            const cep = cepInput.value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                cepError.textContent = 'CEP inválido. Digite 8 números.';
                return;
            }
            
            cepError.textContent = '';
            
            const resultadosDiv = document.getElementById('resultados-coleta');
            const pontosLista = document.querySelector('.pontos-lista');
            pontosLista.innerHTML = '';
            
            // Dados simulados (em um projeto real, viriam de uma API)
            const pontosSimulados = [
                { nome: 'Ecoponto Centro', endereco: 'Rua das Flores, 123 - Centro', horario: 'Seg-Sex: 8h-18h, Sáb: 8h-12h', materiais: 'Papel, plástico, vidro, metal' },
                { nome: 'Cooperativa Recicla Mais', endereco: 'Av. Principal, 456 - Bairro Novo', horario: 'Ter-Sáb: 9h-17h', materiais: 'Todos os materiais recicláveis' },
                { nome: 'Ponto Verde Shopping', endereco: 'Shopping Center, Loja 45', horario: 'Todos os dias: 10h-22h', materiais: 'Pilhas, eletrônicos, lâmpadas' }
            ];
            
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
            
            resultadosDiv.classList.remove('hidden');
            resultadosDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Formatação automática do CEP (adiciona hífen)
    cepInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        this.value = value;
    });
});