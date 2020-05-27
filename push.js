const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BO-qthm5uIYjcuptecVM2LylLMmi0xaE9gB2KP8o-trhBrJwZvHp79ID_0duHklrQAyk-_SmDW6pKDm2kqBzDwU",
   "privateKey": "8ZPcmOwOK8mxhMXuj7CmJ8kNEBDrUvpeboro75-_Qpc"
};
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c7z2QTFaufY:APA91bFqp0WqHfYV08SR1IYl_Crn6Q7Q_8U5qaV8kAGoMEqp6YlX93m96jbXru0ZH4hWVHtsKf5wo8r5ZVhS9Q-Tqr42ueyexDyBIIiYN7Cs3SQMB-IulVCicHBlZSIxwUDenEdDUBRy",
   "keys": {
       "p256dh": "BCfYEkI1bBoacMcZilxNj8wGtR6KZh9WanbIKQiMfJOG65dtBrgQZWo2I7jAqDc47tTR9c2i7M6toC9tsEDpagw=",
       "auth": "gU/nf8nTEAbKm16pFVjfzQ=="
   }
};
const payload = 'Hello! this is a notification from footballteam...';
 
const options = {
   gcmAPIKey: '388306245921',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);