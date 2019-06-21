$$(document).on('page:init', '.page[data-name="home"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
   app.router.navigate('/home/'); 
     
}) 

$$(document).on('page:init', '.page[data-name="home1"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
         
    $.get(   serverHost + "emp.php?kid="+kid                , function( data ) { 
        respData = JSON.parse( data ); 
         
        var myDiv = document.getElementById("myarea1");
        myDiv.innerHTML = '<div style="float:left;width:30%;min-width:160px;"><center><img src="'+serverHost+'photo.php?kid='+kid+'" style="max-width:200px;border-radius: 20px; border: 3px solid blue;"/> </center></div> <div style="float:right;width:55%;min-width:200px;"><div style="text-align: left;width:100%;line-height:22px;">'+ display_vcard(respData.nama , respData.nik , respData.tmb) +' </div></div><div style="clear: both"></div>';
         
    }); 
    
    notifikasi_area();
}) 

function display_vcard(nama , nik , tmb){
    var myDate = new Date();
    var hrs = myDate.getHours();
    var mnt = myDate.getMinutes();
    
    if(hrs.toString().length < 2 ){
        hrs_label = '0' + hrs
    }else{
        hrs_label =   hrs
    }
    if(mnt.toString().length < 2 ){
        mnt_label = '0' + mnt
    }else{
        mnt_label =   mnt
    }
    var waktu = hrs_label + ':' + mnt_label; 
    var greet;

    if (hrs < 10)
        greet = 'Selamat pagi,<br/> saat ini pukul ';
    else if (hrs >= 10 && hrs < 15 )
        greet = 'Selamat siang, <br/>sekarang jam ';
    else if (hrs >= 15 && hrs <  19)
        greet = 'Selamat sore, <br/>sekarang jam ';
    else if (hrs >= 19  )
        greet = 'Selamat malam';
    
    layout = '<table width="100%" border="0" cellspacing="2"><tr><td colspan="2"><span style="font-size:17px;font-family:obvia"><i>'+ greet + waktu +'</i><br /><br /></span></td></tr><tr><td width="25%"><b>Nama</b></td><td width="75%">'+ nama +'</td></tr> <tr><td width="25%"><b>NIK</b></td><td width="75%">'+ nik +'</td></tr><tr><td width="25%"><b>TMB</b></td><td width="75%">'+ tmb +'</td></tr></table>';
    return layout;
}

function notifikasi_area(){
    $.get(   serverHost + "json_notification.php?kid="+kid  , function( data ) {  

        textAdd = ''; 
        for (var iz in data) {   
            console.log(data[iz].type)
             textAdd += '<li class="swipeout" style="margin:2px;"><div class="swipeout-content item-content" style="border:1px solid blue;background-color: #bed2f1;">'+ 
               '<div class="item-media" style="text-align: right;font-size:11px;"> '+ data[iz].message +' </div></div> ';
              if( iz == 0){ 
                textAdd += ' <div class="swipeout-actions-right">  <a href="#">.</a> </div> </li>';
              }else if(  data[iz].type == 'info'){ 
                 textAdd += ' <div class="swipeout-actions-right">  <a href="#" onclick="notifikasi_delete('+ iz +'  )">DEL</a> </div> </li>';
             }else{  
                textAdd += ' <div class="swipeout-actions-right">  <a href="#" onclick="info_notifikasi('+ iz +' , \''+ data[iz].message +'\' , \''+ data[iz].type +'\' , '+ data[iz].refer_id +' )">OPEN</a> </div> </li>';
             }
        } 
        var myNotif = document.getElementById("notification_all1");
        myNotif.innerHTML = textAdd;

    });
    
}


function info_notifikasi(id , message , type , refer_id){
    
    if( type == 'cuti' ){ 
        notifikasi_approve_cuti(id , refer_id );
        
    }else if( type == 'cuti_batal' ){    
        notifikasi_approve_batalcuti(id , refer_id );
        
    }else if( type == 'jalan' ){    
        notifikasi_approve_jalandinas(id , refer_id );
        
    }else if( type == 'lembur' ){   
        notifikasi_approve_lembur(id , refer_id );
        
    }else if( type == 'ijin' ){ 
        notifikasi_approve_ijin(id , refer_id );
        
    }else if( type == 'dinas' ){  
        notifikasi_approve_tukar_dinas(id , refer_id );
        
    }else{        console.log(type) 
        notifikasi_delete_view( id , message ,type , refer_id  );
        
    }
}






function notifikasi_delete(id){
    var kid =  getParameterByName('kid'); 
    $.get(   serverHost + "json_notification.php?kid="+kid +"&action=delete&id=" + id  , function( data ) {
         
        app.notification.close();
        notifikasi_area(); 
    });
    
    return;
}

function notifikasi_delete_view( id , message ,type , refer_id){
     console.log(serverHost + "json_notification_info.php?refer_id="+ refer_id +"&type="+ type +"&id=" + id) 
    textContent = '<p><center><input type="button" value="HAPUS" onclick="notifikasi_delete('+id+');" style="height:26px;color:#fff;width:120px;background-color:red;"/> </center></p>';
    
    $.get(   serverHost + "json_notification_info.php?refer_id="+ refer_id +"&type="+ type +"&id=" + id  , function( data ) {
           console.log(data) 
            var notificationClickToClose = app.notification.create({ 
              /*title: 'Notifikasi info<br/>', */
              subtitle: '<font color="green">'+message+'</font><hr/><p></p>',
              text:  data[0].message +'<br />'+ textContent,
              closeButton: true,
            });
        notificationClickToClose.open();
    });
    
    return;
}



