adiapp.controller('kasCtrl', function($scope,$http) {

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
    $http.post(link_database+"list-kas-cud.php",{
      'cud':'hapus',
      'id':kode
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
    $http.post(link_database+"list-kas-cud.php",{
        'cud':'input',
        'keterangan':$scope.txtketerangan,
        'masuk':$scope.txtmasuk,
        'keluar':$scope.txtkeluar,
        'noperk':$scope.txtnoperk,
        'namaperk':$scope.txtnamaperk,
        'usernama':'admin'
      }).then(function(response){
        $scope.tampilData();
        $scope.bersihData();
  //      alert('Sukses Menyimpan!');
        $('#myModalMasuk').modal('hide');      
        $('#myModalKeluar').modal('hide');      
      },function(error){
        alert('Gagal Menyimpan!');
    });

  }

  $scope.bersihData = function(){
    $scope.TmbSimpan=true;
    $scope.TmbUpdate=false;
    $scope.txtidkas='';
    $scope.txtnama='';
    $scope.txtalamat='';
    $scope.txtketerangan='';
    $scope.txtkeluar='';
    $scope.txtmasuk='';
    $scope.txtnoperk='';
    $scope.txtnamaperk='';
    $scope.dskode=false;
  }


  $scope.tampilCari = function(){
//    $scope.isi=[];
    item_num=0;
    $scope.tampilData();
  }

  $scope.tampilJumlah = function(){
    $scope.animation_image=true;
    $http.get(link_database+'list-kas.php?cari='+$scope.txtcari).success(function(data,status,header,config){
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
    $http.get(link_database+'list-kas.php?cari='+$scope.txtcari).success(function(data,status,header,config){
        $scope.animation_image=true;
        $scope.isi=data;
        $scope.animation_image=false;
      });
  }  


  $scope.txtcarinoperk="";
  $scope.tampilListNoperkJumlah = function(){
    $scope.animation_image=true;
    $http.get(link_database+'list-noperk.php?cari='+$scope.txtcarinoperk).success(function(data,status,header,config){
      $scope.jumx=data;
        if ($scope.jumx.length==0){
          $scope.total_pencarian_noperk='Tidak ada data ditemukan!';
        }else{
          $scope.total_pencarian_noperk=$scope.jumx.length+' Data ditemukan!';
        }
      });
  }

  $scope.tampilListNoperk = function(){
    $scope.tampilListNoperkJumlah();
    $http.get(link_database+'list-noperk.php?cari='+$scope.txtcarinoperk).success(function(data,status,header,config){
        $scope.animation_image=true;
        $scope.lscarinoperk=data;
        $scope.animation_image=false;
      });
  }  

  $scope.tampilListNoperk();

  $scope.ambilListCariNoperk= function(kode){
    $http.post(link_database+"list-noperk-cud.php",{
      'cud':'detail',
      'noperk':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtnoperk=$scope.cud[0].noperk;
      $scope.txtnamaperk=$scope.cud[0].namaperk;
     },function(error){
      alert('Gagal Menyimpan!');
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
        angular.element(document.getElementById('kasCtrl')).scope().tampilProduk();
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