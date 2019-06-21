
$$(document).on('page:init', '.page[data-name="daftarachieve"]', function (e) { 
    
   
    var res = app.views.main.router.url.split("/");
    var klasifikasi =  res[2]
    var kid =  getParameterByName('kid')  
    $.get(   serverHost + "json_daftar_achieve_test.php?kid="+kid+"&kls="+ klasifikasi , function( data ) { 
         
        textAdd = '';
        textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> Nama  </div>  <div class="item-after"> '+ data.nama_gelar  +'</div> </div> </li>';
        textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> NIK  </div>  <div class="item-after"> '+ data.nik  +'</div> </div> </li>';
        textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> Account  number </div>  <div class="item-after"> '+ data.account_number  +' </div> </div> </li>';
        textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> Saldo sebelumnya</div>  <div class="item-after">Rp. '+ rupiah_format( data.saldo_periode_lalu)  +'</div> </div> </li>';
        
        textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> Iuran karyawan</div>  <div class="item-after">Rp. '+ rupiah_format( data.iuran_karyawan ) +'</div> </div> </li>';
         textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> Iuran perusahaan</div>  <div class="item-after">Rp. '+ rupiah_format( data.iuran_perusahaan )  +'</div> </div> </li>';
         textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> Saldo saat ini</div>  <div class="item-after">Rp. '+ rupiah_format( data.saldo_saat_ini ) +'</div> </div> </li>';
         
        
        var myDiv = document.getElementById("achieve_list");
        myDiv.innerHTML = textAdd;
         
    }); 
    
    var myDivLabel = document.getElementById("label_page");
    myDivLabel.innerHTML = 'Rincian <span style="text-transform: uppercase;">' + klasifikasi +'</span>';
}) 

function rupiah_format(nominal){
    
    var	number_string = nominal.toString(),
	sisa 	= number_string.length % 3,
	rupiah 	= number_string.substr(0, sisa),
	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
		
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    return rupiah
}