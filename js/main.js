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
    restaurarRascunho();
    aplicarMascaras();
}

window.addEventListener('hashchange', renderizar);
renderizar();

const regras = {
    nome: {
        teste: function (v) { return v.trim().length >= 3; },
        mensagem: 'Informe seu nome completo (mínimo 3 letras).'
    },
    cpf: {
        teste: function (v) { return /^\d{11}$/.test(v.replace(/\D/g, '')); },
        mensagem: 'O CPF deve ter 11 números.'
    },
    email: {
        teste: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
        mensagem: 'E-mail inválido. Exemplo: nome@email.com'
    },
    telefone: {
        teste: function (v) { return v === '' || /^\d{10,11}$/.test(v.replace(/\D/g, '')); },
        mensagem: 'Telefone com DDD: 10 ou 11 números.'
    }
};

function validarCampo(campo) {
    const regra = regras[campo.id];
    if (!regra) return true;

    const valido = regra.teste(campo.value);
    campo.classList.toggle('campo-erro', !valido);
    campo.classList.toggle('campo-ok', valido);

    let aviso = document.getElementById('erro-' + campo.id);
    if (!aviso) {
        aviso = document.createElement('small');
        aviso.id = 'erro-' + campo.id;
        aviso.className = 'mensagem-erro';
        campo.insertAdjacentElement('afterend', aviso);
    }
    aviso.textContent = valido ? '' : regra.mensagem;

    return valido;
}

function salvarRascunho(form) {
    const dados = Object.fromEntries(new FormData(form));
    delete dados.cpf;
    localStorage.setItem('rascunho-cadastro', JSON.stringify(dados));
}

function restaurarRascunho() {
    const form = document.getElementById('form-cadastro');
    if (!form) return;

    const texto = localStorage.getItem('rascunho-cadastro');
    if (!texto) return;

    const dados = JSON.parse(texto);
    for (const nome in dados) {
        if (form.elements[nome]) form.elements[nome].value = dados[nome];
    }
}

function aplicarMascaras() {
    if (typeof IMask === 'undefined') return;

    const cpf = document.getElementById('cpf');
    if (!cpf) return;

    IMask(cpf, { mask: '000.000.000-00' });
    IMask(document.getElementById('cep'), { mask: '00000-000' });
    IMask(document.getElementById('telefone'), {
        mask: [
            { mask: '(00) 0000-0000' },
            { mask: '(00) 00000-0000' }
        ]
    });
}

document.addEventListener('submit', function (evento) {
    if (evento.target.id !== 'form-cadastro') return;
    evento.preventDefault();

    const form = evento.target;
    const sucesso = document.getElementById('alerta-sucesso');
    const erro = document.getElementById('alerta-erro');

    let formValido = true;
    for (const id in regras) {
        const campo = document.getElementById(id);
        if (!validarCampo(campo)) formValido = false;
    }

    if (formValido) {
        sucesso.hidden = false;
        erro.hidden = true;
        localStorage.removeItem('rascunho-cadastro');
        form.reset();
        form.querySelectorAll('.campo-ok').forEach(function (c) {
            c.classList.remove('campo-ok');
        });
    } else {
        erro.hidden = false;
        sucesso.hidden = true;
        form.querySelector('.campo-erro').focus();
    }
});

document.addEventListener('focusout', function (evento) {
    if (!evento.target.closest('#form-cadastro')) return;
    salvarRascunho(evento.target.closest('#form-cadastro'));
    validarCampo(evento.target);
});

document.addEventListener('input', function (evento) {
    if (!evento.target.closest('#form-cadastro')) return;

    document.getElementById('alerta-sucesso').hidden = true;
    document.getElementById('alerta-erro').hidden = true;

    if (evento.target.classList.contains('campo-erro')) {
        validarCampo(evento.target);
    }
});