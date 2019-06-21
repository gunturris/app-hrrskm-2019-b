$$(document).on('page:init', '.page[data-name="datakeluarga"]', function (e) {
   
})

function profilKeluargaAdd(){
    var kid =  getParameterByName('kid'); 
    
    app.router.navigate('/profile_keluarga_edit/' + kid ); 
    return;
}
 
function profileKeluargaEdit(bioid){
    var kid =  getParameterByName('kid'); 
    
    app.router.navigate('/profile_keluarga_edit/' + bioid ); 
    return;
}

function profileKeluargaDelete(bioid){
    var kid =  getParameterByName('kid'); 
    
    app.dialog.alert("Delete data keluarga!"); 
    return;
}