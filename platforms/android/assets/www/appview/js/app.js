
// Framework7 App main instance
var app  = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Framework7', // App name
    panel: {
        swipe: 'left', 
    }, 
    theme: 'auto', // Automatic theme detection 
    // App root methods
    onAjaxStart: function(xhr) { myApp.showPreloader(); }, 
    onAjaxComplete: function(xhr) { myApp.hidePreloader(); } ,
     

    // App routes
    routes: routes,
});

// Dom7
var $$ = Dom7;
 
// Init/Create views
var homeView = app.views.create('#view-home', {
    url: '/home/'
}); 
var settingsView = app.views.create('#view-setelan', {
    url: '/setelan/'
});


var kid =  getParameterByName('kid'); 

if ($$('body').hasClass('with-panel-left-cover')) {
    console.log('Left Panel is opened')
}

function update_pin(){
    var pin_lama = document.getElementById("pin_lama").value;
    var pin_baru = document.getElementById("pin_baru").value;
    var pin_confirm = document.getElementById("pin_confirm").value;
    var kid =  getParameterByName('kid'); 
    
    $.post( serverHost + "pin_update.php", { pin_lama: pin_lama , pin_baru : pin_baru , pin_confirm : pin_confirm , kid :kid })
        .done(function( data ) { 
            respData = JSON.parse( data ); 
        
            if(respData.resp == 1){   
                alert("Ganti pin berhasil");
                location.href="../login.html"; 
               }
            else if(respData.resp == 3){
               alert("PIN Baru hanya format 6 digit angka");
               
              }
            else if(respData.resp == 2){
               alert("PIN Baru dan konfirmasi beda");
               
              }
            else if(respData.resp == 4){
               alert("PIN Lama salah");
              }
              return;
        });
}

function download_pdf(  karyawan_id , periode_id ){ 
    var pdfFile = "http://103.31.109.106:2224/index.php?com=report&task=slip_gaji&karyawan_id="+ karyawan_id +"&periode_id="+ periode_id; 

    window.open(pdfFile, '_system');
    navigator.app.loadUrl(pdfFile, {openExternal : true});
    return;
}  

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("backbutton", function (e) {
        /*conf = confirm('Mau menutup aplikasi?');
        if(conf)
            navigator.app.exitApp();
        else   
            e.preventDefault();*/
        app.router.navigate('/home/');
    }, false ); 
}