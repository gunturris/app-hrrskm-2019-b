$$(document).on('page:init', '.page[data-name="datakeluarga"]', function (e) {
   
})

function profileRiwayatKerjaAdd(){
    var kid =  getParameterByName('kid'); 
    
    app.router.navigate('/profile_riwayat_kerja_edit/' + kid ); 
    return;
}
  

function profileRiwayatKerjaDelete(bioid){
    var kid =  getParameterByName('kid'); 
    
    app.dialog.alert("Delete riwayat kerja!"); 
    return;
}