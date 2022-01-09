# Liveworks Server

Steps to run this project:

1. Run `npm i` command
2. Run `npm start` command


### Skeleton

./

`Entities`

This is where we'll declare each separate entity, in graphql that means a type and in mikroorm that translates to a database table. To read more about entities, visit the [entity docs](https://mikro-orm.io/docs/defining-entities/).

Roughly speaking an entity translates to a database table. Since entities are OOP, you can employ polymorphism and inheritance to do some cool stuff!


./

`modules`

Essentially this is where the resolvers for graphQL are made, in the near future it will also have tests for each resolver too. Each module is the graphql api endpoint. We are using a code-first approach, which means we make our api endpoints in ts and then run a compiler to generate the graphql schema, since its more typesafe.


./

`orm`

Mainly for migrations only. I can't think of anything else to put there.

./

`utils`

Utilities will be here. Things like time utils etc go here.


### Testing

You can run test by running `npm run test`. It will setup a dummy database for you to run tests with. This section needs more expansion.