# Consummation Tracker

### A test project to test out my skills.

BE - Node.js <br />
FE - React

## Idea

A simple app that is capable of managing food entries. It has admin and user roles. The solutions are simplified in some
places (no deep validation of inputs, error handlers etc.). The idea was to just make the shape of the app that can be
detailed out later on demand.

## Structure

`client` & `server` directories that ideally should be separate repos, but that is redundant for current test project.
For detailed structure description of each repo go to specified directory of each app's part (`client`, `server`).

## Usage

To run the app locally follow these steps:

- run `npm initialize` to install all needed dependencies
- run `npm env-create` to create `.env` files
- install and start `mysql`
- create `database` and get url ot the created one
- inside `server` directory in `.env` file put db url to `DATABASE_URL`
- run `npm migrate` for migration
- run `npm seed` and press `Y` when prompted to seed db with fresh data
- run `npm start` to run the app
- inside `client` directory in `.env` file you can comment and uncomment `..._TOKEN` keys to get `user` or `admin` roles

## Technologies & Libraries used

### Backend:

- Node
- Express
- Prisma
- jsonwebtoken
- express-group-routes
- dotenv
- MySQL

### Frontend:

- React
- Typescript
- Axios
- React Query

