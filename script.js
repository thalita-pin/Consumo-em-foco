'use strict';

// O site funciona sem banco de dados. Simulações e respostas não são enviadas a nenhum servidor.
const $ = (selector) => document.querySelector(selector);
const presets = {
  chuveiro: { label: 'Chuveiro elétrico', power: 5500, hours: 0.5, target: 0.3 },
  lampada: { label: 'Lâmpada LED', power: 9, hours: 5, target: 3 },
  ventilador: { label: 'Ventilador', power: 60, hours: 8, target: 5 },
  tv: { label: 'Televisão', power: 100, hours: 4, target: 2 },
  notebook: { label: 'Notebook', power: 65, hours: 6, target: 4 },
  ar: { label: 'Ar-condicionado', power: 1200, hours: 8, target: 6 },
  personalizado: { label: 'Outro aparelho', power: 100, hours: 4, target: 3 }
};
const form = $('#calc-form');
const inputs = {
  select: $('#aparelho'),
  power: $('#potencia'),
  qty: $('#quantidade'),
  hours: $('#horas'),
  target: $('#horas-meta'),
  days: $('#dias'),
  rate: $('#tarifa')
};
const brNumber = (number, digits=2) => Number(number).toLocaleString('pt-BR', {minimumFractionDigits:digits, maximumFractionDigits:digits});
const brMoney = (number) => Number(number).toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
const errorEl = $('#calc-error');
let entries = [];

// Voltar ao topo: não usa o cabeçalho fixo como alvo (ele já está visível no viewport).
// A âncora #topo permanece como alternativa funcional se o JavaScript estiver desativado.
const backToTopLink = $('#voltar-topo');
if (backToTopLink) {
  backToTopLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  });
}

// Menu para telas menores, com fechamento pelo Escape.
const menuButton = $('.menu-toggle');
const menu = $('#menu-principal');
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
  menu.classList.toggle('open', opening);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menu');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    menu.classList.remove('open'); menuButton.setAttribute('aria-expanded','false');
  }
});

function isInRange(value, min, max) { return Number.isFinite(value) && value >= min && value <= max; }
function readInputs() {
  const power = Number(inputs.power.value);
  const qty = Number(inputs.qty.value);
  const hours = Number(inputs.hours.value);
  const target = Number(inputs.target.value);
  const days = Number(inputs.days.value);
  const rate = Number(inputs.rate.value);
  if ([inputs.power, inputs.qty, inputs.hours, inputs.target, inputs.days, inputs.rate].some(field => field.value.trim() === '')) throw Error('Preencha todos os campos numéricos.');
  if (!isInRange(power, .1, 50000)) throw Error('A potência deve estar entre 0,1 e 50.000 W.');
  if (!Number.isInteger(qty) || !isInRange(qty,1,100)) throw Error('A quantidade deve ser um número inteiro entre 1 e 100.');
  if (!isInRange(hours,0,24) || !isInRange(target,0,24)) throw Error('As horas por dia devem estar entre 0 e 24.');
  if (target > hours) throw Error('Para simular economia, a meta de uso não pode superar o tempo atual.');
  if (!Number.isInteger(days) || !isInRange(days,1,31)) throw Error('Os dias devem ser um número inteiro entre 1 e 31.');
  if (!isInRange(rate,.01,30)) throw Error('Informe uma tarifa válida entre R$ 0,01 e R$ 30,00 por kWh.');
  const currentKwh = power / 1000 * hours * days * qty;
  const targetKwh = power / 1000 * target * days * qty;
  return {power, qty, hours, target, days, rate, currentKwh, targetKwh, savingKwh: currentKwh-targetKwh, savingMoney:(currentKwh-targetKwh)*rate, name:presets[inputs.select.value].label};
}
function setError(message) {
  errorEl.textContent = message;
  errorEl.hidden = !message;
}
function showResults(data) {
  $('#resultado-kwh').innerHTML = `${brNumber(data.currentKwh)} <small>kWh</small>`;
  $('#resultado-custo').textContent = `≈ ${brMoney(data.currentKwh * data.rate)} / mês`;
  $('#resultado-economia').textContent = brMoney(data.savingMoney);
  $('#resultado-economia-kwh').textContent = `${brNumber(data.savingKwh)} kWh por mês`;
  $('#barra-antes-texto').textContent = `${brNumber(data.currentKwh)} kWh`;
  $('#barra-depois-texto').textContent = `${brNumber(data.targetKwh)} kWh`;
  const reference = Math.max(data.currentKwh, 0.0000001);
  $('#barra-antes').style.width = (data.currentKwh > 0 ? 100 : 0) + '%';
  $('#barra-depois').style.width = `${Math.min(100,data.targetKwh/reference*100)}%`;
}
function calculatePreview() {
  try {
    const data = readInputs();
    setError('');
    showResults(data);
    return data;
  } catch (error) {
    setError(error.message);
    $('#resultado-kwh').innerHTML = '— <small>kWh</small>';
    $('#resultado-custo').textContent = 'Corrija os dados para calcular';
    $('#resultado-economia').textContent = '—';
    $('#resultado-economia-kwh').textContent = '— kWh por mês';
    $('#barra-antes').style.width = '0%';
    $('#barra-depois').style.width = '0%';
    $('#barra-antes-texto').textContent = '—';
    $('#barra-depois-texto').textContent = '—';
    return null;
  }
}
inputs.select.addEventListener('change', () => {
  const item = presets[inputs.select.value];
  inputs.power.value = item.power;
  inputs.hours.value = item.hours;
  inputs.target.value = item.target;
  calculatePreview();
});
Object.values(inputs).forEach(input => input.addEventListener('input', calculatePreview));
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = calculatePreview();
  if (!data) { errorEl.focus?.(); return; }
  entries.push({...data, id: ++entryId});
  renderEntries();
  $('#lista-simulacoes').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'nearest'});
});
let entryId = 0;
function renderEntries() {
  const body = $('#corpo-tabela'); body.textContent = '';
  $('#lista-vazia').hidden = entries.length > 0;
  $('#tabela-aparelhos').hidden = entries.length === 0;
  $('#total-area').hidden = entries.length === 0;
  $('#limpar-lista').disabled = entries.length === 0;
  for (const item of entries) {
    const row = document.createElement('tr');
    const values = [`${item.name} (${item.qty}×)`,brNumber(item.currentKwh),brNumber(item.targetKwh),brMoney(item.savingMoney)];
    for (const val of values) { const td = document.createElement('td'); td.textContent = val; row.append(td); }
    const actionTd = document.createElement('td');
    const remove = document.createElement('button'); remove.type='button'; remove.className='remove-row'; remove.textContent='Remover'; remove.setAttribute('aria-label',`Remover ${item.name} da lista`);
    remove.addEventListener('click', () => { entries = entries.filter(row => row.id !== item.id); renderEntries(); });
    actionTd.append(remove); row.append(actionTd); body.append(row);
  }
  const sumCurrent = entries.reduce((sum,item) => sum+item.currentKwh,0);
  const sumSavings = entries.reduce((sum,item) => sum+item.savingMoney,0);
  $('#total-kwh').textContent = `${brNumber(sumCurrent)} kWh/mês`;
  $('#total-economia').textContent = `${brMoney(sumSavings)}/mês`;
}
$('#limpar-lista').addEventListener('click', () => {entries=[]; renderEntries();});
calculatePreview();

