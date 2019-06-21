

//TUKARDINAS PAGE
$$(document).on('page:init', '.page[data-name="formlembur"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
        var calendarRange = app.calendar.create({
            inputEl: '#demo-calendar-lembur', 
            closeOnSelect:true
        });  
     
    
        var pickerDeviceJamMulai = app.picker.create({
            inputEl: '#jam_mulai',
            cols: [
            {
                textAlign: 'center',
                values: ['0 0', '0 1',  '0 2', '0 3',  '0 4' , '0 5',  '0 6' , '0 7', '0 8',  '0 9', '1 0',  '1 1' , '1 2',  '1 3' ,'1 4' , '1 5',  '1 6' , '1 7', '1 8',  '1 9', '2 0',  '2 1' , '2 2',  '2 3'  ]
            }
            ]
        });
        var pickerDeviceMenitMulai = app.picker.create({
          inputEl: '#menit_mulai',
          cols: [
            {
              textAlign: 'center',
              values: ['0 0', '0 5',  '1 0', '1 5',  '2 0' , '2 5',  '3 0' , '3 5', '4 0',  '4 5', '5 0',  '5 5'  ]
            }
          ]
        });
        var pickerDeviceJamSelesai = app.picker.create({
          inputEl: '#jam_selesai',
          cols: [
            {
              textAlign: 'center',
              values: ['0 0', '0 1',  '0 2', '0 3',  '0 4' , '0 5',  '0 6' , '0 7', '0 8',  '0 9', '1 0',  '1 1' , '1 2',  '1 3' ,'1 4' , '1 5',  '1 6' , '1 7', '1 8',  '1 9', '2 0',  '2 1' , '2 2',  '2 3'  ]
            }
          ]
        });
        var pickerDeviceMenitSelesai = app.picker.create({
          inputEl: '#menit_selesai',
          cols: [
            {
              textAlign: 'center',
              values: ['0 0', '0 5',  '1 0', '1 5',  '2 0' , '2 5',  '3 0' , '3 5', '4 0',  '4 5', '5 0',  '5 5'  ]
            }
          ]
        });
    
    
    
    
        var autocompleteDropdownAjax = app.autocomplete.create({
              inputEl: '#autocomplete-dropdown-ajax-lembur-nik',
              openIn: 'dropdown',
              preloader: true, //enable preloader
              /* If we set valueProperty to "id" then input value on select will be set according to this property */
              valueProperty: 'name', //object's "value" property name
              textProperty: 'name', //object's "text" property name
              limit: 500, //limit to 20 results
              dropdownPlaceholderText: 'NIK untuk tugas lembur',
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
              inputEl: '#autocomplete-dropdown-ajax-lembur',
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


function request_lembur(){
    var kid =  getParameterByName('kid'); 
    var tanggal_lembur = document.getElementById("demo-calendar-lembur").value;  
    
    var jam_mulai = document.getElementById("jam_mulai").value; 
    var menit_mulai = document.getElementById("menit_mulai").value; 
    var jam_selesai = document.getElementById("jam_selesai").value; 
    var menit_selesai = document.getElementById("menit_selesai").value; 
    
    var tugas = document.getElementById("tugas").value; 
    var karyawan_ditunjuk = document.getElementById("autocomplete-dropdown-ajax-lembur-nik").value; 
    var approver = document.getElementById("autocomplete-dropdown-ajax-lembur").value; 
 
     
    $.post( serverHost + "json_submit_lembur.php", { 
                        karyawan_id : kid , 
                        tanggal_lembur: tanggal_lembur , 
        
                        jam_mulai : jam_mulai ,  menit_mulai : menit_mulai , 
                        jam_selesai : jam_selesai ,  menit_selesai : menit_selesai , 
        
                        tugas : tugas ,   
                        karyawan_ditunjuk : karyawan_ditunjuk ,
                        approver : approver }
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



/* ****************************** BEGIN LEMBUR ****************************** */
function notifikasi_approve_lembur(id , refer_id ){
    var kid =  getParameterByName('kid');  
    
    textContent = '<p><center><input type="button" value="SETUJU" onclick="approve_lembur_allow('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:green;"/> ';
    textContent += ' <input type="button" value="TOLAK" onclick="approve_lembur_reject('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:red;"/> </center></p>';
     
    $.get(   serverHost + "json_approval_lembur.php?kid="+kid +"&id=" + refer_id +"&notif_id=" + id  , function( data ) {
        var notificationClickToClose = app.notification.create({ 
          title: 'Penugasan lembur karyawan<br/>', 
          subtitle: '<font color="green">Data pengajuan</font><hr/><p></p>',
          text:  data[1].message +'<br />'+ textContent,
          closeButton: true,
        });
        notificationClickToClose.open();
         
    });
     
    return;
}

function approve_lembur_allow(id){
    var kid =  getParameterByName('kid');   
    console.log(serverHost + "json_approval_lembur.php?kid="+kid +"&action=approve&id=" + id)
    $.get(   serverHost + "json_approval_lembur.php?kid="+kid +"&action=approve&id=" + id  , function( data ) { 
         
         notifikasi_area(); 
         return;
    });
    
    app.notification.close();
}

function approve_lembur_reject(id){
    var kid =  getParameterByName('kid');   
    $.get(   serverHost + "json_approval_lembur.php?kid="+kid +"&action=reject&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
    app.notification.close();
}
/* ****************************** END LEMBUR ****************************** */