# Portfolio Parallax — Immersive Scroll Experience 🚀

> ⚠️ **STATUS: ABANDONADO / ARQUIVADO** 
> *Este projeto foi um experimento focado em recriar animações parallax controladas por scroll usando Next.js e Tailwind. Ele atingiu seu propósito de prova de conceito e não está mais sendo desenvolvido ou mantido.*

---

Um portfólio web de alta performance focado em *storytelling visual*. Este projeto recria experiências imersivas de landing pages modernas (como as páginas de lançamento de hardware da Apple), onde o usuário controla a reprodução de uma animação 3D ou sequência de imagens de alta resolução exclusivamente através do scroll do mouse.

## 💡 A Ideia
O objetivo central é abandonar as páginas estáticas tradicionais e criar uma jornada narrativa. O site é projetado como uma "linha do tempo" contínua onde a rolagem da página dita o ritmo da interface, revelando projetos, capacidades e informações de contato em sincronia milimétrica com uma animação de fundo em tela cheia.

## 🎯 Objetivos do Projeto
*   **Zero Dependências de Animação:** Criar uma experiência complexa de rolagem e animação de frames *sem* o uso de bibliotecas pesadas (como GSAP, Framer Motion ou Three.js), garantindo um bundle final extremamente leve.
*   **Performance Absoluta:** Evitar travamentos (jank) e layout shifts (CLS) comuns em animações baseadas no DOM.
*   **Controle Total do Scroll:** Mapear o progresso da página (0% a 100%) para disparar eventos assíncronos precisos de interface.

## ✅ O que já foi implementado (Status Final)

*   [x] **Arquitetura "Sticky Scroll" em Seção Única:** Substituição de seções empilhadas por um único container de `400vh` com um "viewport" fixo, permitindo fluidez contínua sem quebras de layout.
*   [x] **Motor de Animação WebP (Double-Buffering):** Sistema próprio de crossfade otimizado usando duas tags `<Image>`. Ele alterna inteligentemente o `src` e a opacidade dos frames para simular a reprodução de vídeo, sem sobrecarregar a árvore do DOM com centenas de tags `<img>`.
*   [x] **Sistema de Preload Nativo:** Um gerenciador de carregamento que carrega preventivamente os 192 frames da animação, exibindo uma tela de Loading visual elegante para o usuário antes de liberar a experiência.
*   [x] **Navegação por Porcentagem:** O Navbar foi reescrito para ignorar âncoras (IDs) tradicionais do HTML. Ele injeta o usuário exatamente na porcentagem de rolagem equivalente a cada "seção" visual (ex: Works a 25%, Capabilities a 50%).
*   [x] **Textos ancorados (Milestones):** Sistema de detecção de thresholds de rolagem que exibe/oculta sobreposições de texto usando transições nativas do Tailwind.

## 🛠 Tecnologias Utilizadas
*   **React / Next.js (App Router)** - Estrutura principal e otimização.
*   **Tailwind CSS** - Estilização utilitária e transições (fade, blur, mix-blend).
*   **TypeScript** - Tipagem forte para a lógica de interpolação de scroll.

## 🚀 Como rodar localmente (Histórico)

1. Clone este repositório.
2. Certifique-se de ter a pasta com as sequências de imagem geradas em `public/assets/001/` (nomeadas como `frame_0001.webp` a `frame_0192.webp`).
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra `http://localhost:3000` no seu navegador.
