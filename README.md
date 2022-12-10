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
For detailed structure description of each counterpart go to specified directory of each app's part
(`client`, `server`).

## Usage

To run the app locally follow these steps:

- run `npm run install-deps` to install all needed dependencies
- run `npm run env-create` to create `.env` files
- install and start `mysql`
- create `database` and get url of it
- inside `server` directory in `.env` file put db url to `DATABASE_URL`
- run `npm run migrate` for migration
- run `npm run seed` and press `Y` if/when prompted to seed db with fresh data
- run `npm start` to run the app
- inside `client/src/resources/constants.ts` file you can comment and uncomment `JWT_TOKEN` keys to get `user`
  or `admin` roles

## App flow

### User:
- Add new entries
- Update existing entries
- Delete existing entries
- Filter entries by date

### Admin:
- Go to http://localhost:3000/admin/overview to watch users statistics
- Go to user's profile and perform everything a user can do.

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
- AntDesign

