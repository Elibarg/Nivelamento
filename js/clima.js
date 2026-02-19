/* ===========================================================
   SUMÁRIO clima.js
   -----------------------------------------------------------
   1. GRÁFICO DE CO₂ (Chart.js)
   2. GRÁFICO DE TEMPERATURA (Chart.js)
   3. FORMULÁRIO DE COMPROMISSO CLIMÁTICO
      3.1 Mostrar/ocultar campo "outro"
      3.2 Envio e atualização do contador
   4. ANIMAÇÃO DO CONTADOR (incremento automático)
   5. SIMULAÇÃO DE CLIQUE EM NOTÍCIAS
   6. EFEITO DE DIGITAÇÃO NO TÍTULO
   =========================================================== */

document.addEventListener('DOMContentLoaded', function() {
    /* ===== 1. GRÁFICO DE CO₂ ===== */
    /*
       Utilizamos a biblioteca Chart.js para criar um gráfico de linhas mostrando o aumento da concentração de CO₂.
       - O canvas com id "co2Chart" é onde o gráfico é renderizado.
       - Configuramos o tipo 'line', com labels (anos) e dados aproximados.
       - A cor da linha é o verde escuro do tema, e o preenchimento suave dá um efeito visual.
       - Opções: responsive true garante que o gráfico se adapte ao container.
       - O eixo Y começa em 300 ppm para melhor visualização da subida.
    */
    const co2Ctx = document.getElementById('co2Chart');
    if (co2Ctx) {
        new Chart(co2Ctx, {
            type: 'line',
            data: {
                labels: ['1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020', '2025'],
                datasets: [{
                    label: 'CO² (ppm)',
                    data: [310, 315, 325, 340, 355, 370, 390, 415, 425],
                    borderColor: '#2e7d32',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 300,
                        title: { display: true, text: 'Partes por milhão (ppm)' }
                    },
                    x: { title: { display: true, text: 'Ano' } }
                }
            }
        });
    }
    
    /* ===== 2. GRÁFICO DE TEMPERATURA ===== */
    /*
       Gráfico de barras mostrando a variação da temperatura global em relação à média pré-industrial.
       - As cores das barras variam do verde claro ao laranja escuro, representando o aumento gradual.
       - O eixo Y começa em -0.5 para incluir valores negativos iniciais.
       - Dados aproximados baseados em relatórios do IPCC.
    */
    const tempCtx = document.getElementById('tempChart');
    if (tempCtx) {
        new Chart(tempCtx, {
            type: 'bar',
            data: {
                labels: ['1900-1910', '1920-1930', '1940-1950', '1960-1970', '1980-1990', '2000-2010', '2010-2020'],
                datasets: [{
                    label: 'Variação de Temperatura (°C)',
                    data: [-0.3, -0.1, 0.1, 0.2, 0.4, 0.7, 1.0],
                    backgroundColor: [ '#81c784', '#81c784', '#81c784', '#ffb74d', '#ff9800', '#f57c00', '#e65100' ],
                    borderColor: '#2e7d32',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: -0.5,
                        title: { display: true, text: 'Variação (°C) em relação à média pré-industrial' }
                    },
                    x: { title: { display: true, text: 'Década' } }
                }
            }
        });
    }
    
    /* ===== 3. FORMULÁRIO DE COMPROMISSO CLIMÁTICO ===== */
    /*
       Formulário para o usuário assumir um compromisso contra as mudanças climáticas.
       - Possui um campo select com opções predefinidas.
       - Se a opção "Outro" for selecionada, um campo de texto adicional aparece (via classe hidden).
       - Ao enviar, validamos nome e e-mail, e atualizamos o contador de assinaturas.
       - Em um projeto real, isso seria enviado para um servidor.
    */
    const compromissoForm = document.getElementById('compromisso-form');
    const compromissoSelect = document.getElementById('compromisso');
    const outroCompromissoInput = document.getElementById('outro-compromisso');
    const outroCompromissoLabel = document.querySelector('label[for="outro-compromisso"]');
    const totalCompromissosSpan = document.getElementById('total-compromissos');
    
    if (compromissoSelect) {
        compromissoSelect.addEventListener('change', function() {
            if (this.value === 'outro') {
                outroCompromissoInput.classList.remove('hidden');
                outroCompromissoLabel.classList.remove('hidden');
                outroCompromissoInput.required = true;
            } else {
                outroCompromissoInput.classList.add('hidden');
                outroCompromissoLabel.classList.add('hidden');
                outroCompromissoInput.required = false;
            }
        });
    }
    
    if (compromissoForm) {
        compromissoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome-compromisso').value.trim();
            const email = document.getElementById('email-compromisso').value.trim();
            const compromisso = document.getElementById('compromisso').value;
            const outro = document.getElementById('outro-compromisso').value.trim();
            
            if (!nome || !email) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            let textoCompromisso = '';
            switch (compromisso) {
                case 'reduzir-carne': textoCompromisso = 'Reduzir o consumo de carne'; break;
                case 'transporte-sustentavel': textoCompromisso = 'Usar transporte sustentável'; break;
                case 'energia-renovavel': textoCompromisso = 'Trocar para energia renovável'; break;
                case 'consumo-consciente': textoCompromisso = 'Consumir de forma consciente'; break;
                case 'outro': textoCompromisso = outro || 'Outro compromisso'; break;
                default: textoCompromisso = 'Compromisso climático';
            }
            
            console.log('Compromisso registrado:', { nome, email, compromisso: textoCompromisso });
            
            // Atualiza o contador (incrementa 1)
            let totalCompromissos = parseInt(totalCompromissosSpan.textContent.replace(/,/g, '')) || 1247;
            totalCompromissos++;
            totalCompromissosSpan.textContent = totalCompromissos.toLocaleString();
            
            alert(`Obrigado, ${nome}! Seu compromisso de "${textoCompromisso}" foi registrado com sucesso.`);
            
            compromissoForm.reset();
            outroCompromissoInput.classList.add('hidden');
            outroCompromissoLabel.classList.add('hidden');
        });
    }
    
    /* ===== 4. ANIMAÇÃO DO CONTADOR (INCREMENTO AUTOMÁTICO) ===== */
    /*
       Simula novas pessoas assinando o compromisso em tempo real.
       - A cada 30 segundos, o contador aumenta em um valor aleatório entre 1 e 5.
       - Isso cria a ilusão de engajamento contínuo.
    */
    function updateCounterAnimation() {
        const counter = document.getElementById('total-compromissos');
        if (!counter) return;
        
        setInterval(() => {
            let current = parseInt(counter.textContent.replace(/,/g, '')) || 1247;
            const increment = Math.floor(Math.random() * 5) + 1;
            current += increment;
            counter.textContent = current.toLocaleString();
        }, 30000);
    }
    updateCounterAnimation();
    
    /* ===== 5. SIMULAÇÃO DE CLIQUE EM NOTÍCIAS ===== */
    /*
       Como as notícias são fictícias, ao clicar em "Leia mais", exibimos um alerta
       informando que em um site real haveria redirecionamento.
    */
    document.querySelectorAll('.noticia-card .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const noticiaTitulo = this.closest('.noticia-card').querySelector('h3').textContent;
            alert(`Em um site real, você seria redirecionado para a notícia completa: "${noticiaTitulo}"`);
        });
    });
    
    /* ===== 6. EFEITO DE DIGITAÇÃO NO TÍTULO ===== */
    /*
       Pequeno efeito visual para tornar a página mais dinâmica.
       - O título da página é apagado e reescrito caractere por caractere com um pequeno atraso.
    */
    const pageHeader = document.querySelector('.page-header h1');
    if (pageHeader) {
        const originalText = pageHeader.textContent;
        pageHeader.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                pageHeader.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 1000);
    }
});