# O Quadrado Proibido — piloto de 15 segundos

Prova de conceito autoral de animação 2D: uma cidade que nunca conheceu ângulos retos, um menino e um desenho impossível. Sem narração, música ou legenda explicativa. O texto discreto de abertura é apenas identificação da série.

## Assistir primeiro

O arquivo pronto fica em **`out/PilotoQuadrado15s.mp4`**. Abra-o no player do Windows. A galeria **`out/review/index.html`** reúne o vídeo e 20 quadros extraídos dele; `out/review/contact-sheet.jpg` apresenta os cinco planos juntos. `out/validation.json` contém a conferência técnica do arquivo.

Este trabalho foi executado no **Codex Cloud**, em `/workspace/estudio/piloto`. Os arquivos estão na máquina da nuvem, não no computador do usuário. Não houve acesso ao Notion. Nenhum vídeo foi publicado, nenhum serviço pago foi contratado e nenhuma chave de API é necessária. Se a interface não permitir baixar os arquivos, use os arquivos do workspace ou solicite sua exportação pela interface disponível; não existe URL pública do vídeo.

## Reproduzir no Windows, passo a passo

1. Instale **Node.js 24 LTS** pelo site oficial `https://nodejs.org/` e reinicie o terminal.
2. Extraia a pasta do projeto. No Explorador de Arquivos, abra a pasta **piloto**, clique na barra de endereço, digite `powershell` e pressione Enter.
3. Execute, uma linha por vez:

```powershell
npm ci
npm run dev
```

O terminal informa o endereço do Remotion Studio. Abra esse endereço no navegador **do seu computador**, selecione **PilotoQuadrado15s** e pressione Play. Mantenha o terminal aberto. Para parar, pressione Ctrl+C. O endereço local do Cloud não abre o Studio no computador Windows; para isso, execute o projeto localmente.

Para exportar novamente, em outro terminal aberto na mesma pasta:

```powershell
npm run render
```

Na primeira exportação local, Remotion poderá baixar seu navegador oficial. A exportação usa CPU, não serviços pagos; pode levar alguns minutos. Resultado: `out\PilotoQuadrado15s.mp4`.

Para gerar PNGs diretamente da composição:

```powershell
npm run stills
```

Para os comandos opcionais de conferência do MP4, instale FFmpeg pelo site oficial `https://ffmpeg.org/download.html` e deixe **ffmpeg** e **ffprobe** no PATH:

```powershell
npm run lint
npm run typecheck
npm run build
npm run validate
npm run review
```

`validate` verifica tempos, desaceleração, congelamento e metadados, conta todos os quadros e decodifica o vídeo inteiro. `review` extrai 20 quadros do MP4, monta a galeria HTML e gera a folha de contato JPEG com um quadro de cada plano.

## Particularidade do Cloud

O inicializador oficial `npx create-video@4.0.541 --yes --blank piloto` falhou por resolução DNS no download do template. Foi utilizado o **mesmo template oficial Blank**, obtido em `https://github.com/remotion-dev/template-empty`. As Remotion Agent Skills oficiais foram instaladas em `../.agents/skills/remotion-best-practices` e consultadas; a API foi conferida na documentação fonte atual do repositório oficial. O domínio da documentação web respondeu 403 nesta rede.

O download do navegador do Remotion também foi bloqueado pela rede. **Com autorização explícita do usuário**, usamos o Chromium instalado. Para repetir nesta máquina:

```bash
cd /workspace/estudio/piloto
npm ci
npm run dev
REMOTION_BROWSER_EXECUTABLE=/usr/bin/chromium npm run render
npm run validate
npm run review
```

No Windows, prefira o navegador gerenciado pelo Remotion, sem essa variável. Se você já tiver um Chrome/Chromium e quiser escolhê-lo explicitamente, use, no PowerShell, o caminho real da instalação:

```powershell
$env:REMOTION_BROWSER_EXECUTABLE = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run render
```

Não é necessário configurar essa variável para assistir ao MP4 pronto. O sandbox do Cloud bloqueou interfaces de rede e processos do browser; Studio e render foram executados com a permissão de execução apropriada da plataforma, sem desativar TLS ou assinaturas.

## Editar e reutilizar

