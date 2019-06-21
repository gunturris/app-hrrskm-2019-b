

//TUKARDINAS PAGE
$$(document).on('page:init', '.page[data-name="formtukardinasi"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
        var calendarRange = app.calendar.create({
          inputEl: '#demo-calendar-tukar-dinas', 
            
         closeOnSelect:true
        });  
    
    
        var pickerDevice = app.picker.create({
                  inputEl: '#shift_awal',
                  cols: [
                    {
                      textAlign: 'center',
                      values: ['1','2','3','4','5','6','7','8','9','N','X']
                    }
                  ]
                });

        var pickerDevice = app.picker.create({
              inputEl: '#shift_baru',
              cols: [
                {
                  textAlign: 'center',
                  values: ['1','2','3','4','5','6','7','8','9' ,'N','X']
                }
              ]
            });

    
        var autocompleteDropdownAjax = app.autocomplete.create({
              inputEl: '#autocomplete-dropdown-ajax-tukar-nik',
              openIn: 'dropdown',
              preloader: true, //enable preloader
              /* If we set valueProperty to "id" then input value on select will be set according to this property */
              valueProperty: 'name', //object's "value" property name
              textProperty: 'name', //object's "text" property name
              limit: 500, //limit to 20 results
              dropdownPlaceholderText: 'NIK tukar dinas',
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
                  url: serverHost + 'automcomplete_nik_json.php',
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

function request_tukar_dinas(){
    var kid =  getParameterByName('kid'); 
    var tanggal_kerja = document.getElementById("demo-calendar-tukar-dinas").value;
    var tukar_karyawan = document.getElementById("autocomplete-dropdown-ajax-tukar-nik").value; 
    var shift_awal = document.getElementById("shift_awal").value; 
    var shift_baru = document.getElementById("shift_baru").value; 
    var keterangan = document.getElementById("note_tukar").value; 
    var approver = document.getElementById("autocomplete-dropdown-ajax").value; 
 
     
    $.post( serverHost + "json_submit_tukar_dinas.php", { karyawan_id : kid , shift_awal : shift_awal , shift_baru : shift_baru , tanggal_kerja: tanggal_kerja , tukar_karyawan : tukar_karyawan , descriptions : keterangan ,   approver : approver })
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



/* ****************************** BEGIN TUKAR DINAS ****************************** */
function notifikasi_approve_tukar_dinas(id , refer_id ){
    var kid =  getParameterByName('kid');  
    
    textContent = '<p><center><input type="button" value="SETUJU" onclick="approve_tukar_dinas_allow('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:green;"/> ';
    textContent += ' <input type="button" value="TOLAK" onclick="approve_tukar_dinas_reject('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:red;"/> </center></p>';
     
    $.get(   serverHost + "json_approval_tukar_dinas.php?kid="+kid +"&id=" + refer_id +"&notif_id=" + id  , function( data ) {
        var notificationClickToClose = app.notification.create({ 
          title: 'Tukar dinas bekerja<br/>', 
          subtitle: '<font color="green">Data pengajuan</font><hr/><p></p>',
          text:  data[1].message +'<br />'+ textContent,
          closeButton: true,
        });
        notificationClickToClose.open();
         
    });
     
    return;
}

function approve_tukar_dinas_allow(id){
    app.notification.close();
    $.get(   serverHost + "json_approval_tukar_dinas.php?kid="+kid +"&action=approve&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}

function approve_tukar_dinas_reject(id){
    app.notification.close();
    $.get(   serverHost + "json_approval_tukar_dinas.php?kid="+kid +"&action=reject&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}
/* ****************************** END TUKAR DINAS ****************************** */


