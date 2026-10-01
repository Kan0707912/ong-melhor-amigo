function renderizar() {
    const rota = location.hash.replace('#', '') || 'inicio';
    const template = document.getElementById('pagina-' + rota);
    if (!template) return;

    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(template.content.cloneNode(true));

    renderizarProjetos();
    restaurarRascunho();
    aplicarMascaras();
}

window.addEventListener('hashchange', renderizar);

document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.menu-links a')) return;
    document.getElementById('menu-toggle').checked = false;
});

renderizar();