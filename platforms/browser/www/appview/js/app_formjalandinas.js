$$(document).on('page:init', '.page[data-name="formjalandinas"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
        var calendarRange = app.calendar.create({
          inputEl: '#demo-calendar-range-jalan-dinas',
          dateFormat: 'dd/mm/yyyy',
          rangePicker: true,
         closeOnSelect:true
        });  
    
    
        var pickerDevice = app.picker.create({
          inputEl: '#demo-picker-kategori-perjalanan',
          cols: [
            {
              textAlign: 'center',  
              values: ['Dinas', 'Pelatihan',  'A/J Pasien' ,'Berobat']
            }
          ]
        });

    
        var pickerTransport = app.picker.create({
          inputEl: '#demo-picker-transportasi',
          cols: [
            {
              textAlign: 'center',  
              values: [ 'Mobil perusahaan','Kereta', 'Pesawat', 'Ambulance' ,'Umum' ,'Lainnya']
            }
          ]
        });
    
        var autocompleteDropdownAjaxDitugas = app.autocomplete.create({
              inputEl: '#autocomplete-dropdown-ajax-perjalanan-nik',
              openIn: 'dropdown',
              preloader: true, //enable preloader
              /* If we set valueProperty to "id" then input value on select will be set according to this property */
              valueProperty: 'name', //object's "value" property name
              textProperty: 'name', //object's "text" property name
              limit: 500, //limit to 20 results
              dropdownPlaceholderText: 'NIK untuk perjalanan dinas',
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
                  url: serverHost + 'automcomplete_nik_json_pelaksana.php',
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
            var autocompleteDropdownAjax = app.autocomplete.create({
              inputEl: '#autocomplete-dropdown-ajax',
              openIn: 'dropdown',
              preloader: true, //enable preloader
              /* If we set valueProperty to "id" then input value on select will be set according to this property */
              valueProperty: 'name', //object's "value" property name
              textProperty: 'name', //object's "text" property name
              limit: 500, //limit to 20 results
              dropdownPlaceholderText: 'NIK yang menyetujui',
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
                  url: serverHost + 'autocomplete_nik_json_limit.php',
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


function request_perjalanan_dinas(){
    var kid =  getParameterByName('kid'); 
    var tanggal_perjalanan = document.getElementById("demo-calendar-range-jalan-dinas").value; 
    
    
    var tujuan = document.getElementById("tujuan").value;
    var tugas = document.getElementById("tugas").value; 
    var kategori = document.getElementById("demo-picker-kategori-perjalanan").value;
    
    var type_kendaraan = document.getElementById("demo-picker-transportasi").value;
    var no_kendaraan = document.getElementById("no_kendaraan").value;
    var nama_pasien = document.getElementById("nama_pasien").value;
    var trx_pasien = document.getElementById("trx_pasien").value;
    
    
    
    
    var karyawan_ditunjuk = document.getElementById("autocomplete-dropdown-ajax-perjalanan-nik").value;
    var approver = document.getElementById("autocomplete-dropdown-ajax").value;
    
      
    $.post( serverHost + "json_submit_jalandinas.php", { 
                    karyawan_id : kid , 
                    tanggal_perjalanan: tanggal_perjalanan , 
                    kategori : kategori , 
                    tujuan : tujuan , 
                    tugas : tugas ,  
                    type_kendaraan : type_kendaraan ,  
                    no_kendaraan : no_kendaraan ,  
                    nama_pasien : nama_pasien ,  
                    trx_pasien : trx_pasien ,  
                    karyawan_ditunjuk : karyawan_ditunjuk ,  
                    approver : approver  
                }
          )
        .done(function( data ) {  
            if(data.status == 0 ){ 
                status = '<font color="red">Gagal !</font>';
                app.dialog.alert( '<span style="font-size:13px">' + data.msg + '</font>', status );
            }else{
                status = "Sukses !"; 
                app.dialog.alert( data.msg , status , function(){ location.href = 'index.html?kid=' + kid; } );
            }
               
            return;
        }); 
    return;
     
}


/* ****************************** BEGIN JALAN DINAS ****************************** */
function notifikasi_approve_jalandinas(id , refer_id ){
    var kid =  getParameterByName('kid');  
    
    textContent =   '<p><center><input type="button" value="SETUJU" onclick="approve_jalandinas_allow('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:green;"/> ';
    textContent +=  '<input type="button" value="TOLAK" onclick="approve_jalandinas_reject('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:red;"/> </center></p>';
     console.log(serverHost + "json_approval_jalandinas.php?kid="+kid +"&id=" + refer_id +"&notif_id=" + id)
    $.get(   serverHost + "json_approval_jalandinas.php?kid="+kid +"&id=" + refer_id +"&notif_id=" + id  , function( data ) {
        console.log(data)
        var notificationClickToClose = app.notification.create({ 
          title: 'Penugasan perjalanan dinas<br/>', 
          subtitle: '<font color="green">Data pengajuan</font><hr/><p></p>',
          text:  data[1].message +'<br />'+ textContent,
          closeButton: true,
            swipeToClose: false,
        });
        notificationClickToClose.open();
         
    });
     
    return;
}

function approve_jalandinas_allow(id){
    app.notification.close();
    $.get(   serverHost + "json_approval_jalandinas.php?kid="+kid +"&action=approve&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}

function approve_jalandinas_reject(id){
    app.notification.close();
    $.get(   serverHost + "json_approval_jalandinas.php?kid="+kid +"&action=reject&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}
/* ****************************** END JALAN DINAS ****************************** */


