
//SHOTCAPTURE PAGE
$$(document).on('page:init', '.page[data-name="formshotcapture"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
        
    cordova.plugins.barcodeScanner.scan(
      function (result) { 
          $.get( serverHost + "json_submit_capturemcu.php?kid=" + kid + "&text=" + result.text , function( data ) {
                 
                console.log(data)
                 
                    app.dialog.alert( '<span style="font-size:13px">' + data.msg + '</font>', "Scan QR absen sukses" , function(){ location.href = 'index.html?kid=' + kid; }  );
                
            });
           
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : true, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   ); 
     
}) 