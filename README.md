# Anti-Geekie

## O que é?

Anti-Geekie é um script desenvolvido para desativar os mecanismos de monitoramento presentes na plataforma Geekie One. O script remove bloqueios de funcionalidades do navegador, desativa rastreamento de atividades e restaura funcionalidades normais do navegador como copiar, colar, selecionar texto e usar o botão direito do mouse.

## Por que existe?

O Geekie basicamente fica monitorando cada coisa que você faz durante uma sessão de responder perguntas. Ele salva tudo o que você faz, como cliques, seleções de texto, copias, coladas, mudar de pagina, etc... Basicamente criado para restaurar a privacidade e liberdade dos alunos ao utilizar a plataforma removendo essas funções invasivas.

## Como funciona?

O script desativa os seguintes mecanismos de monitoramento:

- Bloqueio de eventos de clipboard (copiar, colar, cortar)
- Detecção de mudança de aba/visibilidade da página
- Monitoramento de foco/perda de foco da janela
- Requisições de rastreamento para servidores da Geekie
- Bloqueio de seleção de texto e menu de contexto

## Como usar

1. Abra a plataforma Geekie One no seu navegador
2. Antes de iniciar uma atividade, pressione `F12` ou `Ctrl+Shift+I` para abrir as Ferramentas de Desenvolvedor
3. Vá para a aba "Console"
4. Cole o código do script inteiro (conteúdo do arquivo script.js)
5. Pressione `Enter`
6. Você verá mensagens no console indicando que o script foi executado com sucesso
7. Inicie a atividade de sua escolha

## AVISO IMPORTANTE

Este script foi criado exclusivamente para fins educacionais. O uso deste script não garante conformidade com os termos de serviço da plataforma Geekie One. Use por sua própria conta e risco. 