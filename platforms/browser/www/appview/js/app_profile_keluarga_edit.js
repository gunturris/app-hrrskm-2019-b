$$(document).on('page:init', '.page[data-name="formprofilekeluarga"]', function (e) {
   
    var sourcedata = app.views.main.router.xhr.requestUrl;
    
    app.request.get(serverHost + 'ref_picker_hubungan_keluarga.php', function (data) { 
          datas = JSON.parse(data)  
        
          var pickerDevice = app.picker.create({
              inputEl: '#demo-picker-hubungan-keluarga',
              cols: [
                {
                  textAlign: 'center',
                  values: datas
                }
              ]
            });
    });
    
    app.request.get(serverHost + 'ref_picker_pendidikan.php', function (data) { 
          datas = JSON.parse(data)  
        
          var pickerDevice = app.picker.create({
              inputEl: '#demo-picker-level_pendidikan',
              cols: [
                {
                  textAlign: 'center',
                  values: datas
                }
              ]
            });
    });
    
    var pickerDevice = app.picker.create({
      inputEl: '#demo-picker-jenis-kelamin',
      cols: [
        {
          textAlign: 'center',
          values: ["Laki-laki" , "Perempuan"]
        }
      ]
    });
    
     
     
    
    $.get(   serverHost + "emp.php?kid="+kid                , function( data ) { 
        respData = JSON.parse( data ); 
        var elem = document.getElementById("nama_karyawan");
        elem.value = respData.nik + "/ " +respData.nama  ; 
         
    });
})

