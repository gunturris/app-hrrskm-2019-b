 

$$(document).on('page:init', '.page[data-name="periodegaji"]', function (e) {
   
    $.get(   serverHost + "json_periode_gaji.php?kid="+kid , function( data ) { 
    
         
        textAdd = '';
        for (var iz in data) { 
            console.log(data[iz])
             textAdd += '<li><a href="/gaji/'+  iz +'">'+ data[iz].label +'</a></li>';
               
        }
        
        var myDiv = document.getElementById("periode_list");
        myDiv.innerHTML = textAdd;
         
    }); 
     
}) 
 