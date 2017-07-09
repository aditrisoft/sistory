//EDIT PRODUK
function form_edit_produk(acuan){
    //kosongkan form dahulu
    bersih_produk();
    //roling tombol
    $('#tmbTambah').hide();
    $('#tmbEdit').show();

    var kode=acuan;
    var data='EditDataProduk=1&kode='+kode;

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
            minta=data.items;
            $.each(minta, function(index,loaddata){
                $('#txtkodeproduk').val(loaddata.KodeProduk);
                $('#txtnama').val(loaddata.Nama);
                $('#txtdeskripsi').val(loaddata.Deskripsi);
                $('#txtsku').val(loaddata.SKU);
                $('#txtbarcode').val(loaddata.Barcode);
                $('#txtharga').val(loaddata.Harga);
                $('#txtpajak').val(loaddata.Pajak);
                $('#txtkategori').val(loaddata.Kategori);
                $('#txtsatuan').val(loaddata.Satuan);  

                $('#txtivarian').val(loaddata.isian_varian);  
                $('#txtdetail').val(loaddata.produk_detail);  
                $('#txthargaup').val(loaddata.HargaUp);  
                $('#txtindekscari').val(loaddata.indekscari);  

            });          
        },
        error: function(jqXHR, eception){
            alert("Data tidak bisa diload!!! Kode Eror:SOS3");
        }
    })    
}
function edit_data_produk(){
    var konfirmasi=confirm("Data ini akan diedit?");
    if (konfirmasi==true){    
        var txtkodeproduk= $('#txtkodeproduk').val();
        var txtnama = $('#txtnama').val();
        var txtdeskripsi = $('#txtdeskripsi').val();
        var txtsku = $('#txtsku').val();
        var txtbarcode = $('#txtbarcode').val();
        var txtharga = $('#txtharga').val();
        var txtpajak = $('#txtpajak').val();
        var txtkategori = $('#txtkategori').val();
        var txtsatuan = $('#txtsatuan').val();         

      var txtivarian = $('#txtivarian').val(); 
      var txtdetail = $('#txtdetail').val(); 
      var txthargaup = $('#txthargaup').val(); 
      var txtindekscari = $('#txtindekscari').val();    

        var data = 'KodeProduk=' + txtkodeproduk + '&Nama=' + txtnama  + '&Deskripsi=' + txtdeskripsi + '&SKU=' + txtsku + '&Barcode=' + txtbarcode + '&Harga=' + txtharga + '&Pajak=' + txtpajak + '&Kategori=' + txtkategori + '&Satuan=' + txtsatuan + '&txtivarian=' + txtivarian + '&txtdetail=' + txtdetail + '&txthargaup=' + txthargaup + '&txtindekscari=' + txtindekscari + '&fproduk=1';
        $.ajax({
            type: 'POST',
            url: "api-server/editdata.php",
            data: data,
            success: function() {
//                alert("Edit Data Berhasil!");
                tampil_data_produk();
                //close dialog            
                $('#myModal').modal('hide');                        
            }
        });
    }
}            
//EDIT PRODUK end



//EDIT pelanggan
function form_edit_pelanggan(acuan){
    //kosongkan form dahulu
    bersih_pelanggan();
    //roling tombol
    $('#tmbTambah').hide();
    $('#tmbEdit').show();

    var kode=acuan;
    var data='EditDataPelanggan=1&kode='+kode;

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
            minta=data.items;
            $.each(minta, function(index,loaddata){
                $('#txtkodepelanggan').val(loaddata.KodePelanggan);
                $('#txtnama').val(loaddata.nama);
                $('#txtjk').val(loaddata.jk);
                $('#txttelp').val(loaddata.telp);
                $('#txtemail').val(loaddata.email);
                $('#txtalamat').val(loaddata.alamat);
                $('#txtkota').val(loaddata.kota);
            });          
        },
        error: function(jqXHR, eception){
            alert("Data tidak bisa diload!!! Kode Eror:SOS3");
        }
    })    
}
function edit_data_pelanggan(){
    var konfirmasi=confirm("Data ini akan diedit?");
    if (konfirmasi==true){    
        var txtkodepelanggan= $('#txtkodepelanggan').val();
        var txtnama = $('#txtnama').val();
        var txtjk = $('#txtjk').val();
        var txttelp = $('#txttelp').val();
        var txtemail = $('#txtemail').val();
        var txtalamat = $('#txtalamat').val();
        var txtkota = $('#txtkota').val();                                                                

        var data = 'KodePelanggan=' + txtkodepelanggan + '&nama=' + txtnama  + '&jk=' + txtjk + '&telp=' + txttelp + '&email=' + txtemail + '&alamat=' + txtalamat + '&kota=' + txtkota + '&fpelanggan=1';
        $.ajax({
            type: 'POST',
            url: "api-server/editdata.php",
            data: data,
            success: function() {
//                alert("Edit Data Berhasil!");
                tampil_data_pelanggan();
                //close dialog            
                $('#myModal').modal('hide');                        
            }
        });
    }
}            
//EDIT pelanggan end