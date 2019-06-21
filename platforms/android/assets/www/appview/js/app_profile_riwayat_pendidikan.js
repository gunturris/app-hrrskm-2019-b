$$(document).on('page:init', '.page[data-name="data-pendidikan"]', function (e) {
   
})

function profileRiwayatPendidikanAdd(){
    var kid =  getParameterByName('kid'); 
    
    app.router.navigate('/profile_riwayat_pendidikan_edit/' + kid ); 
    return;
}
  

function profileRiwayatPendidikanDelete(bioid){
    var kid =  getParameterByName('kid'); 
    
    app.dialog.alert("Delete riwayat kerja!"); 
    return;
}