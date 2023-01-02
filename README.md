# auth-project
Implementation of a auth system with NestJS and NextJS



# Server
### Move to server directory
```bash
$ cd auth-project/server
```

### Install dependencies
```bash
$ npm install
```

### Start Sqlite with prisma
```bash
$ npx prisma migrate dev
```

### Copy .env.exemplo to .env
```bash
$ cp .env.exemplo .env
```

### Start server
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Web App
### Go to web app directory
```bash
$ cd ..
$ cd web
```

### Install dependencies
```bash
$ npm install
```

### Copy .env.exemplo to .env
```bash
$ cp .env.exemplo .env
```

### Run web app
```bash
# watch mode
$ npm run dev
```

# Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
