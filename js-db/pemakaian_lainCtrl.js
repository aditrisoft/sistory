adiapp.controller('pemakaian_lainCtrl', function($scope,$http) {

  $scope.link_database=link_database;

  //set default untuk ng-model
  $scope.txtcari="";
  $scope.animation_image=true;
  $scope.TmbSimpan=true;
  $scope.TmbUpdate=false;
  $scope.listx=[]; //-> deklarasi awal untuk memanciang agar data keluar utk tampilProduk()
  var d = new Date(Date.now());
  $scope.txttgl=d;


  $scope.hapusData = function(kode){
    var r = confirm ("Yakin akan dihapus");
    if (r==false){return;}
    $http.post(link_database+"list-pemakaian_lain-cud.php",{
      'cud':'hapus',
      'nokwit':kode
    }).then(function(response){
    $scope.tampilData();
//      alert('Hapus Sukses!');
    },function(error){
      alert('Hapus Gagal');
    });
  }

  $scope.SimpanData = function(){
  var r =confirm("yakin data yang anda masukkan sudah benar?");
  if (r==false){return;}
  $http.post(link_database+"list-pemakaian_lain-cud.php",{
      'cud':'input',
      'tgl':$scope.txttgl,
      'rincian':$scope.txtrincian,
      'produk_id':$scope.txtproduk_id,
      'qty':$scope.txtqty,
      'nokwit':''
    }).success(function(data, status, headers, config){
      //jika ada pesan munculkan saja
      if(data!=''){
        alert(data);
      }      
      $scope.tampilData();
      $scope.bersihData();
//      alert('Sukses Menyimpan!');
      $('#myModal').modal('hide');      
    },function(error){
      alert('Gagal Menyimpan!');
  });

  }

  $scope.bersihData = function(){
    $scope.TmbSimpan=true;
    $scope.TmbUpdate=false;
    $scope.txtrincian='';
    $scope.txtqty='';
    $scope.dskode=false;
  }


  $scope.tampilCari = function(){
//    $scope.isi=[];
    item_num=0;
    $scope.tampilData();
  }


  $scope.tampilJumlah = function(){
    $scope.animation_image=true;
    $http.get(link_database+'list-pemakaian_lain.php?cari='+$scope.txtcari).success(function(data,status,header,config){
      $scope.jumx=data;
        if ($scope.jumx.length==0){
          $scope.total_pencarian='Tidak ada data ditemukan!';
        }else{
          $scope.total_pencarian=$scope.jumx.length+' Data ditemukan!';
        }
      });
  }

  $scope.tampilData = function(){
    $scope.tampilJumlah();
    $http.get(link_database+'list-pemakaian_lain.php?cari='+$scope.txtcari).success(function(data,status,header,config){
      $scope.animation_image=true;
        $scope.isi=data;
      $scope.animation_image=false;
      });
  }  

  $scope.tampilOptProduk = function(){
    $http.get('api-server/list-produk.php').success(function(data,status,header,config){
        $scope.produk=data;   
        $scope.txtproduk_id=$scope.produk[0].produk_id;
      });
  }

  $scope.tampilOptProduk();

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
        angular.element(document.getElementById('pemakaian_lainCtrl')).scope().tampilProduk();
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