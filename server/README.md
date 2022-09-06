# Server directory

The server is written according to MVC pattern

## Structure
`controllers` - actions that are performed per request, differentiated by entities <br>
`middlewares` - middlewares directory <br>
`prisma` - Prisma service directory (schema, migrations, etc.) <br>
`requests` - requests validations directory <br>
`routes` - set of routes that are implemented in this app <br>
`services` - services for hiding controllers computation actions
