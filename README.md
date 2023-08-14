## the gram

## Functionality

You can

- upload your photos
- view yours and others photos
- add comments on other users' photos

## Prerequisites

1. Node.js or nvm installed.
2. `pnpm` installed
3. Postgres installed

## How to run

1. run `pnpm` or `pnpm install`
2. run `pnpm migrate-dev` to run db migrations and `pnpm generate` to generate client
3. run `pnpm dev` to execute the dev app

Open http://localhost:3000 with your browser to see the result.

### Caveats

- session creation and maintainance is rudimentary.
  > Users are identified by usernames which are created by the user but on a conflict, the system appends the username with a unique token and creates a new user
- username added by the user can be non-unique as there is no check added for uniqueness.
- the user can refresh their session by deleting their browser data (cookies)
