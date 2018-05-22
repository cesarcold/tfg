var path="http://catalunyaprobass.com/tfg/";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        plataforma=device.platform;
        var element = document.getElementById('deviceProperties');

   console.log( 'Device Platform: ' + plataforma + '<br />' +
                        'Device UUID: '     + device.uuid     + '<br />' +
                        'Device Version: '  + device.version  + '<br />');
        app.setupPush();

    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "229149759092"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

			console.log( path+'ajax/registerdevice.php?'+'datos='+data.registrationId+'||'+plataforma);
                 jQuery.ajax({
        url: path+'ajax/registerdevice.php',
        type:'POST',
        data:'datos='+data.registrationId+'||'+plataforma,
        dataType:'json',
        success:function(response){
          if (response.msg=='primera'){
         //   alert('Su teléfono ha quedado registrado');

          }


        },
        error:function(xhr, status){
        //  alert(status, 'ERROR');

        }
      });

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
            
      alert("push error = " + e.message);

        });

        push.on('notification', function(data) {
            console.log('notification event');

    cordova.plugins.notification.badge.set(0);
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};

