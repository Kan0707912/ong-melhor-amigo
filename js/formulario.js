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
        limparRascunho();
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
    validarCampo(evento.target);
});

document.addEventListener('input', function (evento) {
    if (!evento.target.closest('#form-cadastro')) return;

    salvarRascunho(evento.target.closest('#form-cadastro'));
    document.getElementById('alerta-sucesso').hidden = true;
    document.getElementById('alerta-erro').hidden = true;

    if (evento.target.classList.contains('campo-erro')) {
        validarCampo(evento.target);
    }
});