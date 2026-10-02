function aplicarContraste(ativo) {
    document.body.classList.toggle('alto-contraste', ativo);

    const botao = document.getElementById('botao-contraste');
    if (botao) botao.setAttribute('aria-pressed', ativo);
}

document.addEventListener('click', function (evento) {
    if (evento.target.id !== 'botao-contraste') return;

    const ativo = !document.body.classList.contains('alto-contraste');
    aplicarContraste(ativo);
    salvarContraste(ativo);
});

aplicarContraste(lerContraste() || window.matchMedia('(prefers-contrast: more)').matches);