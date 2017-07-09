//TAMBAH PRODUK 
function input_data_produk(){
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

  var data = 'KodeProduk=' + txtkodeproduk + '&Nama=' + txtnama	 + '&Deskripsi=' + txtdeskripsi + '&SKU=' + txtsku + '&Barcode=' + txtbarcode + '&Harga=' + txtharga + '&Pajak=' + txtpajak + '&Kategori=' + txtkategori + '&Satuan=' + txtsatuan+ '&txtivarian=' + txtivarian + '&txtdetail=' + txtdetail + '&txthargaup=' + txthargaup + '&txtindekscari=' + txtindekscari + '&fproduk=1';
  $.ajax({
      type: 'POST',
      url: "api-server/inputdata.php",
      data: data,
      success: function() {
        alert("Input data sukses!");
        bersih_produk();         
        tampil_data_produk();
        //focus text utama
        $('#txtkodeproduk').focus();                           
      }
  });
}
function bersih_produk(){
  $('#txtkodeproduk').val('');
  $('#txtnama').val('');
  $('#txtdeskripsi').val('');
  $('#txtsku').val('');
  $('#txtbarcode').val('');
  $('#txtharga').val('');
  $('#txtpajak').val('');
  $('#txtkategori').val('');
  $('#txtsatuan').val('');  

  $('#txtivarian').val(''); 
  $('#txtdetail').val(''); 
  $('#txthargaup').val(''); 
  $('#txtindekscari').val('');   
  //tombol tambah aktif
  $('#tmbTambah').show();
  $('#tmbEdit').hide();  
} 
//TAMBAH PRODUK end



//TAMBAH pelanggan 
function input_data_pelanggan(){
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
      url: "api-server/inputdata.php",
      data: data,
      success: function() {
        alert("Input data sukses!");
        bersih_pelanggan();         
        tampil_data_pelanggan();
        //focus text utama
        $('#txtkodepelanggan').focus();                           
      }
  });
}
function bersih_pelanggan(){
  $('#txtkodepelanggan').val('');
  $('#txtnama').val('');
  $('#txtjk').val('');
  $('#txttelp').val('');
  $('#txtemail').val('');
  $('#txtalamat').val('');
  $('#txtkota').val('');
  //tombol tambah aktif
  $('#tmbTambah').show();
  $('#tmbEdit').hide();  
} 
//TAMBAH pelanggan end