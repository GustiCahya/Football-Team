export const requestPermission = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then((result) => {
            if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
            } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
            }
            
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then((registration) => {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array('BIJFX-HVpMG8cXjIOHu7XW2Li4iEqgMXzuIUzWaojLg1FlgnvJ1Nlvye5YpbZH4TC7HJOdUBer1nwt6rbAoLdHo') 
                    }).then(function(subscribe) {
                        console.log('the endpoint: ', subscribe.endpoint);
                        console.log('the p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('the auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error("can't do subscribe ", e.message);
                    });
                });
            }
        });
    }
}
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}