- `src/Root.tsx`: composição **PilotoQuadrado15s**, 1080×1920, 30 fps, 450 quadros.
- `src/Composition.tsx`: cinco sequências nomeadas, cada uma com 90 quadros.
- `src/scenes/Shots.tsx`: enquadramentos, gestos e efeitos de cada plano.
- `src/art/Lio.tsx`: cabeça, cabelo, olhos, expressão, braço com antebraço articulado, corpo e pose de agachamento. O mesmo desenho de cabeça aparece nos dois planos de personagem.
- `src/art/World.tsx`: edifícios curvos, janelas orgânicas, cidade em camadas, mostrador circular e tratamento gráfico.
- `src/art/Camera.tsx`: câmera com centro, escala e deslocamento parametrizáveis.
- `src/art/style.ts`: paleta comum e curvas de movimento.
- `src/timing.ts`: eventos de fechamento do quadrado e parada do relógio, com funções usadas também na validação.
- `scripts/`: render, imagens e conferência técnica.

Para uma mudança simples, ajuste as cores em `style.ts` ou a expressão em `Lio.tsx`; o Studio atualiza a prévia. Os SVGs são editáveis em código React, não um arquivo de rig para software de animação tradicional. Não há painel próprio de edição sem código. As sequências podem ser examinadas e reposicionadas na timeline do Studio, mas trocar cores, poses e desenhos ainda requer edição dos componentes.

Cada tarefa do Cloud já é isolada: use este checkout existente; não crie Git worktrees sem solicitação explícita. Dependências e arquivos persistem no snapshot, mas o Studio deve ser reiniciado em novas sessões.

## Decupagem e causalidade

| Tempo | Plano | Ação |
|---|---|---|
| 0–3 s | Cidade vertical em camadas | Arquitetura curva, movimento de profundidade, Lio na praça e relógio visível |
| 3–6 s | Plano médio | Lio antecipa, se agacha, baixa o olhar e aproxima o giz do chão |
| 6–9 s | Vista superior | Mão percorre quatro lados iguais; quadrado de 250×250 unidades, fechamento no quadro 258 (8,60 s) |
| 9–12 s | Relógio circular | Ponteiro desacelera e para no quadro 307 (10,23 s); pulso visual marca o instante e o pêndulo congela |
| 12–15 s | Close | Pequena antecipação corporal, olhos sobem, sobrancelhas e boca reagem; reflexos geométricos antecipam o céu |

Os cortes são motivados pela ação: aproximação do personagem, detalhe da mão, consequência no relógio e reação. Não há dissolvência que esconda o fechamento do desenho. O quadrado gigante no céu pertence ao episódio completo; aqui aparece apenas a antecipação nos olhos.

## Arte, licença e custos

Arte SVG e movimentos criados para esta prova de conceito, sem personagens, música ou assets de canais existentes. Sem downloads de imagens, fontes ou áudio em tempo de renderização. Fontes de sistema são usadas só no título pequeno, portanto a aparência desse texto pode variar entre Windows e Linux. O restante é vetorial.

React é MIT; TypeScript é Apache-2.0. **Remotion usa licença própria**, com gratuidade para indivíduos, empresas com até três empregados, organizações sem fins lucrativos e avaliação ainda não comercial. Empresas fora desses critérios precisam de licença comercial. Consulte os termos atuais antes de produção comercial: `https://github.com/remotion-dev/remotion/blob/main/LICENSE.md`. Não compramos nem ativamos licença. O projeto autoral permanece privado (`UNLICENSED` no package.json); isso não altera as licenças das dependências.

## Limites desta prova

Animação limitada de estudo visual, sem som, dublagem, lip sync, episódio completo, painel administrativo ou geração em lote. A identidade e as proporções foram revistas nos cinco planos, mas não se trata de animação final desenhada quadro a quadro. Prévia HTTP e exportação foram verificadas no Cloud; uma sessão interativa do usuário e instalação em Windows físico não foram testadas. Leia `RELATORIO.md` para os resultados finais.

## Auditoria independente

Consulte [direção de arte e arquitetura](audit/DIRECAO-E-ARQUITETURA.md), [manifesto dos arquivos originais](audit/manifest.json) e [validação original](audit/validation-original.json). O ZIP de entrega original foi preservado sem mudanças; a documentação de auditoria posterior está nesta branch. O manifesto permite confirmar se um arquivo recebido corresponde à versão final. Outputs e ferramentas instaladas não são incluídos no Git.