// Desafio de quatro perguntas: aprendizagem local, sem cadastro, sem armazenamento.
const questions = [
  {text:'Ao ensaboar a louça, qual atitude ajuda a economizar água?', options:['Deixar a torneira aberta o tempo todo','Fechar a torneira enquanto ensaboa','Usar sempre a mangueira'], correct:1, info:'Fechar a torneira enquanto ensaboa evita uso desnecessário de água.'},
  {text:'O que mais influencia o consumo de energia de um aparelho?', options:['A cor do aparelho','A marca do interruptor','A potência e o tempo de uso'], correct:2, info:'A estimativa em kWh depende da potência, das horas de uso e dos dias de funcionamento.'},
  {text:'O indicador de perdas de água na distribuição mede principalmente...', options:['Perdas no sistema de abastecimento','Somente o tempo de banho das famílias','A quantidade de chuva por ano'], correct:0, info:'As perdas na distribuição não são a mesma coisa que água gasta dentro de casa.'},
  {text:'Antes de usar a calculadora, o que torna a estimativa mais confiável?', options:['Informar a potência e a tarifa da sua realidade','Deixar todos os campos com qualquer valor','Multiplicar os resultados por dez'], correct:0, info:'Dados reais da potência, horas, dias e tarifa tornam o cálculo mais útil.'}
];
let questionIndex=0, score=0, answered=false;
function renderQuiz() {
  answered=false;
  $('#quiz-final').hidden=true; $('#quiz-corpo').hidden=false;
  const q = questions[questionIndex];
  $('#quiz-progresso').textContent = `Pergunta ${questionIndex+1} de ${questions.length}`;
  $('#quiz-barra').style.width = `${(questionIndex+1)/questions.length*100}%`;
  $('#quiz-pergunta').textContent = q.text;
  const options = $('#quiz-opcoes'); options.textContent='';
  $('#quiz-feedback').hidden=true;
  $('#quiz-proxima').disabled=true;
  $('#quiz-proxima').innerHTML = questionIndex === questions.length-1 ? 'Ver meu resultado <span aria-hidden="true">→</span>' : 'Próxima pergunta <span aria-hidden="true">→</span>';
  q.options.forEach((choice,index) => {
    const button=document.createElement('button');button.type='button';button.className='quiz-option';button.textContent=choice;
    button.addEventListener('click', () => answerQuiz(index));options.append(button);
  });
}
function answerQuiz(index) {
  if (answered) return;
  answered=true;
  const q=questions[questionIndex];
  if (index===q.correct) score++;
  $('#quiz-opcoes').querySelectorAll('button').forEach((btn,i) => {btn.disabled=true; if (i===q.correct)btn.classList.add('correct');if(i===index&&i!==q.correct)btn.classList.add('incorrect');});
  $('#quiz-feedback').textContent = (index===q.correct ? 'Muito bem! ' : 'Boa tentativa! ') + q.info;
  $('#quiz-feedback').hidden=false;
  $('#quiz-proxima').disabled=false;
}
$('#quiz-proxima').addEventListener('click', () => {
  if (!answered)return;
  if (questionIndex < questions.length-1) {questionIndex++;renderQuiz();}
  else {
    $('#quiz-corpo').hidden=true;$('#quiz-final').hidden=false;
    $('#quiz-progresso').textContent='Concluído';$('#quiz-barra').style.width='100%';
    $('#quiz-resultado').textContent=`Você acertou ${score} de ${questions.length} perguntas. ${score===questions.length?'Excelente! Continue compartilhando o conhecimento.':'Que tal revisar as dicas e tentar novamente?'}`;
  }
});
$('#quiz-reiniciar').addEventListener('click', () => {questionIndex=0;score=0;renderQuiz();});
renderQuiz();
