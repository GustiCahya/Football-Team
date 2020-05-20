const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIJFX-HVpMG8cXjIOHu7XW2Li4iEqgMXzuIUzWaojLg1FlgnvJ1Nlvye5YpbZH4TC7HJOdUBer1nwt6rbAoLdHo",
   "privateKey": "rakPqqjsJjibv1nIhz3D0Zwm2kJKDNu9_TvrdDr_y_Q"
};
 
webPush.setVapidDetails(
   'mailto:gusticahyax@yahoo.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/chndXIKw7GM:APA91bETFtu39EESJxkGo47mtOCyAe6ZChYsDT3w1Vv585m-7CoDQ0dQ4LhlpYVEksi0DB9gWEaQW6PDIjyLXsrMB07xXyhFIIOGwi-PxkHhUCSO5-Cb0VOkmuod_cshQG5gCi6Y502B",
   "keys": {
       "p256dh": "BBvLB7Tg++39XMM2ZUM39H2I6MVDBpo4AjsUaJmo2pFp4fk+IfUE8kGx4OOIcYgvXo5O49hdznGrIabn831Ke4A=",
       "auth": "MtyEBGM6Fq0KLKVB2dnzeg=="
   }
};
const payload = 'Hello! this is a notification...';
 
const options = {
   gcmAPIKey: '773744956151',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);