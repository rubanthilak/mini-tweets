import { getUserFromJwtToken } from '$utils/account'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {

  if (!event.url.pathname.startsWith('/login') && !event.url.pathname.startsWith('/signup')) {
    event.locals.user = getUserFromJwtToken(event.request.headers.get('cookie'));
  }

  const response = await resolve(event, {
    ssr: false
  });
  return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  return event.locals.user
    ? {
        user: {
          // only include properties needed client-side —
          // exclude anything else attached to the user
          // like access tokens etc
          id: event.locals.user.id,
          name: event.locals.user.name,
          email: event.locals.user.email
        }
      }
    : {};
}