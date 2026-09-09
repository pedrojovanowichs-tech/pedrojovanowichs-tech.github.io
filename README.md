# PetShop Amigo Fiel - Fase 2

**Autor:** Pedro Miguel de Carvalho Jovanowichs

## Sobre o projeto

Sistema web para um petshop. Na Fase 1, o sistema foi construído apenas com
HTML semântico. Nesta Fase 2, foram incorporados CSS/Bootstrap, JavaScript,
formulários de cadastro e agendamento, e melhorias de acessibilidade.

## O que foi implementado na Fase 2

### 1. CSS/Bootstrap (carrossel) e JavaScript
- Bootstrap 5.3.3 (servido localmente em `vendor/bootstrap/`, sem depender de CDN externo).
- Carrossel Bootstrap (`#carrosselPrincipal`) na página inicial, com 3 slides
  (serviço com tele-busca, rações, acessórios), navegação por setas e indicadores.
- Paleta de cores e tipografia customizadas em `css/style.css` (verde-pinho,
  mostarda e terracota, com as fontes Fraunces + Work Sans), fugindo do visual
  padrão do Bootstrap.
- JavaScript (`js/script.js`) com **funções temporais reais**:
  - Saudação dinâmica (Bom dia / Boa tarde / Boa noite) calculada a partir do horário do sistema (`new Date()`).
  - Indicador "Aberto agora" / "Fechado agora", calculado a partir do dia da semana e hora atuais (funcionamento: segunda a sábado, 8h às 18h).
  - Data mínima de agendamento travada para "hoje", impedindo escolher datas passadas.
  - Validação e mensagens de confirmação dos formulários (sem reproduzir a página).

### 2. Formulário de cadastro de cliente e pet (`cadastro.html`)
Campos do tutor: nome completo, CPF, endereço, telefone, e-mail e sexo (radio).
Campos do pet: nome, raça (select), idade (number), espécie (radio) e se é
castrado (checkbox). Usa `input` de texto, e-mail, telefone, número, radio
button, checkbox, `placeholder` e atributo `required` nos campos obrigatórios.

### 3. Escolha de serviço e agendamento (`servicos.html#agendamento`)
- Serviço(s) desejado(s) via **checkbox** (Banho e/ou Tosa).
- Forma de atendimento via **radio button** (Entrega no local ou Tele-busca).
- Calendário (`input type="date"`) e horário (`input type="time"`) para
  definir dia e hora do agendamento, com data mínima = hoje.

### 4. Acessibilidade (Aula 10)
- Atributo `alt` descritivo em todas as imagens (produtos, serviços, carrossel).
- Link de pular para o conteúdo principal ("Pular para o conteúdo principal"), visível ao navegar por teclado.
- Todo `<label>` associado ao seu campo via `for`/`id`.
- `fieldset`/`legend` agrupando campos relacionados (sexo, espécie, serviço, atendimento).
- Indicação textual (não só por cor) dos campos obrigatórios (`*` + `aria-hidden` no símbolo, texto do label já descreve).
- Regiões dinâmicas (status de funcionamento e confirmações de formulário) marcadas com `role="status"`/`aria-live="polite"` para leitores de tela anunciarem mudanças.
- Foco de teclado sempre visível (`:focus-visible` customizado).
- `prefers-reduced-motion` respeitado (desativa transições para quem configurou o sistema operacional para reduzir movimento).

## Estrutura de arquivos

```
petshop/
├── index.html
├── acessorios.html
├── racoes.html
├── higiene.html
├── servicos.html
├── cadastro.html          (novo na Fase 2)
├── css/
│   └── style.css          (novo na Fase 2)
├── js/
│   └── script.js          (novo na Fase 2)
├── vendor/bootstrap/       (novo na Fase 2 — Bootstrap servido localmente)
├── img/                    (imagens já existentes da Fase 1)
└── README.md
```

## Categorias de produtos
1. Acessórios (roupas, brinquedos, camas, etc.)
2. Rações não perecíveis
3. Higiene e limpeza (tapete higiênico, fraldas, etc.)

## Serviços oferecidos
- Banho e tosa — entrega no local
- Banho e tosa — com tele-busca

## Tecnologias utilizadas
- HTML5 semântico
- CSS3 + Bootstrap 5.3.3 (grid, carrossel, formulários)
- JavaScript (ES6+): funções temporais, validação e confirmação de formulários

## Link do repositório GitHub
https://github.com/pedrojovanowichs-tech/pedrojovanowichs-tech.github.io

## Link do GitHub Pages
https://pedrojovanowichs-tech.github.io/
