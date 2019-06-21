// Initialize your app
var serverHost = "http://103.31.109.106:2224/app-rest/";
var myApp = new Framework7({
	swipePanel: 'left',
	swipeBackPage: false,
 
	pushState: true, 
	modalTitle: 'BAPP', 
	onAjaxStart: function(xhr) { myApp.showPreloader(); }, 
	onAjaxComplete: function(xhr) { myApp.hidePreloader(); } 
});

 

// Export selectors engine
var $$ = Dom7;
profileCallback = false;
loginScreen = myApp.loginScreen();


    
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
	domCache: true //enable inline pages
});

$$(document).on('pageInit', function (e) {
	$(".swipebox").swipebox();
});	

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function get_jscookie(param){
	    var nameEQ = param + "=";
	    var ca = document.cookie.split(';');

	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;

}

function set_jscookie(cname, cvalue, minutes) {
    var d = new Date();
    d.setTime(d.getTime() + (minutes* 60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function del_jscookie(c_name) {
    document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
}

function linkButtonOpen(url  ){
    var kid = getParameterByName('kid');
    alert(kid);
    window.location.href = '/' + url +'/'+kid+'/'
    
}