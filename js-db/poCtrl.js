adiapp.controller('poCtrl', function($scope,$http) {

  $scope.link_database=link_database;
  $scope.namainstansi=namainstansi;
  $scope.alamatinstansi=alamatinstansi;

  //set default untuk ng-model
  $scope.txtcari="";
  $scope.animation_image=true;
  $scope.TmbSimpan=true;
  $scope.TmbUpdate=false;
  $scope.listx=[]; //-> deklarasi awal untuk memanciang agar data keluar utk tampilProduk()
  var d = new Date(Date.now());
  $scope.txttgl=d;
  $scope.txttglawal=d;
  $scope.txttglakhir=d;

  $scope.hapusData = function(kode){
    var r = confirm ("Yakin akan dihapus");
    if (r==false){return;}
    $http.post(link_database+"list-po-cud.php",{
      'cud':'hapus',
      'nopo':kode
    }).success(function(data, status, headers, config){
    $scope.tampilData();
    $scope.bersihData();
//      alert('Hapus Sukses!');
    },function(error){
      alert('Hapus Gagal');
    });
  }

  $scope.SimpanData = function(){
    var r =confirm("yakin data yang anda masukkan sudah benar?");
    if (r==false){return;}
    $http.post(link_database+"list-po-cud.php",{
        'cud':'input',
        'tgl':$scope.txttgl,
        'produk_id':$scope.txtproduk_id,
        'harga':$scope.txtharga,
        'qty':$scope.txtqty,
        'noref':$scope.txtnoref,
        'usernama':'admin',
        'idsuplier':$scope.txtidsuplier,
        'nopo':$scope.txtnopo //=> kalo ini ada isinya tidak perlu buat transaksi nopo baru
      }).success(function(data, status, headers, config){
        $scope.txtnopo=data;
        $scope.tampilIsiPO($scope.txtnopo); 

        $scope.bersihProduk();
        $scope.tampilData();
        $('#myModal').modal('hide');      
      },function(error){
        alert('Gagal Menyimpan!');
    });
  }

  $scope.EditData = function(){
//    var r =confirm("yakin data yang anda masukkan sudah benar?");
//    if (r==false){return;}
    $http.post(link_database+"list-po-cud.php",{
        'cud':'edit',
        'tgl':$scope.txttgl,
        'noref':$scope.txtnoref,
        'usernama':'admin',
        'idsuplier':$scope.txtidsuplier,        
        'nopo':$scope.txtnopo //=> kalo ini ada isinya tidak perlu buat transaksi nopo baru
      }).success(function(data, status, headers, config){
        $scope.tampilData();
        alert('Data Tersimpan!');
        $scope.bersihData();
      },function(error){
        alert('Gagal Menyimpan!');
    });
  }


  $scope.bersihData = function(){
    $scope.TmbSimpan=true;
    $scope.TmbUpdate=false;
    $scope.txtharga='';
    $scope.txtproduk_id='';
    $scope.txtharga='';
    $scope.txtproduk_nama='';
    $scope.txtqty='';
    $scope.txttotal='';
    $scope.txtnopo='';
    $scope.txtnoref='';
    $scope.dskode=false;
    $scope.listisipo=[];
    $scope.txtidsuplier='';
    $scope.txtsuplier='';
    $scope.txttgl=d;
  }

  $scope.bersihProduk = function(){
    $scope.txtproduk_id='';
    $scope.txtharga='';
    $scope.txtproduk_nama='';
    $scope.txtqty='';
    $scope.txttotal='';
    $scope.dskode=false;
  }

  $scope.tampilDetail = function(kode){
    $scope.icpanel1 = true;
    $scope.animation_image2=true;    
    $scope.dskode=true;
    $scope.TmbSimpan=true;
//    $scope.TmbUpdate=true;
    $http.post(link_database+"list-po-cud.php",{
      'cud':'detail',
      'nopo':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtnopo=$scope.cud[0].nopo;
      $scope.txttgl=new Date($scope.cud[0].tgl);
      $scope.txtnoref=$scope.cud[0].noref;
      $scope.tampilIsiPO($scope.txtnopo);
      $scope.txtsuplier=$scope.cud[0].suplier;
      $scope.total=$scope.cud[0].total;
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }


  $scope.tampilCari = function(){
//    $scope.isi=[];
    item_num=0;
    $scope.tampilData();
  }

  $scope.tampilJumlah = function(){
    $scope.animation_image=true;
    $http.get(link_database+'list-po.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)).success(function(data,status,header,config){
      $scope.jumx=data;
        if ($scope.jumx.length==0){
          $scope.total_pencarian='Tidak ada data ditemukan!';
          $scope.showtotallist=false;
        }else{
          $scope.total_pencarian=$scope.jumx.length+' data ditemukan!';
          $scope.showtotallist=true;
        }
      });
  }

  $scope.tampilData = function(){
    $scope.tampilJumlah();
    $http.get(link_database+'list-po.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)).success(function(data,status,header,config){
      $scope.animation_image=true;
        $scope.isi=data;
          //tampilkan total
          $scope.totallist=0;
          for (i=0;i<parseFloat($scope.isi.length);i++){
            $scope.totallist=parseFloat($scope.totallist)+parseFloat($scope.isi[i].total);
          }        
      $scope.animation_image=false;
      });
  }  

  $scope.txtcariproduk="";
  $scope.tampilListProdukJumlah = function(){
    $scope.animation_image=true;
    $http.get(link_database+'list-produk.php?cari='+$scope.txtcariproduk).success(function(data,status,header,config){
      $scope.jumx=data;
        if ($scope.jumx.length==0){
          $scope.total_pencarian_produk='Tidak ada data ditemukan!';
        }else{
          $scope.total_pencarian_produk=$scope.jumx.length+' Data ditemukan!';
        }
      });
  }

  $scope.tampilListProduk = function(){
    $scope.tampilListProdukJumlah();
    $http.get(link_database+'list-produk.php?cari='+$scope.txtcariproduk).success(function(data,status,header,config){
        $scope.animation_image=true;
        $scope.lscariproduk=data;
        $scope.animation_image=false;
      });
  }  

  $scope.tampilListProduk();

  $scope.ambilListCariProduk= function(kode){
    $http.post(link_database+"list-produk-cud.php",{
      'cud':'detail',
      'produk_id':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtproduk_id=$scope.cud[0].produk_id;
      $scope.txtproduk_nama=$scope.cud[0].produk_nama;
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }


  $scope.txtcarisuplier="";
  $scope.tampilListSuplierJumlah = function(){
    $scope.animation_image=true;
    $http.get(link_database+'list-suplier.php?cari='+$scope.txtcarisuplier).success(function(data,status,header,config){
      $scope.jumx=data;
        if ($scope.jumx.length==0){
          $scope.total_pencarian_produk='Tidak ada data ditemukan!';
        }else{
          $scope.total_pencarian_produk=$scope.jumx.length+' Data ditemukan!';
        }
      });
  }

  $scope.tampilListSuplier = function(){
    $scope.tampilListSuplierJumlah();
    $http.get(link_database+'list-suplier.php?cari='+$scope.txtcarisuplier).success(function(data,status,header,config){
        $scope.animation_image=true;
        $scope.lscarisuplier=data;
        $scope.animation_image=false;
      });
  }  

  $scope.tampilListSuplier();

  $scope.ambilListCariSuplier= function(kode){
    $http.post(link_database+"list-suplier-cud.php",{
      'cud':'detail',
      'idsuplier':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtidsuplier=$scope.cud[0].idsuplier;
      $scope.txtsuplier=$scope.cud[0].nama;
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }


  //tampil diagnosa per pasien
  $scope.tampilIsiPO = function(kode){
        $http.post(link_database+"list-po_detail-cud.php",{
          'cud':'lain',
          'nopo':kode
        }).success(function(data, status, headers, config){
        $scope.animation_image2=false;          
        $scope.listisipo=data; 
        },function(error){
            alert("Sorry! gag ada data!<br>Kode Error: "+error);
        });   
  }

  $scope.hapusIsiPO = function(kode){
    var r = confirm ("Yakin akan dihapus");
    if (r==false){return;}
    $http.post(link_database+"list-po_detail-cud.php",{
      'cud':'hapus',
      'nopo':$scope.txtnopo,
      'produk_id':kode
    }).then(function(response){
      $scope.tampilIsiPO($scope.txtnopo);
      $scope.tampilData();
    },function(error){
      alert('Hapus Gagal');
    });
  }

  $scope.bukaDO = function(kode){
    var r = confirm ("Terima DO dari PO ini?");
    if (r==false){return;}    
    $http.post(link_database+"list-po-cud.php",{
      'cud':'do',
      'nopo':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      alert(data);
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }



  $scope.printDetail = function(kode){
    $scope.cetakPO=true;
    $scope.TmbSimpan=true;
    $http.post(link_database+"list-po-cud.php",{
      'cud':'detail',
      'nopo':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtnopo=$scope.cud[0].nopo;
      $scope.txttgl=$scope.cud[0].tgl;
      $scope.txtnoref=$scope.cud[0].noref;
      $scope.txtsuplier=$scope.cud[0].suplier;
      $scope.total=$scope.cud[0].total;
      $scope.listisipo =[]
      $http.post(link_database+"list-po_detail-cud.php",{
          'cud':'lain',
          'nopo':kode
        }).success(function(data, status, headers, config){
          $scope.animation_image2=false;          
          $scope.listisipo=data;    
          $scope.cetakPO=false;    
        });         
     },function(error){
      alert('Gagal Menampilkan!');
    });
  }


  $scope.tampilData();
});




  //fungsi untuk loadmore page menggunakan JQuery dan onscroll
  var posisiS;
  var tinggiS;
  var layarS;
  function loadlagi(){
    posisiS = parseInt($('.tabelx').scrollTop()); //=> untuk ambil tinggi keseluruhan dari table
    tinggiS = parseInt($('.tabelx').prop('scrollHeight')); //=> untuk mengambil posisi scroll
    layarS = parseInt($('.tabelx').height()); //=> untuk mengambil tinggi table tanpa scroll
    //Posisi scroll mentok ke bawah
      if((posisiS+layarS) >= (tinggiS-1)){
        //panggil fungsi tampilProduk dari angular
        angular.element(document.getElementById('poCtrl')).scope().tampilProduk();
      }
  }



  
  
  //fungsi untuk cek gambar/file ada atau tidak 
  function UrlExists(url)
  {
      var http = new XMLHttpRequest();
      http.open('HEAD', url, false);
      http.send();
      return http.status!=404;
  }


  adiapp.directive('enter',function(){
    return function(scope,element,attrs){
        element.bind("keydown keypress",function(event){
            if(event.which===13){
                event.preventDefault();
                var fields=$(this).parents('form:eq(0),body').find('input, textarea, select, button');
                var index=fields.index(this);
                if(index> -1&&(index+1)<fields.length)
                    fields.eq(index+1).focus();
            }
        });
    };
});



function printContent(el){
    //cetak
//     var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById(el).innerHTML;
    var popupWin = window.open('', '_blank','fullscreen=yes');
  popupWin.document.open();
  popupWin.document.write('<html><head><style>@page {size: portrait; margin: 10mm 20mm 10mm 20mm; /* change the margins as you want them to be. */</style><!--link href="css/bootstrap.min.css" rel="stylesheet"><link href="css/bootstrap-theme.css" rel="stylesheet"--><link href="css/elegant-icons-style.css" rel="stylesheet" /><link href="css/print-table.css" rel="stylesheet"><style>body,.table{font: 1em "Helvetica Neue", Helvetica, Arial, sans-serif;} .hideprint{display:none;} .pra-cetak{display:initial;}</style></head><body onload="window.print()">' + printcontent + '</body></html>');
  popupWin.document.close();
//      document.body.innerHTML = printcontent;
//      window.print();
//      document.body.innerHTML = restorepage;
    
}