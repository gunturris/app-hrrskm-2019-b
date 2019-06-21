
//BATAL CUTI PAGE
$$(document).on('page:init', '.page[data-name="formcutibatal"]', function (e) {
    
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
   $.get(   serverHost + "json_data_cuti_pengajuan.php?kid="+kid                , function( data ) { 
        //respData = JSON.parse( data ); 
        console.log(data)
        textAdd = ''; 
        for (var iz in data) {      
            textAdd += '<li> <div class="item-content"> <div class="item-inner"> <div class="item-title" style="padding-left:25px;">'+data[iz]+'</div> <div class="item-after">'; 
            textAdd += '<label class="toggle toggle-init"> <input type="checkbox" id="cd_'+iz+'" name="dd['+iz+']" value="'+data[iz]+'"><i class="toggle-icon"></i> </label></div> </div> </div> </li>'; 
            
        } 
        var myNotif = document.getElementById("data_tanggal_cuti");
        myNotif.innerHTML = textAdd;
    }); 
    
})


function request_cuti_batal(){
    var kid =  getParameterByName('kid'); 
    var keterangan = document.getElementById("keterangan").value; 
    var approver = document.getElementById("autocomplete-dropdown-ajax").value; 
    tanggals = []
    $.get(   serverHost + "json_data_cuti_pengajuan.php?kid="+kid , function( data ) { 
        for (var iz in data) { 
            elem = 'cd_'+iz; 
            te = document.getElementById(elem).checked
            console.log(te)
            if( document.getElementById(elem).checked){
                
                nd = document.getElementById(elem).value;
                tanggals.push(nd)  
            }
        }
        $.post( serverHost + "json_submit_cuti_batal.php", { karyawan_id : kid ,   tanggals : tanggals , keterangan :keterangan , approver :approver  })
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
    } );
     
     
     
    return; 
}


/* ****************************** BEGIN BATAL CUTI ******************************  */
function notifikasi_approve_batalcuti(id , refer_id ){
    var kid =  getParameterByName('kid');  
    
    textContent =   '<p><center><input type="button" value="SETUJU" onclick="approve_cuti_batal_allow('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:green;"/> ';
    textContent +=  '<input type="button" value="TOLAK" onclick="approve_cuti_batal_reject('+ refer_id +');" style="height:26px;color:#fff;width:120px;background-color:red;"/> </center></p>';
     
    $.get(   serverHost + "json_approval_cuti_batal.php?kid="+kid +"&id=" + refer_id +"&notif_id=" + id  , function( data ) {
        console.log(data)
        var notificationClickToClose = app.notification.create({ 
          title: 'Pembatalan cuti<br/>', 
          subtitle: '<font color="green">Data pengajuan</font><hr/><p></p>',
          text:  data[1].message +'<br />'+ textContent,
          closeButton: true,
        });
        notificationClickToClose.open();
         
    });
     
    return;
}

function approve_cuti_batal_allow(id){
    app.notification.close();
    $.get(   serverHost + "json_approval_cuti_batal.php?kid="+kid +"&action=approve&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}

function approve_cuti_batal_reject(id){
    app.notification.close();
    $.get(   serverHost + "json_approval_cuti_batal.php?kid="+kid +"&action=reject&id=" + id  , function( data ) { 
         notifikasi_area(); 
         return;
    });
}
/* ****************************** END BATAL CUTI ****************************** */


