//menampilkan daftar produk -> filter nama
//tampil saat load
document.getElementById("tabledata").addEventListener("load", tampil_data_produk);
//fungsi tampil
function tampil_data_produk(){

	var nama=$('#txtfilter').val();
		var data='TampilDataProduk=1&nama='+nama;
	$('#loading').show();
	$('#tabledata').hide();
	$('#gagal').hide();
	$.ajax({
		type : 'POST',
		url : "api-server/tampildata.php",
		async : true,
		beforeSend: function(x){
			if(x && x.overrideMimeType) {
				 x.overrideMimeType("application/j-son;charset=UTF-8");
			} 			
		},
		data : data,
		dataType : 'json',
		success: function(data){          
			$('#tampil_data_produk').empty();
            $('#tampil_data_produk').html('<tbody><tr>'
                                        +'<th width="20%"><i class="icon_profile"></i> Gambar</th>'
                                        +'<th><i class="icon_mail_alt"></i> Nama Produk</th>'
                                        +'<th><i class="icon_pin_alt"></i> Harga</th>'
                                        +'<th><i class="icon_cogs"></i> Kontrol</th>'
                                        +'</tr></tbody>');
			minta=data.items;
			$.each(minta, function(index,loaddata){
 				$('#tampil_data_produk').append('<tr>'
                                                +'<td><img class="pic" src="'+loaddata.foto+'" width="80%">'
                                                +'<img class="picbig" src='+loaddata.foto+'></td>'
                                                +'<td>'+loaddata.Nama+'</td>'
                                                +'<td>'+loaddata.Harga+'</td>'
                                                +'<td><div class="btn-group">'
                                                +'<a class="pht btn btn-primary" vWkodebarang="'+loaddata.KodeProduk+'" href="#formgambar" data-toggle="modal"><i class="icon_check_alt2"></i></a>'
                                                +'<a class="abc btn btn-success" onclick="form_edit_produk(\''+loaddata.KodeProduk+'\');" href="#myModal" data-toggle="modal"><i class="icon_check_alt2"></i></a>'
                                                +'<a class="btn btn-danger" href="#" onclick="hapus_data_produk(\''+loaddata.KodeProduk+'\');"><i class="icon_close_alt2"></i></a></div></td>'
                                                +'</tr>');
			});
   			$('#loading').hide();
   			$('#tabledata').show();    			
		},
		error: function(jqXHR, eception){
			$('#loading').hide();
			$('#gagal').show();
		}
	})
}
//daftar produk - end



//menampilkan daftar pelanggan -> filter nama
//tampil saat load
document.getElementById("tabledata").addEventListener("load", tampil_data_pelanggan);
//fungsi tampil
function tampil_data_pelanggan(){

    var nama=$('#txtfilter').val();
        var data='TampilDataPelanggan=1&nama='+nama;
    $('#loading').show();
    $('#tabledata').hide();
    $('#gagal').hide();
    $.ajax({
        type : 'POST',
        url : "api-server/tampildata.php",
        async : true,
        beforeSend: function(x){
            if(x && x.overrideMimeType) {
                 x.overrideMimeType("application/j-son;charset=UTF-8");
            }           
        },
        data : data,
        dataType : 'json',
        success: function(data){          
            $('#tampil_data_pelanggan').empty();
            $('#tampil_data_pelanggan').html('<tbody><tr>'
                                        +'<th><i class="icon_mail_alt"></i> Nama pelanggan</th>'
                                        +'<th><i class="icon_pin_alt"></i>Contact</th>'
                                        +'<th><i class="icon_cogs"></i> Kontrol</th>'
                                        +'</tr></tbody>');
            minta=data.items;
            $.each(minta, function(index,loaddata){
                $('#tampil_data_pelanggan').append('<tr>'
                                                +'<td>'+loaddata.nama+'</td>'
                                                +'<td>'+loaddata.telp+'</td>'
                                                +'<td><div class="btn-group">'
                                                +'<a class="abc btn btn-success" onclick="form_edit_pelanggan(\''+loaddata.KodePelanggan+'\');" href="#myModal" data-toggle="modal"><i class="icon_check_alt2"></i></a>'
                                                +'<a class="btn btn-danger" href="#" onclick="hapus_data_pelanggan(\''+loaddata.KodePelanggan+'\');"><i class="icon_close_alt2"></i></a></div></td>'
                                                +'</tr>');
            });
            $('#loading').hide();
            $('#tabledata').show();             
        },
        error: function(jqXHR, eception){
            $('#loading').hide();
            $('#gagal').show();
        }
    })
}
//daftar pelanggan - end




