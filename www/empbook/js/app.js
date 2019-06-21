
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
    document.addEventListener("backbutton",  function (e) {  location.href="/appview/index.html?kid=" + getParameterByName('kid')}   );  
}


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'm' is meters                                      :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function distance_two_coordinates(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="m") { dist = dist * 1609.344 }
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	} 
}

function get_book_close(){
    location.href =  "../appview/index.html?kid=" + getParameterByName('kid')
}