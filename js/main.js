const projetos = [
    {
        id: 'resgate',
        titulo: 'Resgate',
        badge: 'Urgente',
        tipoBadge: 'badge-urgente',
        texto: 'A ONG atua no resgate de cães que vivem em situação de abandono, vulnerabilidade ou sofrimento. Após serem acolhidos, os animais recebem proteção imediata, alimentação adequada e os cuidados necessários para iniciar sua recuperação física e emocional.'
    },
    {
        id: 'transformacao',
        titulo: 'Transformação',
        badge: 'Em andamento',
        tipoBadge: 'badge-ativo',
        texto: 'Cada cão passa por um processo de reabilitação e preparação para a adoção. Durante essa etapa, recebe acompanhamento de saúde, cuidados de higiene, alimentação de qualidade e treinamento comportamental, desenvolvendo confiança e habilidades para uma convivência harmoniosa em família.'
    },
    {
        id: 'adocao',
        titulo: 'Adoção responsável',
        badge: '+600 adoções',
        tipoBadge: 'badge-sucesso',
        texto: 'Ao final dessa jornada, os cães são encaminhados para famílias cuidadosamente selecionadas e comprometidas com seu bem-estar. A adoção responsável garante que cada animal encontre um lar seguro, repleto de carinho, atenção e cuidados por toda a vida, proporcionando um recomeço feliz para cães e tutores.'
    }
];

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

function renderizar() {
    const rota = location.hash.replace('#', '') || 'inicio';
    const template = document.getElementById('pagina-' + rota);
    if (!template) return;

    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(template.content.cloneNode(true));
    renderizarProjetos();
}

window.addEventListener('hashchange', renderizar);
renderizar();

document.addEventListener('submit', function (evento) {
    if (evento.target.id !== 'form-cadastro') return;
    evento.preventDefault();

    const form = evento.target;
    const sucesso = document.getElementById('alerta-sucesso');
    const erro = document.getElementById('alerta-erro');

    if (form.checkValidity()) {
        sucesso.hidden = false;
        erro.hidden = true;
        form.reset();
    } else {
        erro.hidden = false;
        sucesso.hidden = true;
        form.reportValidity();
    }
});

document.addEventListener('input', function (evento) {
    if (!evento.target.closest('#form-cadastro')) return;

    document.getElementById('alerta-sucesso').hidden = true;
    document.getElementById('alerta-erro').hidden = true;
});

document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.menu-links a')) return;

    document.getElementById('menu-toggle').checked = false;
});