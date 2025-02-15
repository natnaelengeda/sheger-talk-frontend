const SERVICE_WORKER_FILE_PATH = "./sw.js";
const vapid_public_key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';
// const vapid_private_key = process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY || "";

export function notificationUnsupported(): boolean {
  let unsupported = false;
  if (
    !('serviceWorker' in navigator) ||
    !('PushManager' in window) ||
    !("showNotification" in ServiceWorkerRegistration.prototype)
  ) {
    unsupported = true;
  }
  return unsupported;
}

export async function registerAndSubscribe(
  onSubscribe: (subs: PushSubscription | null) => void,
): Promise<void> {
  try {
    await navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH);
    await subscribe(onSubscribe);
  } catch (error) {
    console.error("Failed to register service-worker:", error);
  }
}

async function subscribe(onSubscribe: (subs: PushSubscription | null) => void): Promise<void> {
  navigator.serviceWorker.ready
    .then((registration: ServiceWorkerRegistration) => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapid_public_key,
      });
    })
    .then((subscription: PushSubscription) => {
      // console.info("Createrd subscription Object: ", subscription.toJSON());
      // Submit Subscription to server.
      submitSubscription(subscription).then(() => {
        onSubscribe(subscription);
      });
    })
    .catch((error) => {
      console.error("Failed to subscribe cause of: ", error);
    })
}

async function submitSubscription(subscription: PushSubscription): Promise<void> {
  const endpointUrl = '/api/web-push/subscription';
  const res = await fetch(endpointUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subscription }),
  });
  const result = await res.json();
  console.log(result);
};

export function checkPermissionStateAndAct(
  onSubscribe: (subs: PushSubscription | null) => void,
): void {
  const state: NotificationPermission = Notification.permission;
  switch (state) {
    case 'denied':
      break;
    case 'granted':
      registerAndSubscribe(onSubscribe);
      break;
    case 'default':
      break;
  }
}

export async function sendWebPush(message: string | null): Promise<void> {
  const endPointUrl = '/api/web-push/send';
  const pushBody = {
    title: 'Test Push',
    body: message ?? 'This is a test push message',
    image: '/next.png',
    icon: 'nextjs.png',
    url: 'https://google.com',
  };
  const res = await fetch(endPointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pushBody),
  });
  const result = await res.json();
  console.log(result);
}
