 
myApp.onPageInit('daftar-rawat' , function(page){
	 
	displayRiwayatRawat(   );
});


function displayRiwayatRawat(){
	
	xhr.open("POST", serverHost + "rest_riwayat_rawat.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send( );

	xhr.onreadystatechange = function() {
	var loopRiwayatRawat = '<ul>';
		if (xhr.readyState == 4 && xhr.status == 200) {	   
			if(xhr.responseText == 'empty'){
				loopRiwayatRawat +='<li class="item-content">Data tidak ditemukan!</li>';
			}else{ 
				respData = JSON.parse(xhr.responseText);
				console.log(respData);
				var i = 0; 
				
				for( var eachrow in respData.riwayat ){ 
				 
					loopRiwayatRawat +='<li>';
					loopRiwayatRawat +=  '<div class="item-media"><i class="icon icon-tabs"></i></div>';
					loopRiwayatRawat +=  '<div class="item-inner">'; 
					loopRiwayatRawat +=	 '<div class="item-title-row"><div class="item-title">'+respData.riwayat[i].nama_doktor+'</div></div>';
					loopRiwayatRawat +=	 '<div class="item-text">'+respData.riwayat[i].trxid+' ('+ respData.riwayat[i].tanggal_rawat+') </div>';
					
					loopRiwayatRawat +=  '</div>';
					loopRiwayatRawat +='</li>' ; 
					i++;
				}
			}
				 
			loopRiwayatRawat += '</ul>'; 
			document.getElementById('riwayat_rawat_pasien').innerHTML =  loopRiwayatRawat;  
		}	 
	};
}


function displayJadwalDokter(){
	xhr.open("POST", serverHost + "rest_doctors.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send( );
	
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
			var loopDaftarDoctors = '<ul>';
			if(xhr.responseText == 'empty'){
				loopDaftarDoctors +='<li class="item-content">Data tidak ditemukan!</li>';
			}else{ 
				respData = JSON.parse(xhr.responseText);
				var i = 0; 
				
				for( var eachrow in respData.doctors ){ 
				 
					loopDaftarDoctors +='<li class="item-content">';
					loopDaftarDoctors +=  '<div class="item-media"><a href="doktor_detail.html?id='+ respData.doctors[i].id +'"  class="item-link"><i class="icon icon-f7"></i></a></div>';
					loopDaftarDoctors +=  '<div class="item-inner">';
					loopDaftarDoctors +=	'<div class="item-title" style="line-height:16px;"><span style="font-size:11px"><b>' +respData.doctors[i].nama_doktor+'</b> </span> <br/><span style="font-size:11px;">' +respData.doctors[i].spesialis+'&nbsp;</span>  </div>';
					loopDaftarDoctors +=	'<div class="item-title" style="line-height:15px;text-align:right;"><span style="font-size:12px">&nbsp;</span></div>';
					loopDaftarDoctors +=  '</div>';
					loopDaftarDoctors +='</li>' ; 
					i++;
				}
			}
			loopDaftarDoctors += '</ul>'; 
			document.getElementById('list_doctors').innerHTML =  loopDaftarDoctors; 
        } 
    };
}

function displayDetailDoctor( doktor_id ){
	 
	xhr.open("POST", serverHost + "rest_jadwal_dokter.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("dokter_id="+doktor_id );
	
	xhr.onreadystatechange = function() {
		
		if (xhr.readyState == 4 && xhr.status == 200) {
			respData = JSON.parse(xhr.responseText);
			document.getElementById('label_nama_dokter').innerHTML =  respData.nama_doktor; 
			document.getElementById('label_klinik').innerHTML =  respData.spesialis; 
			
			var i = 0; 
			var	loopJadwalDoctors	= '<ul>';
				for( var eachrow in respData.jadwal ){  
				   
					loopJadwalDoctors +='<li><a href="form_reservasi.html?jadwal_id='+respData.jadwal[i].jwd_id+'" class="item-link"><div class="item-content">'; 
					loopJadwalDoctors +=  '<div class="item-inner">';
					loopJadwalDoctors +=	'<div class="item-title" style="line-height:16px;"><span style="font-size:13px"><b>' +respData.jadwal[i].hari+'</b> </span> </div>';
					loopJadwalDoctors +=	'<div class="item-title" style="line-height:15px;"> @'+respData.jadwal[i].jam_in +' - '+ respData.jadwal[i].jam_out +'</div>';
					loopJadwalDoctors +=  '</div>';
					loopJadwalDoctors +='</div></a></li>' ; 
					i++;
				}
			 
			loopJadwalDoctors += '</ul>'; 
			document.getElementById('list_jadwal').innerHTML =  loopJadwalDoctors; 
		}
	};
} 

function displayReservasiDoctor(jadwal_id){
	xhr.open("POST", serverHost + "rest_reservasi_jadwal.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("jadwal_id="+jadwal_id );
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			respData = JSON.parse(xhr.responseText);
			console.log(respData);
			document.getElementById('nama_dokter').innerHTML =  respData.nama_doktor; 
			document.getElementById('spesialis').innerHTML =  respData.spesialis; 
			document.getElementById('jadwal_hari').innerHTML =  respData.hari; 
			document.getElementById('jadwal_jam').innerHTML =   respData.jam_in+' s/d ' + respData.jam_out; 
			document.getElementById('tanggal_reservasi').value = '2014-10-12'; 
		}
	};	
	
	
}