//Laporan Rekap Penjualan
//fungsi tampil
function lap_data_rpenjualan(){
    //tgl awal
    var tglawal=$('#txttglawal').val();
    //tgl akhir
    var tglakhir=$('#txttglakhir').val();
    var jum=0;
    var data='LapDatarpenjualan=1&tglawal='+tglawal+'&tglakhir='+tglakhir;
    $('#loading').show();
    $('#tabledata').hide();
    $('#gagal').hide();
    $.ajax({
        type : 'POST',
        url : "api-server/tampildata.php",
        async : true,
        beforeSend: function(x){
            if(x && x.overrideMimeType) {
                 x.overrideMimeType("application/j-son;charset=UTF-8");
            }           
        },
        data : data,
        dataType : 'json',
        success: function(data){          
            $('#lap_data_rpenjualan').empty();
            $('#lap_data_rpenjualan').html('<tbody><tr>'
                                        +'<th>Tanggal</th>'
                                        +'<th>No Faktur</th>'
                                        +'<th>Total Penjualan</th>'
                                        +'</tr></tbody>');
            minta=data.items;
            $.each(minta, function(index,loaddata){
                $('#lap_data_rpenjualan').append('<tr>'
                                                +'<td>'+loaddata.tgl+'</td>'
                                                +'<td>'+loaddata.notrans+'</td>'
                                                +'<td>'+loaddata.total+'</td>'
                                                +'</tr>');
                //total penjualan
                jum=jum+parseFloat(loaddata.total);      

            });
            $('#loading').hide();
            $('#tabledata').show();       
            $('#lap_data_rpenjualan').append('<tr>'
                                            +'<td><b>TOTAL</b></td>'
                                            +'<td></td>'
                                            +'<td><b>'+jum+'</b></td>'
                                            +'</tr>');                
        },
        error: function(jqXHR, eception){
            $('#loading').hide();
            $('#gagal').show();
        }
    })
}
//Laporan Rekap Penjualan - end





//Laporan Rekap Penjualan Tgl
//fungsi tampil
function lap_data_rpenjualantgl(){
    //tgl awal
    var tglawal=$('#txttglawal').val();
    //tgl akhir
    var tglakhir=$('#txttglakhir').val();
    //variabel total jual
    var jum=0;
    //variabel array tgl
    var atgl=[];
    //variabel array totaljual
    var atjual=[];
    //variabel qty barang
    var aqty=[];

    var data='LapDatarpenjualantgl=1&tglawal='+tglawal+'&tglakhir='+tglakhir;
    $('#loading').show();
    $('#tabledata').hide();
    $('#gagal').hide();
    $.ajax({
        type : 'POST',
        url : "api-server/tampildata.php",
        async : true,
        beforeSend: function(x){
            if(x && x.overrideMimeType) {
                 x.overrideMimeType("application/j-son;charset=UTF-8");
            }           
        },
        data : data,
        dataType : 'json',
        success: function(data){          
            $('#lap_data_rpenjualantgl').empty();
            $('#lap_data_rpenjualantgl').html('<tbody><tr>'
                                        +'<th>Tanggal</th>'
                                        +'<th>Qty Penjualan</th>'
                                        +'<th>Total Penjualan</th>'
                                        +'<th>Rata Harga Jual</th>'
                                        +'</tr></tbody>');
            minta=data.items;
            $.each(minta, function(index,loaddata){
                $('#lap_data_rpenjualantgl').append('<tr>'
                                                +'<td>'+loaddata.tgl+'</td>'
                                                +'<td>'+loaddata.qtyjual+'</td>'
                                                +'<td>'+loaddata.totaljual+'</td>'
                                                +'<td>'+loaddata.rhargajual+'</td>'
                                                +'</tr>');
                //total penjualan
                jum=jum+parseFloat(loaddata.totaljual);      
                atgl.push(loaddata.tgl);
                atjual.push(parseFloat(loaddata.totaljual)/1000);
                aqty.push(parseFloat(loaddata.qtyjual));
            });
            $('#loading').hide();
            $('#tabledata').show();       
            $('#lap_data_rpenjualantgl').append('<tr>'
                                            +'<td><b>TOTAL</b></td>'
                                            +'<td></td>'
                                            +'<td><b>'+jum+'</b></td>'
                                            +'<td></td>'
                                            +'</tr>');            
            grafik_data_rpenjualantgl(atgl,atjual,aqty);  
        },
        error: function(jqXHR, eception){
            $('#loading').hide();
            $('#gagal').show();
        }
    })
}
//grafik rpenjualantgl
function grafik_data_rpenjualantgl(x,y,y2){
        var lineChartData = {
            labels : x,
            datasets : [
                {
                    fillColor : "rgba(151,187,205,0.5)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data : y
                },
                {
                    fillColor : "rgba(254,255,181,0.5)",
                    strokeColor : "rgba(254,255,181,1)",
                    pointColor : "rgba(254,255,181,1)",
                    pointStrokeColor : "#C5C671",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(254,255,181,1)",                    
                    data : y2
                }
            ]
            
        }

    var myLine = new Chart(document.getElementById("grafik_data_rpenjualantgl").getContext("2d")).Line(lineChartData);
}
//Laporan Rekap Penjualan Tgl - end




