function renderizar() {
    const rota = location.hash.replace('#', '') || 'inicio';
    const template = document.getElementById('pagina-' + rota);
    if (!template) return;

    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(template.content.cloneNode(true));
}

window.addEventListener('hashchange', renderizar);
renderizar();