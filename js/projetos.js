function renderizarProjetos() {
    const lista = document.getElementById('lista-projetos');
    if (!lista) return;

    lista.innerHTML = projetos.map(function (projeto) {
        return `
            <section id="${projeto.id}">
                <img src="${projeto.imagem}" alt="${projeto.alt}" width="400" height="260" loading="lazy">
                <h2>${projeto.titulo}</h2>
                <span class="badge ${projeto.tipoBadge}">${projeto.badge}</span>
                <p>${projeto.texto}</p>
            </section>
        `;
    }).join('');
}