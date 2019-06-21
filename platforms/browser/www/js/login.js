 
var serverHost = "http://103.31.109.106:2224/app-rest/";
var xhr;
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
 
function login_app(   ){ 
    
    var nik = document.getElementById("nik").value;
    var bdate = document.getElementById("pin").value; 
     
    $.post( serverHost + "login.php", { deviceid: '' , nik : nik , bdate : bdate })
        .done(function( data ) { 
            respData = JSON.parse( data ); 
        
            if(respData.karyawan_id > 0){  
                    location.href = "appview/index.html?kid=" + respData.karyawan_id;
                    //location.href = "gaji.html?key=" + respData.key+"&kid="+respData.karyawan_id+"&pid="+respData.periode_id;
               }
            else{
              alert('Verifikasi salah!' ,'Error');
              }
              return;
        });
     
         
}
    
function login_by_device( ){
    
        $.post( serverHost + "login.php", { deviceid: device.uuid  })
        .done(function( data ) {
            respData = JSON.parse( data );  
            if(respData.karyawan_id > 0){ 
                    return;
                    //location.href = "appview/index.html?kid=" + respData.karyawan_id;
            }
            return;
                 
        });  
     
}
 
 

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    document.addEventListener("backbutton", function (e) {
        conf = confirm('Mau menutup aplikasi?');
        if(conf)
            navigator.app.exitApp();
        else   
            e.preventDefault();
    }, false );
    login_by_device( ); 
}


function getParameterValue(type) {
    type = type.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + type + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var myApp = new Framework7({
	swipePanel: 'left',
	swipeBackPage: false,
 
	pushState: true, 
	modalTitle: 'HRIS Go', 
	onAjaxStart: function(xhr) { myApp.showPreloader(); }, 
	onAjaxComplete: function(xhr) { myApp.hidePreloader(); } 
});

 

// Export selectors engine
var $$ = Dom7;
profileCallback = false;
loginScreen = myApp.loginScreen();