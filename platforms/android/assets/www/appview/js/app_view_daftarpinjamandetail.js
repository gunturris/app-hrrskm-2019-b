 

$$(document).on('page:init', '.page[data-name="daftarpinjamandetail"]', function (e) { 
    
    
    var potid =  getParameterByName( 'potid', app.views.main.router.xhr.requestUrl)
     
    $.get(   serverHost + "json_daftar_pinjaman_detail.php?potid="+ potid , function( data ) { 
        //respData = JSON.parse( data ); 
          
         
        textAdd = '';
        for (var iz in data) {   
    textAdd += '<li> <div class="item-inner item-content"> <div class="item-title"> <div class="item-header"></div> '+ data[iz].periode  +'  </div>  <div class="item-after">'+ data[iz].sisa  +'</div> </div> </li>';
               
        }
        
        var myDiv = document.getElementById("pinjaman_detail_list");
        myDiv.innerHTML = textAdd;
         
    }); 
     
}) 
 