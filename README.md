
 <img src="https://devellop.com.br/static/logo.png" width="200" height="102"/>

# Desafio - Desenvolvedor Fullstack Pleno
Seja bem-vindo! Este desafio foi projetado para avaliar a sua capacidade técnica como candidato à vaga de Desenvolvedor Fullstack Pleno.

## Instruções
- Faça um fork deste repositório;
- Utilize alguma das tecnologias (front-end e back-end) informadas na proposta desse desafio;
- Crie um passo a passo de como rodar a sua aplicação;
- Após finalizar, submeta um pull request com um comentário informando o seu e-mail de contato e aguarde nossa avaliação.

## Proposta
Você deverá desenvolver um blog. Para isso, separaremos a proposta desse desafio em duas etapas:

### Back-end
Desenvolva uma API utilizando Node.js que deve conter as seguintes rotas:
- `/register` - [POST] - esta rota deve cadastrar um usuário;
- `/login` - [POST] - esta rota deve autenticar um usuário;
- `/posts` - [POST] - esta rota deve cadastrar uma postagem mantendo a referência do autor. (requer autenticação);
- `/posts/{id}` - [PUT] - esta rota deve editar a postagem do ID especificado mantendo a referência do autor. (requer autenticação);
- `/posts` - [GET] - esta rota deve retornar a lista de todas as postagens ordenadas das mais recentes para as mais antigas com a possibilidade de inverter esta ordenação e de retornar apenas as postagens do usuário que fez a requisição (requer autenticação);
- `/posts/{id}` - [GET] - esta rota deve retornar a postagem do ID especificado com todos os seus dados  (requer autenticação);
- `/posts/{id}` - [DELETE] - esta rota deve deletar a postagem do ID especificado.

### Front-end

**Web:** Desenvolva uma aplicação web utilizando o React.js e esta deve atender as seguintes histórias:
 - Eu como usuário desejo me cadastrar;
 - Eu como usuário desejo realizar login;
 - Eu como usuário autenticado desejo visualizar todas as postagens;
 - Eu como usuário autenticado desejo visualizar os detalhes de uma postagem;
 - Eu como usuário autenticado desejo visualizar todas as minhas postagens;
 - Eu como usuário autenticado desejo criar uma postagem;
 - Eu como usuário autenticado desejo editar uma postagem que eu criei;
 - Eu como usuário autenticado desejo deletar uma postagem que eu criei.

**Mobile:** Desenvolva um aplicativo utilizando o React Native tendo as mesmas funcionalidades da aplicação web.

## Diferenciais
Consideraremos como diferenciais os seguintes pontos:
- Deploy realizado em qualquer ambiente em nuvem;
- Criação de testes unitários;
- Criação de testes de integração.


> **Observações:**
> - Suas aplicaçóes web e mobile DEVEM se comunicar com sua API;
> - Você pode utilizar o banco de dados de sua preferência (relacional ou não relacional).
