const CHAVE_RASCUNHO = 'rascunho-cadastro';

function salvarRascunho(form) {
    const dados = Object.fromEntries(new FormData(form));
    delete dados.cpf;
    localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
}

function restaurarRascunho() {
    const form = document.getElementById('form-cadastro');
    if (!form) return;

    const texto = localStorage.getItem(CHAVE_RASCUNHO);
    if (!texto) return;

    const dados = JSON.parse(texto);
    for (const nome in dados) {
        if (form.elements[nome]) form.elements[nome].value = dados[nome];
    }
}

function limparRascunho() {
    localStorage.removeItem(CHAVE_RASCUNHO);
}

function salvarContraste(ativo) {
    localStorage.setItem('alto-contraste', ativo ? 'sim' : 'nao');
}

function lerContraste() {
    return localStorage.getItem('alto-contraste') === 'sim';
}

