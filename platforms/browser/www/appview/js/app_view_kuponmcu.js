
$$(document).on('page:init', '.page[data-name="kuponmcu"]', function (e) { 
     
    
    $.get(   serverHost + "json_data_kupon_mcu.php?kid="+kid , function( data ) { 
        var kid =  getParameterByName('kid')  
        document.getElementById('nik_karyawan_mcu').value=  data.karyawan_data 
        document.getElementById('tmb_karyawan_mcu').value=  data.karyawan_tmb 
        document.getElementById('periode_karyawan_mcu').value=  data.periode 
        if( 'Tidak tersedia' == data.periode)
            document.getElementById('imgqr').src='http://103.31.109.106:2224/phpqrcode/image_not_show.jpeg' 
        else
            document.getElementById('imgqr').src='http://103.31.109.106:2224/phpqrcode/examples/mcucode.php?key=NIK' + data.qrshow 
        console.log(data)
    });
    
    
    //var myDivLabel = document.getElementById("riwayat_cuti");
    //myDivLabel.innerHTML =  ;
})  

$$(document).on('page:init', '.page[data-name="medical"]', function (e) { 
    $.get(   serverHost + "json_data_menu_mcu.php?kid="+kid , function( data ) {
        
        if( data.status == 0 ){
            document.getElementById('button_officer').style.display='none'; 
             
        } 
    });
});

$$(document).on('page:init', '.page[data-name="requestpage"]', function (e) { 
    $.get(   serverHost + "json_data_menu_spd.php?kid="+kid , function( data ) {
        
        if( data.status == 0 ){
            document.getElementById('button_spd').style.display='none'; 
             
        } 
    });
});