# Relatório de entrega — PilotoQuadrado15s

Data: 5 de novembro de 2026. Execução: Codex Cloud, Node 24.22.1, Remotion 4.0.541, Chromium 155.0.8059.79 (uso autorizado pelo usuário).

## Resultado verificado

- MP4 real em `out/PilotoQuadrado15s.mp4`: 4,138,727 bytes.
- 1080×1920, 30 fps constantes, 450 quadros, duração exata de 15 segundos.
- H.264, yuv420p, BT.709. Sem faixa de áudio, intencionalmente.
- SHA-256: `5f496e030679d4dc4debce41479d6f5b31bb18e5b392847653afeb8a6a937698`.
- `npm run lint`, `npm run typecheck` e `npm run build`: passaram.
- Reinstalação `npm ci --offline --no-audit --no-fund`: passou com a permissão adequada de execução; o cache foi suficiente. A instalação inicial foi pela rede.
- `npm run validate`: 12 verificações passaram, mais decodificação integral com FFmpeg sem erros. As verificações incluem fechamento após quatro lados, desaceleração monotônica, congelamento persistente, codec, tamanho, duração e contagem de quadros.
- `npm run review`: 20 PNGs extraídos do próprio MP4, galeria HTML e folha de contato dos cinco planos.
- Remotion Studio iniciado e resposta HTTP 200 verificada. Renderização da composição demonstra carregamento dos componentes. Não foi feita inspeção interativa de reprodução no navegador do usuário.

## Revisão visual

Foram examinados quadros dos cinco planos, posições intermediárias e vizinhos dos cortes/eventos: 45, 90, 120, 165, 180, 210, 240, 257, 258, 269, 270, 290, 306, 307, 330, 359, 360, 390, 420 e 449. Na versão final, a folha de contato e o quadro 210 foram reabertos após o ajuste de enquadramento da mão.

Correções feitas durante a revisão: braço passou a baixar o giz; inclinação do tronco e olhar acompanharam o agachamento; marca no chão foi aproximada do giz; ponteiro ganhou continuidade temporal nos planos da cidade; pêndulo desacelera e congela sem salto de fase; reflexos ficaram visíveis ao final; manga foi reposicionada para caber no close. A primeira exportação full-range foi substituída pela exportação BT.709 com faixa de vídeo padrão, que passou na validação.

A arquitetura usa curvas, arcos e janelas ovais. O quadrado do close tem quatro lados de 250 unidades e ângulos retos; a mão segue o contorno. Fechamento no quadro 258 (8,60 s), parada no 307 (10,23 s). Após parar, o ponteiro conserva exatamente o mesmo ângulo até o fim do plano. O close final reutiliza a cabeça de Lio, com pupilas, sobrancelhas, boca e inclinação animadas. O céu completo não aparece: apenas reflexos geométricos antecipam a continuação.

## Restrições e escopo

Sem narração, trilha, efeitos sonoros ou legendas explicativas. Arte vetorial estilizada e animação limitada, não episódio final ou animação quadro a quadro. Edição por componentes React/TypeScript e timeline de sequências; não há um editor próprio sem código. Windows físico não foi testado; as instruções PowerShell estão no README. Não houve acesso a Notion ou arquivos pessoais, compras, APIs pagas, publicação ou envio a terceiros.

A rede bloqueou o site da documentação e o navegador padrão. Foram consultadas as Agent Skills e a documentação fonte oficial no GitHub. O template Blank veio do repositório oficial `remotion-dev/template-empty` após o inicializador falhar no download. O Chromium local foi autorizado explicitamente. Restrições EPERM do sandbox foram resolvidas pelas permissões de execução da plataforma; a instalação normal do esbuild e as verificações de integridade não foram desativadas.

## Configuração reutilizável do Cloud

`install_script` e `start_skill` foram salvos no rascunho do ambiente com instalação por lockfile, início do Studio, navegador autorizado, renderização e validação. Isso não publica o snapshot: para reutilizar em novas tarefas, revise e salve nas configurações do ambiente e publique pela interface. Uma nova tarefa restaurada ainda não foi testada.

Os arquivos de saída ficam fora do versionamento Git e estão incluídos no ZIP de entrega. O código-fonte e a documentação estão disponíveis para revisão no checkout. Na conclusão original, nenhum commit ou push havia sido feito. A preparação posterior para auditoria está registrada em `audit/DIRECAO-E-ARQUITETURA.md` e no manifesto de artefatos.


## Preparação posterior para auditoria

Fonte de renderização e binários originais preservados, sem nova renderização nem alteração narrativa. Dossiê de direção de arte, personagem, arquitetura e limitações em `audit/DIRECAO-E-ARQUITETURA.md`. Checksums em `audit/manifest.json`; resultado técnico original em `audit/validation-original.json`. Branch: `dev/auditoria-piloto-quadrado`. O ZIP original permanece inalterado; sua documentação registra o estado de entrega anterior à auditoria.
