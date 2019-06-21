
//CUTI PAGE
$$(document).on('page:init', '.page[data-name="formcuti"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
     var calendarRange = app.calendar.create({
          inputEl: '#demo-calendar-range-cuti',
          dateFormat: 'dd/mm/yyyy',
          rangePicker: true, 
         closeOnSelect:true
        }); 
        var pickerDevice = app.picker.create({
          inputEl: '#demo-picker-jenis-cuti',
          cols: [
            {
              textAlign: 'center',
              values: ['CT - Cuti tahunan', 'CB - Cuti besar',  'CS - Cuti sakit',  'CH - Cuti hamil']
            }
          ]
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

function check_saldo_cuti(type){
    var tanggal_cuti = document.getElementById("demo-calendar-range-cuti").value;
    $.get(   serverHost + "json_get_sisa_cuti.php?kid=" + kid + "&typecuti=" + type + "&dates=" + tanggal_cuti  , function( data ) { 
        console.log(data) 
        document.getElementById("sisa_cuti").value = data
    
    });
    return;
}

function request_cuti(){
    var kid =  getParameterByName('kid'); 
    var tanggal_cuti = document.getElementById("demo-calendar-range-cuti").value;
    var jenis_cuti = document.getElementById("demo-picker-jenis-cuti").value; 
    var address_urgent = document.getElementById("address_urgent").value; 
    var phone_urgent = document.getElementById("phone_urgent").value; 
    var approver = document.getElementById("autocomplete-dropdown-ajax").value; 

     $.post( serverHost + "json_submit_cuti.php", { karyawan_id: kid , tanggal_cuti: tanggal_cuti , jenis_cuti : jenis_cuti , phone_urgent : phone_urgent,  approver : approver  })
        .done(function( data ) { 
            if(data.status == 0 ){ 
                status = '<font color="red">Gagal !</font>';
                app.dialog.alert( '<span style="font-size:13px">' + data.msg + '</font>', status );
            }else{
                status = "Sukses !"; 
                app.dialog.alert( data.msg , status , function(){ location.href = 'index.html?kid=' + kid; } );
            }
               
            return;
        })
        .fail(function(xhr, status, error) {
        console.log(xhr)
        console.log(status)
        console.log(error)
        }); 
     
    return;
}


/* ****************************** BEGIN CUTI ****************************** */
function notifikasi_approve_cuti(id , refer_id ){
    var kid =  getParameterByName('kid');  
    
    textContent =   '<p><center><input type="button" value="SETUJU" onclick="approve_cuti_allow('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:green;"/> ';
    textContent +=  '<input type="button" value="TOLAK" onclick="approve_cuti_reject('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:red;"/> </center></p>';
     
    $.get(   serverHost + "json_approval_cuti.php?kid="+kid +"&id=" + refer_id +"&notif_id=" + id  , function( data ) {
        var notificationClickToClose = app.notification.create({ 
          title: 'Persetujuan cuti<br/>', 
          subtitle: '<font color="green">Data pengajuan</font><hr/><p></p>',
          text:  data[1].message +'<br />'+ textContent,
          closeButton: true,
        });
        notificationClickToClose.open();
         
    });
     
    return;
}

function approve_cuti_allow(id){
    app.notification.close();
    $.get(   serverHost + "json_approval_cuti.php?kid="+kid +"&action=approve&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}

function approve_cuti_reject(id){
    app.notification.close();
    $.get(   serverHost + "json_approval_cuti.php?kid="+kid +"&action=reject&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}
/* ****************************** END JALAN DINAS ****************************** */


