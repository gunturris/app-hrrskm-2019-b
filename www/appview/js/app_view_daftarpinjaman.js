 

$$(document).on('page:init', '.page[data-name="daftarpinjaman"]', function (e) { 
         
    $.get(   serverHost + "json_daftar_pinjaman.php?kid="+kid , function( data ) { 
         
         
        textAdd = '';
        for (var iz in data) { 
            console.log(data[iz])
             textAdd += '<li><a href="/pinjamandetail/'+  iz +'">'+ data[iz].label +'</a></li>';
               
        }
        
        var myDiv = document.getElementById("pinjaman_list");
        myDiv.innerHTML = textAdd;
         
    }); 
     
}) 
 