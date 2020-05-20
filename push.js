const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIJFX-HVpMG8cXjIOHu7XW2Li4iEqgMXzuIUzWaojLg1FlgnvJ1Nlvye5YpbZH4TC7HJOdUBer1nwt6rbAoLdHo",
   "privateKey": "rakPqqjsJjibv1nIhz3D0Zwm2kJKDNu9_TvrdDr_y_Q"
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eWECUlMg4Cg:APA91bH5LC54VOP-56Nv4HUx-gLeNsKqQqmMlbk94-gMacaZCRvkNHnBCq81hWdjRSYZkn-xDFcQvc_t49Uj7Q61GYtWkGCQmGqaUkwGbjHyE1IyrYeOuhZzKPXJbMSJMtaT1lxQmRtH",
   "keys": {
       "p256dh": "BAPSqhBXsRnz3vAa+L+j6+D1CYP7QoUeLlOAQ98wryJR1Mk8+85lpHBjErcakYNsmnxDdJ6j1pMvRn8bkDaBENA=",
       "auth": "ly9W/RSfMIdyg6Yt4Le9+Q=="
   }
};
const payload = 'Hello! this is a notification from footballteam...';
 
const options = {
   gcmAPIKey: '773744956151',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);