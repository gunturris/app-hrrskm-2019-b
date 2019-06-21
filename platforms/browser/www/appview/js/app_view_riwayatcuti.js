
$$(document).on('page:init', '.page[data-name="riwayatcuti"]', function (e) { 
     
    var kid =  getParameterByName('kid')  
    
    $.get(   serverHost + "json_data_cuti.php?kid="+kid , function( data ) { 
         
    textAdd = '';
    textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> Nama  </div>  <div class="item-after">'+ data.nama  +'</div> </div> </li>';
    textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> NIK  </div>  <div class="item-after">'+ data.nik  +'</div> </div> </li>';
    textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> TMB </div>  <div class="item-after"> '+ data.tmb  +' </div> </div> </li>';
    textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> Saldo</div>  <div class="item-after"> '+  data.saldo_cuti +'</div> </div> </li>';
    
     
    rows =  data.cutis.length;
    if( rows > 0 ){
        textAdd += '<li> <div class="item-inner item-content"> <div class="item-title">  Rincian cuti</div> </div> </li>';
    
        for( i = 0 ; i< rows ; i++ ){ 
            console.log(data.cutis  )
            textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-after"> '+ data.cutis[i]+'</div> </div> </li>';
    
        }
    } else {
        textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"><div class="item-after">  Data cuti tidak ditemukan</div> </div> </div> </li>';
    }   
    
        
        var myDiv = document.getElementById("riwayat_cuti");
        myDiv.innerHTML = textAdd;
         
    }); 
    
    //var myDivLabel = document.getElementById("riwayat_cuti");
   // myDivLabel.innerHTML =  ;
}) 
 