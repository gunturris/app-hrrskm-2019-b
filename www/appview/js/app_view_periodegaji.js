 

$$(document).on('page:init', '.page[data-name="periodegaji"]', function (e) {
   
    $.get(   serverHost + "json_periode_gaji_update.php?kid="+kid , function( data ) { 
    
        var arr = [];
        for( var key in data ){
          if( data.hasOwnProperty( key ) ){
            arr.push( data[key] );
          }
        }

        //now, sort your array
        arr.sort( function(a,b) { 
          var perIDA=a.periode_id,
              perIDB=b.periode_id;

          if (perIDA < perIDB){ 
            return 1; 
          } else if (perIDA > perIDB){ 
            return -1
          } else { 
            return 0
          }
        });
        
        textAdd = ''
        for( var iz in arr){ 
            textAdd += '<li><a href="/gaji/'+  arr[iz].periode_id +'">'+ arr[iz].label +'</a></li>';
        } 
        
        var myDiv = document.getElementById("periode_list");
        myDiv.innerHTML = textAdd;
         
    }); 
     
}) 
 