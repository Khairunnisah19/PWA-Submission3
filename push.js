var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BB4G2DvNBStUz1DztTRgX0bjyGk3Qs_yhKeZYEyOth1XpdZS8vKe6GqkDr5JhJCXVrTJ9Jig-s-49a6qjsP0L_U",
   "privateKey": "tNOJd6FOjXy48AgO5HEvnYP00h0CHmQvOJD2YAJE9MY"
};
 
 
webPush.setVapidDetails(
   'mailto:khairunnisah.xix@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/d6Js9hjFJfo:APA91bEDyvDgYjGPlsrsnaJdFoAyBScAzZhcefByE2hPDH_J5WsId0xnkGutjBjrgDWM7cdHEU28dRb5Ov2gISGR6oF_c40Feubtt8njfxjkE-Juw0aT4R7s89ZuF_HMZoBL4xqUy4zN",
   "keys": {
       "p256dh": "BA21xHc0+r22Cxv/KTVDeOUSCoPmsFTvfP55MUlL4fBTtmUBHvcHalqtDcPPClp9klUjgEKX28aXTVGOVdSFkMs=",
       "auth": "M6pJliQYwVA9AEJV7tAAiQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1045599554009',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);