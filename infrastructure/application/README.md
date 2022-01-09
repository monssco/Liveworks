# Liveworks

This repo only contains the application code. Infrastructure code will be hosted on another repo.

Since we will be using AWS Cognito to handle auth in the production application, there are some assumptions when it comes to this repo's code.

Mainly you will see that I provide the api `/api/src/server.ts` with a false token (making it look like the requests are coming in with a cognito auth token attached), but in reality that token is not real and is just for local testing. I also seed the database with a false user from a unique uuid embedded in the aforementioned token, this is just for development and will be removed in the real application.

Only technical information on how to start the system will be posted in this readme. Everything else is on confluence.

### Pre-reqs

Make sure you have installed the following tools:

1. Docker (Docker Desktop also works)
2. NPM

### Getting Started

Frontend: NextJS using react

Backend: GraphQL API written in typescript

Database: PostgreSQL

Local Development:

1. First, start the database. Run `docker-compose up -d db`

2. Then, start the backend api. Navigate to the api folder and run `npm i` followed by `npm run dev`. Let it load up and make sure there are no errors. At this point you should see a link to access the API interface: http://localhost:4000

3. Open another Terminal tab and start the frontend by navigating to the `app` folder and run `npm i` followed by `npm run codegen`, `npm run build` and finally `npm run dev` and navigate to the link provided by the frontend (http://localhost:3000)

Production:
// TODO: I have yet to push this into production.

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
