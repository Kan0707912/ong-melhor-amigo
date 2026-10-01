# ONG Melhor Amigo

Site institucional da ONG Melhor Amigo, dedicada ao resgate, à reabilitação e à adoção responsável de cães. Projeto desenvolvido na disciplina Desenvolvimento Front-End para Web (Ciência da Computação — Cruzeiro do Sul).

## Funcionalidades

- Navegação SPA (Single Page Application) com roteamento por hash
- Cartões de projetos gerados dinamicamente a partir de dados em JavaScript
- Formulário de cadastro com validação própria (RegEx) e mensagens de orientação
- Rascunho automático do formulário com localStorage (o CPF não é armazenado, por privacidade)
- Máscaras de CPF, telefone e CEP com a biblioteca IMask
- Layout responsivo (mobile-first) com CSS Grid, Flexbox e menu hambúrguer

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid, Flexbox, media queries)
- JavaScript puro (Vanilla JS)
- [IMask](https://imask.js.org/) via CDN

## Estrutura de pastas

```
ong-caes/
├── css/
│   ├── variaveis.css     # design system (cores, tipografia, espaçamentos)
│   └── style.css         # estilos e responsividade
├── html/
│   └── index.html        # página única (SPA) com os templates
├── imagens/
├── js/
│   ├── dados.js          # dados dos projetos
│   ├── projetos.js       # renderização dos cartões
│   ├── armazenamento.js  # localStorage (rascunho)
│   ├── formulario.js     # validação, máscaras e eventos
│   └── main.js           # roteador e inicialização
└── README.md
```

## Como executar

1. Clone o repositório:
   `git clone https://github.com/Kan0707912/ong-melhor-amigo.git`
2. Abra o arquivo `html/index.html` no navegador.

Não é necessário instalar dependências. A biblioteca IMask é carregada via CDN; sem internet, o site funciona normalmente, apenas sem as máscaras.

## Fluxo de versionamento

O projeto segue o modelo **GitFlow**:

- `main`: versões estáveis publicadas
- `develop`: integração do desenvolvimento
- `feature/*`: uma branch para cada nova funcionalidade, integrada à `develop` via pull request
- `hotfix/*`: correções urgentes na versão publicada

Os commits seguem o padrão semântico: `feat`, `fix`, `refactor`, `style` e `docs`.

## Autor

Candido Portinari do Nascimento — [GitHub](https://github.com/Kan0707912)