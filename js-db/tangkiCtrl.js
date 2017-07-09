adiapp.controller('tangkiCtrl', function($scope,$http) {

  $scope.link_database=link_database;

  //set default untuk ng-model
  $scope.txtcari="";
  $scope.animation_image=true;
  $scope.TmbSimpan=true;
  $scope.TmbUpdate=false;
  $scope.listx=[]; //-> deklarasi awal untuk memanciang agar data keluar utk tampilProduk()

  $scope.hapusData = function(kode){
    var r = confirm ("Yakin akan dihapus");
    if (r==false){return;}
    $http.post(link_database+"list-tangki-cud.php",{
      'cud':'hapus',
      'idtangki':kode
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
  $http.post(link_database+"list-tangki-cud.php",{
      'cud':'input',
      'idtangki':$scope.txtidtangki,
      'tangki':$scope.txttangki,
      'deskripsi':$scope.txtdeskripsi,
      'produk_id':$scope.txtproduk_id
    }).then(function(response){
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
    $scope.txtidtangki='';
    $scope.txttangki='';
    $scope.txtdeskripsi='';
    $scope.txtproduk_id='';
    $scope.txtproduk_nama='';
    $scope.dskode=false;
  }

  $scope.detailData = function(kode){
    $scope.dskode=true;
    $scope.TmbSimpan=false;
    $scope.TmbUpdate=true;
    $http.post(link_database+"list-tangki-cud.php",{
      'cud':'detail',
      'idtangki':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtidtangki=$scope.cud[0].idtangki;
      $scope.txttangki=$scope.cud[0].tangki;
      $scope.txtdeskripsi=$scope.cud[0].deskripsi;
      $scope.txtproduk_id=$scope.cud[0].produk_id;
      $scope.txtproduk_nama=$scope.cud[0].produk_nama;
      $('#myModal').modal('show');
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }

  $scope.updateData = function(){
    var r =confirm("yakin akan diupdate?");
    if (r==false){return;}
    $http.post(link_database+"list-tangki-cud.php",{
      'cud':'edit',
      'idtangki':$scope.txtidtangki,
      'tangki':$scope.txttangki,
      'deskripsi':$scope.txtdeskripsi,
      'produk_id':$scope.txtproduk_id
    }).then(function(response){
    $scope.tampilData();
    $scope.bersihData();
      $('#myModal').modal('hide');
//      alert('Edit Data Sukses!');
    },function(error){
      $('#myModal').modal('hide');
      alert('Update Gagal!');
    });
  }

  $scope.tampilCari = function(){
//    $scope.isi=[];
    item_num=0;
    $scope.tampilData();
  }

  $scope.tampilJumlah = function(){
    $scope.animation_image=true;
    $http.get(link_database+'list-tangki.php?cari='+$scope.txtcari).success(function(data,status,header,config){
      $scope.jumx=data;
        if ($scope.jumx.length==0){
          $scope.total_pencarian='Tidak ada data ditemukan!';
        }else{
          $scope.total_pencarian=$scope.jumx.length+' Nomor Perkiraan ditemukan!';
        }
      });
  }

  $scope.tampilData = function(){
    $scope.tampilJumlah();
    $http.get(link_database+'list-tangki.php?cari='+$scope.txtcari).success(function(data,status,header,config){
      $scope.animation_image=true;
        $scope.isi=data;
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
        angular.element(document.getElementById('tangkiCtrl')).scope().tampilProduk();
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