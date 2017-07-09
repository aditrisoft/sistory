adiapp.controller('jurnalCtrl', function($scope,$http) {

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
    $http.post(link_database+"list-jurnal-cud.php",{
      'cud':'hapus',
      'nobukti':kode
    }).then(function(response){
    $scope.tampilData();
    $scope.bersihData();
//      alert('Hapus Sukses!');
    },function(error){
      alert('Hapus Gagal');
    });
  }

  $scope.SimpanData = function(x){
    if(x=='debit'){
      $scope.txtdebit=parseFloat($scope.txtnominal);
      $scope.txtkredit=0;
    }else{
      $scope.txtdebit=0;
      $scope.txtkredit=parseFloat($scope.txtnominal);    
    }
    var r =confirm("yakin data yang anda masukkan sudah benar?");
    if (r==false){return;}
    $http.post(link_database+"list-jurnal-cud.php",{
        'cud':'input',
        'tgl':$scope.txttgl,
        'keterangan':$scope.txtketerangan,
        'noperk':$scope.txtnoperk,
        'debit':$scope.txtdebit,
        'kredit':$scope.txtkredit,
        'usernama':'admin',
        'nobukti':$scope.txtnobukti //=> kalo ini ada isinya tidak perlu buat transaksi nobukti baru
      }).success(function(data, status, headers, config){
        $scope.txtnobukti=data;
        $scope.tampilIsiJurnal($scope.txtnobukti); 

        $scope.bersihProduk();
        $scope.tampilData();
        $('#myModal').modal('hide');      
      },function(error){
        alert('Gagal Menyimpan!');
    });
  }


  //simpan data transaksi memorial
  $scope.EditData = function(){
    var r =confirm("yakin data yang anda masukkan sudah benar?");
    if (r==false){return;}
    $http.post(link_database+"list-jurnal-cud.php",{
        'cud':'edit',
        'tgl':$scope.txttgl,
        'keterangan':$scope.keterangan,
        'usernama':'admin',
        'nobukti':$scope.txtnobukti //=> kalo ini ada isinya tidak perlu buat transaksi nobukti baru
      }).success(function(data, status, headers, config){
        $scope.tampilData();
      },function(error){
        alert('Gagal Menyimpan!');
    });
  }


  $scope.bersihData = function(){
    $scope.TmbSimpan=true;
    $scope.TmbUpdate=false;
    $scope.txtnobukti='';
    $scope.txtketerangan='';
    $scope.txtnoperk='';
    $scope.txtnamaperk='';
    $scope.txtnominal='';
    $scope.dskode=false;
    $scope.listisijurnal=[];
  }

  $scope.bersihProduk = function(){
    $scope.txtnoperk='';
    $scope.txtnamaperk='';    
    $scope.txtnominal='';
    $scope.dskode=false;
  }

  $scope.tampilDetail = function(kode){
    $scope.dskode=true;
    $scope.TmbSimpan=true;
//    $scope.TmbUpdate=true;
    $http.post(link_database+"list-jurnal-cud.php",{
      'cud':'detail',
      'nobukti':kode
    }).success(function(data, status, headers, config){
      $scope.cud=data;
      $scope.txtnobukti=$scope.cud[0].nobukti;
      $scope.txttgl=$scope.cud[0].tgl;
      $scope.txtketerangan=$scope.cud[0].keterangan;
      $scope.tampilIsiJurnal($scope.txtketerangan);
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
    $http.get(link_database+'list-jurnal.php?cari=').success(function(data,status,header,config){
      $scope.jumx=data;
        if ($scope.jumx.length==0){
          $scope.total_pencarian='Tidak ada data ditemukan!';
        }else{
          $scope.total_pencarian=$scope.jumx.length+' data ditemukan!';
        }
      });
  }

  $scope.tampilData = function(){
    $scope.tampilJumlah();
    $http.get(link_database+'list-jurnal.php?cari=').success(function(data,status,header,config){
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


  //tampil diagnosa per pasien
  $scope.tampilIsiJurnal = function(kode){
        $http.post(link_database+"list-jurnal_detail-cud.php",{
          'cud':'lain',
          'nokwit':kode
        }).success(function(data, status, headers, config){
        $scope.listisijurnal=data; 
        },function(error){
            alert("Sorry! gag ada data!<br>Kode Error: "+error);
        });   
  }

  $scope.hapusIsiPO = function(kode){
    var r = confirm ("Yakin akan dihapus");
    if (r==false){return;}
    $http.post(link_database+"list-jurnal_detail-cud.php",{
      'cud':'hapus',
      'nokwit':$scope.txtnobukti,
      'noperk':kode
    }).then(function(response){
      $scope.tampilIsiPO($scope.txtnopo);
      $scope.tampilData();
    },function(error){
      alert('Hapus Gagal');
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
        angular.element(document.getElementById('jurnalCtrl')).scope().tampilProduk();
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