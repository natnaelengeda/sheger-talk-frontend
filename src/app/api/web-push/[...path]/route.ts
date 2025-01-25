import webpush from 'web-push';

const vapid_public_key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
const vapid_private_key = process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY || "";

webpush.setVapidDetails(
  'mailto:mail@example.com',
  vapid_public_key,
  vapid_private_key,
);

let subscription: webpush.PushSubscription;

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case '/api/web-push/subscription':
      return setSubscription(request);
    case '/api/web-push/send':
      return sendPush(request);
    default:
      return noFoundApi();
  }
}

async function setSubscription(request: Request) {
  const body: { subscription: webpush.PushSubscription } = await request.json();
  subscription = body.subscription;
  return new Response(JSON.stringify({ message: "Subscription set." }), {});
}

export async function sendPush(request: Request) {
  console.log(subscription, 'subs');
  const body = await request.json();
  const pushPayload = JSON.stringify(body);
  await webpush.sendNotification(subscription, pushPayload);
  return new Response(JSON.stringify({ message: "Push sent." }));
}

async function noFoundApi() {
  return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
    headers: { 'Content-type': "application/json" },
    status: 404
  });
}

