# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

## Meio de comunicação
https://ligapay.slack.com/messages/CGE844TRC/

## Preparação do ambiente
1. Instale o docker. (https://www.docker.com/products/docker-desktop)
2. Na pasta raíz do projeto rode o comando:
  ```
  docker-compose up
  ```  
3. Caso as tabelas no banco não sejam criadas rode o comando:
  ```
  docker exec -it ligapay-adonis sh
  ```  
