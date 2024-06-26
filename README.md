# auth-project
Implementation of a auth system with NestJS and NextJS

## Technologies

This project was developed using the following technologies:

- [NextJS](https://nextjs.org/docs)
- [NestJS](https://docs.nestjs.com/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)

## Getting Started 
### Server
#### Move to server directory
```bash
$ cd auth-project/server
```

#### Copy .env.exemplo to .env
```bash
$ cp .env.exemple .env
```

#### Install dependencies
```bash
$ npm install
```

#### Start Sqlite with prisma
```bash
$ npx prisma migrate dev
```

#### Start server
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Web App
#### Go to web app directory
```bash
$ cd ..
$ cd web
```

#### Copy .env.exemplo to .env
```bash
$ cp .env.exemplo .env
```

#### Install dependencies
```bash
$ npm install
```

#### Run web app
```bash
# watch mode
$ npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
