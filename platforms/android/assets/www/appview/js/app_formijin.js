
//IJIN PAGE
$$(document).on('page:init', '.page[data-name="formijin"]', function (e) {
  // Do something here when page with data-name="about" attribute loaded and initialized
     var calendarRange = app.calendar.create({
          inputEl: '#demo-calendar-ijin', 
          dateFormat: 'dd/mm/yyyy',
          rangePicker: true,
         closeOnSelect:true
        });  
    
        app.request.get(serverHost + 'ref_picker_jenis_ijin.php', function (data) { 
          datas = JSON.parse(data)  
        
          var pickerDevice = app.picker.create({
                  inputEl: '#demo-picker-kategori-ijin',
                  cols: [
                    {
                      textAlign: 'center',
                      values: datas
                    }
                  ]
                });
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

function request_ijin(){
    var kid =  getParameterByName('kid'); 
    var tanggal_ijin = document.getElementById("demo-calendar-ijin").value;
    var jenis_ijin = document.getElementById("demo-picker-kategori-ijin").value; 
    var note_ijin = document.getElementById("note_ijin").value;   
    var approver = document.getElementById("autocomplete-dropdown-ajax").value; 
     
    $.post( serverHost + "json_submit_ijin.php", { karyawan_id: kid , tanggal_ijin: tanggal_ijin , jenis_ijin : jenis_ijin , note_ijin : note_ijin ,  approver : approver  })
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


function infoText(){ 
    var jenis_ijin = document.getElementById("demo-picker-kategori-ijin").value; 
    $.post( serverHost + "ref_get_ijin_text.php", {   code : jenis_ijin  })
        .done(function( data ) { 
              
                var myNotif = document.getElementById("note_ijin");
                myNotif.innerHTML = data;
             
            return;
        }); 
    return;
}

function openPilihanSuratDinas(){
    $.get(   serverHost + "info_surat_ijin_kategori.php", function( data ) {
        var notificationClickToClose = app.notification.create({ 
          title: 'Ijin tidak bekerja<br/>', 
         /* subtitle: '<font color="green">Data pengajuan</font><hr/><p></p>',*/
          text:  data.message  ,
          closeButton: true,
        });
        notificationClickToClose.open();
         
    });
}

/* ****************************** BEGIN IJIN ****************************** */
function notifikasi_approve_ijin(id , refer_id ){
    var kid =  getParameterByName('kid');  
    
    textContent = '<p><center><input type="button" value="SETUJU" onclick="approve_ijin_allow('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:green;"/> ';
    textContent += ' <input type="button" value="TOLAK" onclick="approve_ijin_reject('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:red;"/> </center></p>';
     
    $.get(   serverHost + "json_approval_ijin.php?kid="+kid +"&id=" + refer_id +"&notif_id=" + id , function( data ) {
        var notificationClickToClose = app.notification.create({ 
          title: 'Ijin tidak bekerja<br/>', 
          subtitle: '<font color="green">Data pengajuan</font><hr/><p></p>',
          text:  data[1].message +'<br />'+ textContent,
          closeButton: true,
        });
        notificationClickToClose.open();
         
    });
     
    return;
}

function approve_ijin_allow(id){
    var kid =  getParameterByName('kid');  
    app.notification.close();
    $.get(   serverHost + "json_approval_ijin.php?kid="+kid +"&action=approve&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}

function approve_ijin_reject(id){
    var kid =  getParameterByName('kid');  
    app.notification.close();
    $.get(   serverHost + "json_approval_ijin.php?kid="+kid +"&action=reject&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}
/* ****************************** END IJIN ****************************** */
