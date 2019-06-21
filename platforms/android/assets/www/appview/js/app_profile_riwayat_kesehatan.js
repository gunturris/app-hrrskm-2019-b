$$(document).on('page:init', '.page[data-name="data-kesehatan"]', function (e) {
   
})

function profileRiwayatKesehatanAdd(){
    var kid =  getParameterByName('kid'); 
    
    app.router.navigate('/profile_riwayat_kesehatan_edit/' + kid ); 
    return;
}
  

function profileRiwayatKesehatanDelete(bioid){
    var kid =  getParameterByName('kid'); 
    
    app.dialog.alert("Delete riwayat kerja!"); 
    return;
}