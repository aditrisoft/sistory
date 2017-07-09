//hapus data produk
function hapus_data_produk(x){

    var konfirmasi=confirm("Data ini akan dihapus?");
    if (konfirmasi==true){
        var txtkodeproduk= x;                                                                   

        var data = 'KodeProduk=' + txtkodeproduk + '&fproduk=1';
        $.ajax({
            type: 'POST',
            url: "api-server/hapusdata.php",
            data: data,
            success: function() {
//                alert("Hapus Data Berhasil!");
                tampil_data_produk();                                                      
            }
        });
    }
}
//hapus data produk end



//hapus data pelanggan
function hapus_data_pelanggan(x){

    var konfirmasi=confirm("Data ini akan dihapus?");
    if (konfirmasi==true){
        var txtkodepelanggan= x;                                                                   

        var data = 'KodePelanggan=' + txtkodepelanggan + '&fpelanggan=1';
        $.ajax({
            type: 'POST',
            url: "api-server/hapusdata.php",
            data: data,
            success: function() {
//                alert("Hapus Data Berhasil!");
                tampil_data_pelanggan();                                                      
            }
        });
    }
}
//hapus data pelanggan end