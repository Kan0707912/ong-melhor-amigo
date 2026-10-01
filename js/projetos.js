function renderizarProjetos() {
    const lista = document.getElementById('lista-projetos');
    if (!lista) return;

    lista.innerHTML = projetos.map(function (projeto) {
        return `
            <section id="${projeto.id}">
                <h2>${projeto.titulo}</h2>
                <span class="badge ${projeto.tipoBadge}">${projeto.badge}</span>
                <p>${projeto.texto}</p>
            </section>
        `;
    }).join('');
}
