adiapp.controller('pbCtrl', function($scope,$http) {

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
    $http.post(link_database+"list-pb-cud.php",{
      'cud':'hapus',
      'nopb':kode
    }).success(function(data, status, headers, config){
      if(data!=''){
        alert(data);
      }else{
        $scope.tampilData();
        $scope.bersihData();        
      }
//      alert('Hapus Sukses!');
    },function(error){
      alert('Hapus Gagal');
    });
  }

  $scope.SimpanData = function(){
    var r =confirm("yakin data yang anda masukkan sudah benar?");
    if (r==false){return;}
    $http.post(link_database+"list-pb-cud.php",{
        'cud':'input',
        'tgl':$scope.txttgl,
        'produk_id':$scope.txtproduk_id,
        'harga':$scope.txtharga,
        'qty':$scope.txtqty,
        'noref':$scope.txtnoref,
        'usernama':'admin',
        'idsuplier':$scope.txtidsuplier,
        'nopb':$scope.txtnopb //=> kalo ini ada isinya tidak perlu buat transaksi nopb baru
      }).success(function(data, status, headers, config){
        $('#myModal').modal('hide');  
        $('.modal-backdrop').remove();    
        $scope.txtnopb=data;
        $scope.tampilIsiPB($scope.txtnopb); 
        $scope.bersihProduk();
        $scope.tampilData();
      },function(error){
        alert('Gagal Menyimpan!');
    });
  }

  $scope.EditData = function(){
//    alert(parseFloat($scope.total)-parseFloat($scope.txtuangmuka));
    var r =confirm("Yakin data yang Anda masukkan sudah benar?");
    if (r==false){return;}
    $http.post(link_database+"list-pb-cud.php",{
        'cud':'edit',
        'tgl':$scope.txttgl,
        'noref':$scope.txtnoref,
        'usernama':'admin',
        'idsuplier':$scope.txtidsuplier,
        'suplier':$scope.txtsuplier,
        'cara_bayar':$scope.txtcarabayar,   
        'noperk':$scope.txtnoperkbank,
        'jmlbayar':$scope.txtuangmuka,
        'kurangbayar':parseFloat($scope.total)-parseFloat($scope.txtuangmuka),            
        'nopb':$scope.txtnopb //=> kalo ini ada isinya tidak perlu buat transaksi nopj baru
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
    $scope.txtnopb='';
    $scope.txtnoref='';
    $scope.dskode=false;
    $scope.listisipb=[];
    $scope.txtidsuplier='';
    $scope.txtsuplier='';
    $scope.txttgl=d;
    $scope.rekbank=false;
    $scope.total='';
    $scope.txtuangmuka='';
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
    $http.post(link_database+"list-pb-cud.php",{
      'cud':'detail',
      'nopb':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtnopb=$scope.cud[0].nopb;
      $scope.txttgl=new Date($scope.cud[0].tgl);
      $scope.txtnoref=$scope.cud[0].noref;
      $scope.tampilIsiPB($scope.txtnopb);
      $scope.txtsuplier=$scope.cud[0].suplier;
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }

  $scope.tampilTotal = function(kode){
    $scope.icpanel1 = true;
    $scope.dskode=true;
    $scope.TmbSimpan=true;
//    $scope.TmbUpdate=true;
    $http.post(link_database+"list-pb-cud.php",{
      'cud':'detail',
      'nopb':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.total=$scope.cud[0].total;
      $scope.txtuangmuka=parseFloat($scope.cud[0].total);
      $scope.tampilOptCarabayar();  
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
    $http.get(link_database+'list-pb.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)).success(function(data,status,header,config){
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
    $http.get(link_database+'list-pb.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)).success(function(data,status,header,config){
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
      $scope.txtharga=parseFloat($scope.cud[0].harga_jual);
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }


  $scope.txtcarisuplier="";
  $scope.tampilListsuplierJumlah = function(){
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

  $scope.tampilListsuplier = function(){
    $scope.tampilListsuplierJumlah();
    $http.get(link_database+'list-suplier.php?cari='+$scope.txtcarisuplier).success(function(data,status,header,config){
        $scope.animation_image=true;
        $scope.lscarisuplier=data;
        $scope.animation_image=false;
      });
  }  

  $scope.tampilListsuplier();

  $scope.ambilListCarisuplier= function(kode){
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


  $scope.tampilIsiPB = function(kode){
        $http.post(link_database+"list-pb_detail-cud.php",{
          'cud':'lain',
          'nopb':kode
        }).success(function(data, status, headers, config){
          $scope.animation_image2=false;          
          $scope.listisipb=data; 
          $scope.tampilTotal(kode);
        },function(error){
            alert("Sorry! gag ada data!<br>Kode Error: "+error);
        });   
  }

  $scope.hapusIsiPB = function(kode){
    var r = confirm ("Yakin akan dihapus");
    if (r==false){return;}
    $http.post(link_database+"list-pb_detail-cud.php",{
      'cud':'hapus',
      'nopb':$scope.txtnopb,
      'produk_id':kode
    }).success(function(data, status, headers, config){
      $scope.tampilIsiPB($scope.txtnopb);
      $scope.tampilData();
    },function(error){
      alert('Hapus Gagal');
    });
  }

  $scope.tampilOptCarabayar = function(){
    $scope.carabayar=[{"kode":"0","uraian":"Transfer Bank"},{"kode":"1","uraian":"Tunai"},{"kode":"2","uraian":"Piutang"}];      
    $scope.txtcarabayar="1";  
  } 

  $scope.cekcarabayar = function(){
    if ($scope.txtcarabayar=="0"){
      $scope.rekbank=true;
    }
    if ($scope.txtcarabayar=="1"){
      $scope.rekbank=false;      
    }
    if ($scope.txtcarabayar=="2"){
      $scope.rekbank=false;      
      $scope.txtbayar=$scope.txttotal;
    }
  }

  $scope.tampilOptBank = function(){
    $http.get('api-server/list-bank.php').success(function(data,status,header,config){
        $scope.bank=data;   
        $scope.txtnoperkbank=$scope.bank[0].noperk;
      });
  }

  $scope.tampilOptCarabayar();
  $scope.tampilOptBank();




  $scope.printDetail = function(kode){
    $scope.cetakPO=true;
    $scope.TmbSimpan=true;
    $http.post(link_database+"list-pb-cud.php",{
      'cud':'detail',
      'nopb':kode
    }).success(function(data, status, headers, config){
      alert(data);
      $scope.cud=data;
      $scope.txtnopb=$scope.cud[0].nopb;
      $scope.txttgl=$scope.cud[0].tgl;
      $scope.txtnoref=$scope.cud[0].noref;
      $scope.txtsuplier=$scope.cud[0].suplier;
      $scope.total=$scope.cud[0].total;
      $scope.listisipb =[]
      $http.post(link_database+"list-pb_detail-cud.php",{
          'cud':'lain',
          'nopb':kode
        }).success(function(data, status, headers, config){
          $scope.animation_image2=false;          
          $scope.listisipb=data;    
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
        angular.element(document.getElementById('pbCtrl')).scope().tampilProduk();
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