adiapp.controller('transaksi_bbmCtrl', function($scope,$http) {

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
    $http.post(link_database+"list-transaksi_bbm-cud.php",{
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
  $http.post(link_database+"list-transaksi_bbm-cud.php",{
      'cud':'input',
      'tgl':$scope.txttgl,
      'shift':$scope.txtshift,
      'petugas1':$scope.txtpetugas1,
      'petugas2':$scope.txtpetugas2,
      'idnozzle':$scope.txtidnozzle,
      'meter_awal':$scope.txtmeter_awal,
      'nokwit':'',
      'usernama':'admin'
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
    $scope.txtpetugas1='';
    $scope.txtpetugas2='';
    $scope.txtmeter_awal='';
    $scope.txtmeter_akhir='';
    $scope.dskode=false;
  }

  $scope.detailData = function(kode){
    $scope.dskode=true;
    $scope.TmbSimpan=false;
    $scope.TmbUpdate=true;
    $http.post(link_database+"list-transaksi_bbm-cud.php",{
      'cud':'detail',
      'nokwit':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtnokwit=$scope.cud[0].nokwit;
      $('#myModal2').modal('show');
     },function(error){
      alert('Gagal Menyimpan!');
    });
  }

  $scope.updateData = function(){
    var r =confirm("yakin akan diupdate?");
    if (r==false){return;}
    $http.post(link_database+"list-transaksi_bbm-cud.php",{
      'cud':'edit',
      'nokwit':$scope.txtnokwit,
      'meter_akhir':$scope.txtmeter_akhir,
      'waktu_selesai':$scope.txttgl
    }).success(function(data, status, headers, config){
    $scope.tampilData();
    $scope.bersihData();
      $('#myModal2').modal('hide');
//      alert('Edit Data Sukses!');
    },function(error){
      $('#myModal2').modal('hide');
      alert('Gagal!');
    });
  }

  $scope.tampilCari = function(){
//    $scope.isi=[];
    item_num=0;
    $scope.tampilData();
  }

  $scope.tampilJumlah = function(){
    $scope.animation_image=true;
    $http.get(link_database+'list-transaksi_bbm.php?cari='+$scope.txtcari).success(function(data,status,header,config){
      $scope.jumx=data;
        if ($scope.jumx.length==0){
          $scope.total_pencarian='Tidak ada data ditemukan!';
        }else{
          $scope.total_pencarian=$scope.jumx.length+' transaksi ditemukan!';
        }
      });
  }

  $scope.tampilData = function(){
    $scope.tampilJumlah();
    $http.get(link_database+'list-transaksi_bbm.php?cari='+$scope.txtcari).success(function(data,status,header,config){
      $scope.animation_image=true;
        $scope.isi=data;
      $scope.animation_image=false;
      });
  }  


  $scope.tampilOptNozzle = function(){
    $http.get('api-server/list-nozzle.php').success(function(data,status,header,config){
        $scope.nozzle=data;   
        $scope.txtidnozzle=$scope.nozzle[0].idnozzle;
      });
  }

  $scope.tampilOptNozzle();

  $scope.tampilOptShift = function(){
        $scope.shift=[{"shift":"1"},{"shift":"2"},{"shift":"3"},{"shift":"4"},{"shift":"5"},{"shift":"6"}];
      $scope.txtshift="1";
  }

  $scope.tampilOptShift();

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
        angular.element(document.getElementById('transaksi_bbmCtrl')).scope().tampilProduk();
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