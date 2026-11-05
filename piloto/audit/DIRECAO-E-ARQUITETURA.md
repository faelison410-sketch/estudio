# Dossiê para auditoria independente

Escopo congelado: apenas a composição **PilotoQuadrado15s**. Nenhuma alteração narrativa, novo plano ou continuação do episódio foi feita na preparação da auditoria. O código de renderização permanece igual ao contido no ZIP original.

## Direção de arte

A oposição visual é entre uma cidade orgânica familiar e uma forma geométrica sem precedente. Os edifícios usam silhuetas curvas, janelas ovais, arcos e variações de altura. O quadrado é deliberadamente frontal, claro e regular no close, para que seus quatro lados possam ser lidos em uma tela pequena. Não há sobreposição explicativa ou narração para ensinar a premissa.

A paleta compartilhada em `src/art/style.ts` combina petróleo e azul esverdeado nas sombras, areia e creme na luz, cobre/coral na roupa de Lio e dourado no relógio. Coral distingue o protagonista da arquitetura. O giz claro se destaca do chão; o mostrador claro chama atenção para a consequência. Os tons mantêm continuidade entre planos sem depender de assets externos.

Linhas escuras, junções arredondadas no personagem, pequenas sardas e cabelo assimétrico formam sua identidade. As irregularidades do cenário contrastam com o contorno exato do desenho. A textura utiliza pontos SVG determinísticos, não ruído aleatório a cada render. Vinheta e gradientes criam profundidade. A abertura tem título discreto, complementar à ação; ele não explica a história.

A composição é vertical, com céu amplo na abertura, protagonista na praça e relógio identificável na arquitetura. Os cortes aproximam progressivamente a atenção: cidade → gesto → desenho → consequência → rosto. O fechamento não é escondido por uma dissolvência. O reflexo nos olhos é uma antecipação visual, sem mostrar o quadrado gigante que pertence ao episódio completo.

## Estrutura de Lio

`src/art/Lio.tsx` contém três componentes reutilizáveis:

- `Head`: contorno, pescoço, orelha, cabelo, olhos e pupilas, sobrancelhas, nariz, boca e sardas. `look`, `fear` e `tilt` controlam direção do olhar, expressão e inclinação.
- `Arm`: braço, antebraço em grupo hierárquico com pivô no cotovelo, mão e giz opcional. `angle` e `bend` controlam articulações independentes.
- `Lio`: reúne pernas, calçados, corpo, roupa, lenço, cabeça e braços. `crouch` controla descida e inclinação corporal; `reach` orienta o braço do giz.

Plano médio e close final reutilizam `Head`. A mão do plano de desenho é uma vista específica do mesmo figurino e paleta, não uma instância integral do rig. Não existe rig de malha, IK, esqueleto de software externo ou biblioteca completa de poses. A idade de 12 anos é intenção de design; sua leitura visual é um ponto a ser avaliado pelo auditor.

## Arquitetura de animação

`src/Root.tsx` registra uma composição fixa de 450 quadros, 30 fps, 1080×1920. `src/Composition.tsx` organiza cinco `Sequence` nomeadas, de 90 quadros cada. Os tempos são locais a cada plano por `useCurrentFrame()`, com conversão explícita para o tempo global quando necessário.

`src/scenes/Shots.tsx` mantém os enquadramentos e gestos. `src/art/World.tsx` reúne cidade, edifícios, janelas, mostrador, motivos curvos e tratamento gráfico. `src/art/Camera.tsx` parametriza escala, posição e centro da câmera. O parallax move camadas de arquitetura em velocidades diferentes; os gestos usam grupos internos articulados, não apenas translação de uma figura inteira.

Todas as animações derivam do número do quadro, sem timers, CSS animation, chamadas de rede ou aleatoriedade em tempo de render. A função `smooth` suaviza antecipações e reações. `src/timing.ts` centraliza os eventos causais: quadrado completo no quadro 258 (8,60 s), corte para o relógio em 270 (9 s), parada no 307 (10,23 s). O relógio desacelera por uma curva cúbica; após a parada, seu ângulo fica constante. O pêndulo também desacelera e congela. A câmera pode continuar se aproximando, mesmo com os mecanismos parados.

O quadrado é um path SVG de 250×250 unidades; `strokeDashoffset` revela seus 1.000 pontos de perímetro. A posição da mão é calculada por lado e progresso, até retornar ao vértice inicial. O plano médio inicia uma pequena marca, e o close desenvolve a figura. Reflexos geométricos surgem ao final no rosto assustado.

## Processo técnico

Remotion 4.0.541, React e TypeScript, com lockfile versionado. O template Blank e as Agent Skills vieram dos repositórios oficiais. `skills-lock.json` preserva a procedência da skill; os arquivos instalados de tooling, node_modules, bundles e resultados de render não são versionados.

O navegador padrão do Remotion não pôde ser baixado nesta rede. Com autorização do usuário, o render original usou Chromium 155.0.8059.79 do Cloud, selecionado pela variável `REMOTION_BROWSER_EXECUTABLE`. Sem essa variável, os scripts preferem o navegador gerenciado pelo Remotion. O README documenta execução local em Windows e particularidades do Cloud.

`npm run validate` testa os eventos de animação e examina o MP4 com FFprobe, incluindo a contagem integral de quadros. FFmpeg decodifica o arquivo inteiro com falha em erro. `npm run review` extrai vinte quadros do MP4, a galeria e a folha de contato. Metadados e checksums da entrega original estão no manifesto desta pasta. Um novo render pode apresentar hash diferente devido a versões de navegador, fontes e encoder; correspondência binária é exigida para as cópias desta entrega, não prometida entre plataformas.

## Limitações e pontos para avaliação externa

- Animação limitada em SVG, com vistas e gestos selecionados; não é animação final desenhada quadro a quadro.
- Não há áudio, narração, lip sync ou legendas. Avaliar se a causalidade é compreensível sem explicação prévia.
- Avaliar leitura da idade, agachamento, empunhadura do giz e continuidade espacial entre plano médio e vista superior.
- Avaliar o intervalo de 1,63 s entre fechamento e parada final do ponteiro, a percepção da desaceleração e a força dramática do instante de parada.
- A arquitetura ocupa e ultrapassa intencionalmente limites do enquadramento em alguns planos. A revisão anterior corrigiu a manga do close que tocava a borda.
- O título usa fontes do sistema e pode variar entre Linux e Windows. Todo o desenho restante é vetorial.
- Os reflexos são discretos e devem ser avaliados também na tela de celular. Não há validação externa da legibilidade ou do impacto dramático.
- Não há interface própria sem código: alterações de desenho e poses requerem edição dos componentes.
- O Windows físico e a interação no navegador do usuário não foram testados. A prévia HTTP e o render foram verificados no Cloud.
- A inspeção visual realizada pelo autor usou quadros e eventos selecionados; ela não substitui assistir ao MP4 em velocidade normal nem uma auditoria independente.
- Remotion tem licença própria. A gratuidade depende da elegibilidade descrita no README; nenhuma licença paga foi adquirida.

A auditoria deve registrar defeitos e oportunidades sem iniciar o episódio completo ou reescrever a narrativa nesta etapa.
