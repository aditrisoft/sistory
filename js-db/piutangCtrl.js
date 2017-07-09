adiapp.controller('piutangCtrl', function($scope,$http) {

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
  $scope.txttglawal= new Date(new Date().getFullYear(), 0, 1);
  $scope.txttglakhir=d;



  $scope.ProsesBayar = function(){
    var r =confirm("Yakin data yang Anda masukkan sudah benar?");
    if (r==false){return;}
    $http.post(link_database+"list-piutang-cud.php",{
        'cud':'cicil',
        'nokwit':$scope.txtnokwit,
        'tgl':$scope.txttgl,
        'cicilan':$scope.txtbayar,
        'noperk':$scope.txtnoperkbank,
        'carabayar':$scope.txtcarabayar,
        'pelanggan':$scope.txtpelanggan
      }).success(function(data, status, headers, config){
        $scope.tampilData();
        $scope.tampilRincian($scope.txtnokwit);
        alert('Pembayaran Sukses!');
        $scope.bersihData();
      },function(error){
        alert('Gagal Menyimpan!');
    });
  }


  $scope.bersihData = function(){
    $scope.TmbSimpan=true;
    $scope.TmbUpdate=false;
    $scope.txttgl=d;
    $scope.txtnokwit='';
    $scope.txtpelanggan='';
  }



  $scope.tampilDetail = function(kode){
    $scope.animation_image2=true;    
    $scope.dskode=true;
    $scope.TmbSimpan=true;
//    $scope.TmbUpdate=true;
    $http.post(link_database+"list-piutang-cud.php",{
      'cud':'lain',
      'nokwit':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;     
      $scope.txtnokwit=$scope.cud[0].nokwit;
      $scope.txtkurangbayar=parseFloat($scope.cud[0].sisa);
      $scope.txtbayar=parseFloat($scope.cud[0].sisa);
      $scope.txtpelanggan=$scope.cud[0].pelanggan;
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }

  $scope.tampilRincian = function(kode){
    $scope.animation_image2=true;    
    $scope.dskode=true;
    $scope.TmbSimpan=true;
//    $scope.TmbUpdate=true;
    $http.post(link_database+"list-piutang-cud.php",{
      'cud':'detail',
      'nokwit':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data; 
      $scope.listisix=data;
      if($scope.listisix.length==0){
        $scope.animation_image2=false;
      }         
      $scope.txtnokwit=$scope.cud[0].nokwit;
      $scope.txtpelanggan=$scope.cud[0].pelanggan;
      $scope.animation_image2=false;
     },function(error){
      alert('Gagal Menyimpan!');
    });
  } 


  $scope.hapusIsi = function(kode,nokwit){
    var r =confirm("Yakin akan dihapus?");
    if (r==false){return;}
    $http.post(link_database+"list-piutang-cud.php",{
      'cud':'hapus',
      'notrans':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;     
      $scope.tampilRincian(nokwit);
      $scope.tampilData();
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
    $http.get(link_database+'list-piutang.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)).success(function(data,status,header,config){
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
    $http.get(link_database+'list-piutang.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)).success(function(data,status,header,config){
      $scope.animation_image=true;
        $scope.isi=data;
          //tampilkan total
          $scope.totalpiutang=0;
          $scope.totalterbayar=0;
          $scope.totalsisa=0;
          for (i=0;i<parseFloat($scope.isi.length);i++){
            $scope.totalpiutang=parseFloat($scope.totalpiutang)+parseFloat($scope.isi[0].nominal);
            $scope.totalterbayar=parseFloat($scope.totalterbayar)+parseFloat($scope.isi[0].terbayar);
            $scope.totalsisa=parseFloat($scope.totalsisa)+parseFloat($scope.isi[0].sisa);
          }        
      $scope.animation_image=false;
      });
  }  

  $scope.tampilOptCarabayar = function(){
        $scope.carabayar=[{"kode":"0","uraian":"Transfer Bank"},{"kode":"1","uraian":"Tunai"}];
        $scope.txtcarabayar='0';
        $scope.rekbank=true;
  } 

  $scope.tampilOptCarabayar();  

  $scope.tampilOptBank = function(){
    $http.get('api-server/list-bank.php').success(function(data,status,header,config){
        $scope.bank=data;   
        $scope.txtnoperkbank=$scope.bank[0].noperk;
      });
  }

  $scope.tampilOptBank();

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
        angular.element(document.getElementById('piutangCtrl')).scope().tampilProduk();
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