
//CUTI PAGE
$$(document).on('page:init', '.page[data-name="formkomplain"]', function (e) { 
    
        var autocompleteDropdownAjaxDitugas = app.autocomplete.create({
              inputEl: '#autocomplete-dropdown-komplain',
              openIn: 'dropdown',
              preloader: true, //enable preloader
              /* If we set valueProperty to "id" then input value on select will be set according to this property */
              valueProperty: 'name', //object's "value" property name
              textProperty: 'name', //object's "text" property name
              limit: 500, //limit to 20 results
              dropdownPlaceholderText: 'Komponen gaji',
              source: function (query, render) {
                var autocomplete = this;
                var results = [];
                 
                if (query.length === 0) {
                  render(results);
                  return;
                }
                // Show Preloader
                autocomplete.preloaderShow();


                // Do Ajax request to Autocomplete data
                app.request({
                  url: serverHost + 'automcomplete_komponen_gaji_json.php',
                  method: 'GET',
                  dataType: 'json',
                  //send "query" to server. Useful in case you generate response dynamically
                  data: {
                    q: query,
                  },
                  success: function (data) {
                    // Find matched items
                    for (var i = 0; i < data.length; i++) {
                      if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                    }
                    // Hide Preoloader
                    autocomplete.preloaderHide();
                    // Render items by passing array with result items
                    render(results);
                  }
                });
              }
            });
    
    
    
    
})


function send_komplain(){
    var kid =  getParameterByName('kid');   
    var komponen_data = document.getElementById("autocomplete-dropdown-komplain").value; 
    var catatan = document.getElementById("catatan").value; 
      
    $.post( serverHost + "json_submit_help_komplain.php" , { karyawan_id : kid ,komponen :komponen_data , catatan : catatan  }, function( data ) {
      console.log( data ); 
        if(data.status == 0 ){ 
                status = '<font color="red">Gagal !</font>';
                app.dialog.alert( '<span style="font-size:13px">' + data.msg + '</font>', status );
            }else{
                status = "Sukses !"; 
                app.dialog.alert( data.msg , status , function(){ location.href = 'index.html?kid=' + kid; } );
            }
    }, "json");
    /*
     
    $.post( serverHost + "json_submit_help_komplain.php", { karyawan_id : kid ,komponen :komponen_data , catatan : catatan  })
        .done(function( data ) {   }); 
    return true; 
    */
    
}