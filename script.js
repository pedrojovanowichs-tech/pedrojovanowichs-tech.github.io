/* ==========================================================================
   PetShop Amigo Fiel — Fase 2 — script.js
   Funções temporais (saudação + status de funcionamento) e formulários
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  atualizarFaixaDeStatus();
  configurarDataMinimaAgendamento();
  configurarFormularioCadastro();
  configurarFormularioAgendamento();
});

/* --------------------------------------------------------------------------
   FUNÇÃO TEMPORAL 1: saudação + status "aberto agora" / "fechado agora"
   Regra de funcionamento: Segunda a Sábado, das 8h às 18h.
   -------------------------------------------------------------------------- */
function atualizarFaixaDeStatus() {
  const elemento = document.getElementById('status-funcionamento');
  if (!elemento) return;

  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 = domingo ... 6 = sábado
  const hora = agora.getHours();

  const saudacao = obterSaudacaoPorHorario(hora);
  const aberto = diaSemana >= 1 && diaSemana <= 6 && hora >= 8 && hora < 18;

  const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  let mensagem;
  if (aberto) {
    mensagem = `${saudacao}! Estamos abertos agora (${horaFormatada}) — atendimento até às 18h.`;
  } else {
    mensagem = `${saudacao}! Estamos fechados no momento (${horaFormatada}) — atendimento de segunda a sábado, das 8h às 18h.`;
  }

  elemento.textContent = mensagem;
}

function obterSaudacaoPorHorario(hora) {
  if (hora >= 5 && hora < 12) return 'Bom dia';
  if (hora >= 12 && hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

/* --------------------------------------------------------------------------
   FUNÇÃO TEMPORAL 2: impede escolher data de agendamento no passado
   -------------------------------------------------------------------------- */
function configurarDataMinimaAgendamento() {
  const campoData = document.getElementById('agendamento-data');
  if (!campoData) return;

  const hoje = new Date();
  const isoHoje = hoje.toISOString().split('T')[0];
  campoData.setAttribute('min', isoHoje);
}

/* --------------------------------------------------------------------------
   FORMULÁRIO: Cadastro de cliente + pet (cadastro.html)
   -------------------------------------------------------------------------- */
function configurarFormularioCadastro() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const nomeCliente = document.getElementById('cliente-nome').value.trim();
    const nomePet = document.getElementById('pet-nome').value.trim();
    const agora = new Date();
    const dataHora = agora.toLocaleString('pt-BR');

    const caixaConfirmacao = document.getElementById('confirmacao-cadastro');
    caixaConfirmacao.innerHTML = `
      <strong>✅ Cadastro recebido com sucesso!</strong><br>
      Tutor(a): ${escaparHtml(nomeCliente)} — Pet: ${escaparHtml(nomePet)}<br>
      Registrado em: ${dataHora}
    `;
    caixaConfirmacao.classList.add('show');
    caixaConfirmacao.setAttribute('role', 'status');
    caixaConfirmacao.focus();

    form.reset();
    form.classList.remove('was-validated');
  });
}

/* --------------------------------------------------------------------------
   FORMULÁRIO: Agendamento de serviço (servicos.html)
   -------------------------------------------------------------------------- */
function configurarFormularioAgendamento() {
  const form = document.getElementById('form-agendamento');
  if (!form) return;

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const servicosSelecionados = Array.from(
      form.querySelectorAll('input[name="servico"]:checked')
    ).map(input => input.value);

    const metodoSelecionado = form.querySelector('input[name="metodo"]:checked');

    let valido = form.checkValidity() && servicosSelecionados.length > 0 && metodoSelecionado;

    if (!valido) {
      form.classList.add('was-validated');
      const avisoServico = document.getElementById('aviso-servico');
      if (avisoServico) {
        avisoServico.style.display = servicosSelecionados.length > 0 ? 'none' : 'block';
      }
      return;
    }

    const nomeTutor = document.getElementById('agendamento-nome').value.trim();
    const nomePet = document.getElementById('agendamento-pet').value.trim();
    const data = document.getElementById('agendamento-data').value;
    const horario = document.getElementById('agendamento-horario').value;
    const dataFormatada = formatarDataBR(data);

    const caixaConfirmacao = document.getElementById('confirmacao-agendamento');
    caixaConfirmacao.innerHTML = `
      <strong>✅ Agendamento solicitado com sucesso!</strong><br>
      Tutor(a): ${escaparHtml(nomeTutor)} — Pet: ${escaparHtml(nomePet)}<br>
      Serviço(s): ${servicosSelecionados.map(escaparHtml).join(', ')}<br>
      Atendimento: ${escaparHtml(metodoSelecionado.value)}<br>
      Data e horário: ${dataFormatada} às ${horario}
    `;
    caixaConfirmacao.classList.add('show');
    caixaConfirmacao.setAttribute('role', 'status');
    caixaConfirmacao.focus();

    form.reset();
    form.classList.remove('was-validated');
    document.getElementById('aviso-servico').style.display = 'none';
    configurarDataMinimaAgendamento();
  });
}

function formatarDataBR(isoData) {
  if (!isoData) return '';
  const [ano, mes, dia] = isoData.split('-');
  return `${dia}/${mes}/${ano}`;
}

/* Escapa texto simples antes de inserir via innerHTML, evitando problemas
   caso o usuário digite caracteres especiais no formulário */
function escaparHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}
