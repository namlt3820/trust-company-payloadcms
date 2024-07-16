# TrustCompany PayloadCMS

This is the backend for a review company website [TrustCompany](https://trustcompany.gladiolus.info/). It's powered by PayloadCMS and created from its [blank template](https://github.com/payloadcms/payload/tree/main/templates/blank). It includes some basic features typically found on a review company website:

1. Register users by email.
1. Create companies.
1. CRUD (Create, Read, Update, Delete) reviews.
1. CRUD comments.
1. Emojis.
1. Report/Feedback.

### ENV: CLIENT_URL and SERVER_URL

1. These two environment variables are used to set up CSRF/CORS rules in the payload.config.ts file.
1. This project consists of two components: a Next.js server as the frontend and a PayloadCMS server as the backend.
1. The PayloadCMS server URL is defined as `SERVER_URL`. And the Next.js server URL is defined as `CLIENT_URL`.
1. If you don't use Docker in local development, both values will have the same hostname (localhost) but different ports.
1. If you use a domain name in production, both values will also have the same hostname (the domain).
1. However, if you use Docker in local development, the `CLIENT_URL` and `SERVER_URL` might have different hostnames, hence the separation.
1. For example, `CLIENT_URL` can't use a container name because it's outside of the Docker context. Similarly, `SERVER_URL` can't use `localhost` because it points to the container itself, not to the host machine where Docker is running.

## Development

To spin up the project locally, follow these steps:

1. First clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env`
1. Next `yarn && yarn dev`
1. Now `open http://localhost:3000/admin` to access the admin panel
1. Create your first admin user using the form on the page

That's it! Changes made in `./src` will be reflected in your app.

### Production with Docker

To start up a docker container in your production environment, follow these steps:

1. First clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env.production`
1. Next `docker compose up --build -d`

That's it! The Docker instance will run and listen on port 3000 of your production machine.

## Production without Docker

To start up a Node.js server, you need to build and serve the Admin panel. To do so, follow these steps:

1. First invoke the `payload build` script by running `yarn build` or `npm run build` in your project root. This creates a `./build` directory with a production-ready admin bundle.
1. Then run `yarn serve` or `npm run serve` to run Node in production and serve Payload from the `./build` directory.

## Questions

If you have any issues or questions, reach out to me on [Email](mailto:namlt3820@gmail.com) or start a [GitHub issue](https://github.com/namlt3820/trust-company-payloadcms/issue).
