# Liveworks

This repo only contains the application code. Infrastructure code will be hosted on another repo.

Only technical information on how to start the system will be posted in this readme. Everything else is on confluence.

### Parts

Frontend: NextJS using react

Backend: GraphQL API written in typescript

Database: PostgreSQL

Authentication: AWS Cognito (using [aws amplify auth](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)

### Getting Started

Local Development:

1. Run `docker-compose up -d`
2. Frontend is on `localhost:3000`
3. Backend is on `localhost:4000/graphql`

Production:
`infrastructure` stack is responsible for pushing this into production.

### Docker commands:

Bringing things down (doesn't delete the volumes, just brings down container)

```
docker-compose down
```


Bringing everything down, along with the volumes (DONT USE THIS IN PROD OR BAD THINGS WILL HAPPEN)

```
docker-compose down -v
```

Rebuilding everything along with all the images (useful when you are rebuilding from a new branch or after a PR)

```
docker-compose up -d --build
```

### How to talk to API

As the API makes new resolvers, they can be included for the frontend to use in the `/app/src/graphql/mutations` or `/app/src/graphql/queries` folder.

### How it works

The frontend is composed of a NEXTJS project written in ts. The backend exists of a graphql server, also written in ts.

We use Mikro-ORM for the database interface. It also handles migrations out of the box for us which is really helpful when we get to production.

Following the DRY principle, when you run the backend api, the frontend will automatically create the types for you based on the graphql schema!

Any changes made to the backend code will be reflected in the frontend without much hassle.

This repo allows you to run the frontend and backend from your machine. No more messing with cloud crap like appsync or lambda functions (although they have their own place, but we won't talk about it here)

The simple `docker-compose up -d` command will allow you to start the graphql server, the react frontend and a simple psql database.

All of them hooked up and ready to go.

Bonus: You also get hot reloading out of the box, so any changes made on your host machine, will be reflected inside the containers.

Find out how I made this happen by learning more about docker compose [here](https://gabrieltanner.org/blog/docker-compose).
