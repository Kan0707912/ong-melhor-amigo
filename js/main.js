const titulos = {
    inicio: 'Início',
    projetos: 'Projetos',
    cadastro: 'Cadastro'
};

function renderizar() {
    const rota = location.hash.replace('#', '') || 'inicio';
    const template = document.getElementById('pagina-' + rota);
    const app = document.getElementById('app');

    if (!template) {
        if (app.children.length === 0) location.hash = '#inicio';
        return false;
    }

    app.innerHTML = '';
    app.appendChild(template.content.cloneNode(true));
    document.title = titulos[rota] + ' | ONG Melhor Amigo';

    renderizarProjetos();
    restaurarRascunho();
    aplicarMascaras();
    return true;
}

window.addEventListener('hashchange', function () {
    if (renderizar()) document.getElementById('app').focus();
});

document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.menu-links a')) return;
    document.getElementById('menu-toggle').checked = false;
});

renderizar();