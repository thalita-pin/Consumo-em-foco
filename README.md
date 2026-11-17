# Consumo em Foco — Água + Energia

Site educativo desenvolvido para o **Projeto de Extensão Universitária — Economia Sustentável**, do curso de Análise e Desenvolvimento de Sistemas (ADS) da Cruzeiro do Sul Virtual.

**Comunidade parceira:** Colégio Estadual Professora Dirce Celestino do Amaral — CIC, Curitiba/PR.

## O que o projeto oferece

- Explicações sobre desperdício de água e energia, distinguindo **perdas na distribuição pública** do consumo residencial.
- Dados públicos com referência e ano-base: ANA/SINISA, Instituto Trata Brasil e EPE.
- Orientações práticas da Sanepar e do Ministério de Minas e Energia.
- **Calculadora interativa de energia** com potência, quantidade, horas de uso, dias e tarifa editáveis; comparação entre uso atual e uma meta reduzida; lista com vários aparelhos e total de consumo/economia.
- **Desafio de quatro questões** com correção e resultado imediato, sem cadastro.
- Layout adaptado a celulares, tablets e computadores, com navegação por teclado.
- Link **Voltar ao topo** corrigido para retornar ao início da página.

## Arquivos

| Arquivo | Finalidade |
|---|---|
| `index.html` | Conteúdo e seções do site |
| `styles.css` | Cores, tipografia e layout responsivo |
| `script.js` | Calculadora, lista de aparelhos, desafio e menu |
| `assets/favicon.svg` | Ícone da aba do navegador, editável em SVG |
| `assets/imagens/ilustracao-agua-energia.svg` | Ilustração principal da página inicial |
| `assets/imagens/simbolo-logo.svg` | Ícone da marca, no cabeçalho |
| `assets/imagens/icone-agua.svg` | Ilustração do quadro sobre água |
| `assets/imagens/icone-energia.svg` | Ilustração do quadro sobre energia |
| `paleta-original.scss` | Códigos originais das quatro cores fornecidas |


## Como trocar as cores e editar as imagens

**Paleta aplicada:** `#083D77` (Regal Navy), `#EBEBD3` (Beige), `#F4D35E` (Royal Gold), `#EE964B` (Sandy Brown).

- Para mudar as cores, abra **`styles.css`** e edite as quatro variáveis no início do arquivo, dentro de `:root`. Os tons intermediários são derivados automaticamente delas.
- As imagens aparecem como **arquivos SVG independentes** em `assets/imagens/`. Você pode abrir SVG no **Inkscape** (gratuito), em um editor de vetores compatível ou em um editor de texto, e modificar formas e cores.
- Para substituir uma ilustração sem alterar o HTML, salve outra imagem **no mesmo caminho e com o mesmo nome** (preferencialmente SVG). Se usar `.png` ou `.jpg`, atualize a extensão no atributo `src` do `index.html`.
- Para editar a ilustração principal, abra `assets/imagens/ilustracao-agua-energia.svg`.
- Para editar o ícone do topo, abra `assets/imagens/simbolo-logo.svg`; para o ícone da aba, edite `assets/favicon.svg`.
- Abra `index.html` depois de salvar. Se a imagem não atualizar no navegador, pressione `Ctrl + F5` para recarregar sem cache.
- Não renomeie a pasta `assets/imagens` sem corrigir os caminhos no HTML.


## Como abrir no computador

1. Descompacte a pasta, mantendo todos os arquivos juntos.
2. Abra `index.html` com Chrome, Edge ou Firefox.
3. Teste a calculadora e o desafio: funcionam sem instalar nada e sem conexão à internet.


## Como usar a calculadora

Fórmula empregada:

```
kWh por mês = (potência em W / 1000) × horas por dia × dias no mês × quantidade
custo estimado = kWh por mês × tarifa informada (R$/kWh)
economia estimada = (kWh do uso atual - kWh da meta) × tarifa
```

Exemplo ilustrativo: chuveiro elétrico de 5.500 W, 30 minutos ao dia e 30 dias no mês = 82,5 kWh/mês. Se o uso cair para 18 minutos diários, serão 49,5 kWh/mês, diferença de 33 kWh. Com tarifa hipotética de R$ 1,00/kWh, a economia estimada será de R$ 33,00 no mês.

**Atenção:** a calculadora não reproduz a conta de luz. Potências iniciais são exemplos; substitua-as pelas da etiqueta do equipamento. Equipamentos com ciclos automáticos (por exemplo, geladeiras e alguns condicionadores de ar) podem não consumir a potência nominal continuamente. Os valores reais da fatura dependem de tarifa, tributos, bandeiras e outros itens. Não são feitas medições na escola.

## Privacidade

- A calculadora e o desafio **não enviam dados** a servidores e não usam cadastro ou analytics.
- O site não coleta nomes nem dados dos estudantes.
- O cartaz será criado separadamente no Canva. O site não possui gerador de QR Code e não utiliza nenhum serviço externo para gerar o cartaz.
- Para o QR Code do cartaz, utilize apenas a URL pública do site.

## Fontes e verificação

- **ANA / SINISA:** [Conjuntura dos Recursos Hídricos 2025 — Usos da água](https://conjuntura2025.ana.gov.br/usos-da-agua.html). Indicação de 40,3% de perdas na distribuição no Brasil, em 2023.
- **Instituto Trata Brasil:** [Estudo de Perdas de Água 2025 — resumo executivo](https://tratabrasil.org.br/wp-content/uploads/2025/11/Resumo-Executivo_Perdas-de-agua-2025.pdf). Volume de água não faturada em 2023 estimado em cerca de 5,8 bilhões de m³.
- **EPE:** [Balanço Energético Nacional 2026 — ano-base 2025](https://www.epe.gov.br/pt/publicacoes-dados-abertos/publicacoes/balanco-energetico-nacional-2026).
- **Sanepar:** [Consumo Consciente](https://www.sanepar.com.br/consumo-consciente).
- **Ministério de Minas e Energia:** [Cartilha do Consumidor Consciente](https://www.gov.br/mme/pt-br/assuntos/noticias/Cartilhadoconsumidordeenergiaconsciente.pdf).
- **ONU Brasil:** [ODS 4](https://brasil.un.org/pt-br/sdgs/4) e [ODS 12](https://brasil.un.org/pt-br/sdgs/12).

As referências são externas e podem mudar de endereço. Os dados citados referem-se ao Brasil e não comprovam desperdício específico na escola.


## Licença e uso

Código criado para utilização e adaptação no projeto de extensão. Todas as ilustrações usadas na página estão como arquivos SVG separados na pasta `assets/imagens/`; não é necessário baixar fotos nem fontes externas.