//Laporan Penjualan Periode
//fungsi tampil
function lap_data_penjualanperiode(){
    //tgl awal
    var tglawal=$('#txttglawal').val();
    //tgl akhir
    var tglakhir=$('#txttglakhir').val();
    //hitungan pie pelanggan
    var jum=0,tjumx=0,ttjumx=0;
    var tjum=0,tjumy=0,ttjumy=0;
    var data='LapDatapenjualanperiode=1&tglawal='+tglawal+'&tglakhir='+tglakhir;
    $('#loading').show();
    $('#tabledata').hide();
    $('#gagal').hide();
    $.ajax({
        type : 'POST',
        url : "api-server/tampildata.php",
        async : true,
        beforeSend: function(x){
            if(x && x.overrideMimeType) {
                 x.overrideMimeType("application/j-son;charset=UTF-8");
            }           
        },
        data : data,
        dataType : 'json',
        success: function(data){          
            $('#lap_data_penjualanperiode').empty();
            $('#lap_data_penjualanperiode').html('<thead><tr>'
                                        +'<th>Tanggal</th>'
                                        +'<th>No Faktur</th>'
                                        +'<th>Nama</th>'
                                        +'<th>Tunai</th>'                                        
                                        +'<th>Hutang</th>'
                                        +'<th>Total</th>'                                        
                                        +'</tr></thead><tbody>');
            minta=data.items;
            $.each(minta, function(index,loaddata){
                if (loaddata.nama=='UMUM'){
                    var baris='<tr>';
                    //total transaksi umum
                    tjumx=tjumx+1;        
                    ttjumx=ttjumx+parseFloat(loaddata.total);            
                }else{
                    var baris='<tr class="success">';
                    //total transaksi pelanggan
                    tjumy=tjumy+1;
                    ttjumy=ttjumy+parseFloat(loaddata.total);            
                }
                $('#lap_data_penjualanperiode').append(baris
                                                +'<td>'+loaddata.tgl+'</td>'
                                                +'<td>'+loaddata.notrans+'</td>'
                                                +'<td>'+loaddata.nama+'</td>'
                                                +'<td>'+loaddata.tunai+'</td>'
                                                +'<td>'+loaddata.piutang+'</td>'
                                                +'<td>'+loaddata.total+'</td>'                                                                                                
                                                +'</tr>');
                //total penjualan
                jum=jum+parseFloat(loaddata.total);  

            });
            $('#loading').hide();
            $('#tabledata').show();       
            $('#lap_data_penjualanperiode').append('<tr>'
                                            +'<td><b>TOTAL</b></td>'
                                            +'<td></td>'
                                            +'<td></td>'
                                            +'<td></td>'
                                            +'<td></td>'                                                                                        
                                            +'<td><b>'+jum+'</b></td>'
                                            +'</tr></tbody>');      

            grafik_data_penjualanperiode_pelanggan(tjumx,tjumy);         
            grafik_data_penjualanperiode_tjualpelanggan(ttjumx,ttjumy);         

        },
        error: function(jqXHR, eception){
            $('#loading').hide();
            $('#gagal').show();
        }
    })
}
//grafik penjualan periode - pie pelanggan dan umum
function grafik_data_penjualanperiode_pelanggan(x,y){
        var pieData = [
                {
                    value: x,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Umum"
                },
                {
                    value: y,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Pelanggan"
                }
            ];
            
    

    var myPie = new Chart(document.getElementById("grafik_data_penjualanperiode_pelanggan").getContext("2d")).Pie(pieData);
}
//grafik penjualan periode - pie omset pelanggan dan umum
function grafik_data_penjualanperiode_tjualpelanggan(x,y){
        var pieData = [
                {
                    value: x,
                    color:"#CA0101",
                    highlight: "#FF0000",
                    label: "Umum"
                },
                {
                    value: y,
                    color: "#009933",
                    highlight: "#3CD16E",
                    label: "Pelanggan"
                }
            ];
            
    

    var myPie = new Chart(document.getElementById("grafik_data_penjualanperiode_tjualpelanggan").getContext("2d")).Pie(pieData);
}
//Laporan Penjualan Periode - end