
## Instruções para rodar o projeto 

Após realizado o dowload do projeto cerifique-se que o docker esteja rodando, um comando que pode confirmar isso é rodar um 'docker version'.

A seguir os comandos para iniciar o docker com o postgress, caso queira alterar e não rodar o docker editar o arquivo 'ormconfig.json' de acordo com o ambiente em que desejar.

```bash
docker compose build
docker compose up -d
```

Após iniciado o container docker com o banco de dados já podemos rodar o projeto para isso é necessário instalar as depências, no meu caso vou estar utilizando o yarn porém o mesmo processo pode ser seguido com o npm.

```bash
yarn || npm install
```

Outra coisa importante de se definir é o arquivo de configuração, crie um arquivo na raiz do projeto chamado .env e então coloque as seguintes keys do pinata.
```.env
PINATA_API_KEY 
PINATA_SECRET_API
```

Para rodar o projeto em modo de desenvolvimento e rodar as migrations do banco.
```bash
yarn db:dev
yarn dev:server 
```

Para rodar o testes do projeto existem alguns comandos, mas é necessário antes de roda-los configurar o banco de dados local para teste, o comando para isto estará em primeiro.
```bash
yarn db:test
yarn test 
```

Para rodar o projeto compilado pronto para produção deixei configurado o mesmo banco utilizado em dev apenas para fins demonstrativos, lembrando que essas configurações podem ser alteradas em 'ormconfig.json'. Caso tenha alterado o arquivo será necessário rodar as migrations novamente, porém nesse caso se pode apenas seguir com os comandos. 
```bash
yarn build
yarn start
```

## Rotas para realizar as requisições 
GET '/asset' => lista os assets cadastrados.
POST '/asset' => cadastra um novo asset ( enviar: name, description, image )

GET '/nft' => lista as nfts cadastradas.
POST '/nft' => registra um novo nft ( enviar: asset, quantity )
