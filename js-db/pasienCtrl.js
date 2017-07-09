// Variabel untuk tampilkan page tampilProduk()
	var item_num;
	item_num=0;
	var limitx;
	limitx=10;
	var KodeFoto; //=> variabel global untuk KodeFoto
	KodeFoto="taek";

adiapp.controller('pasienCtrl', function($scope, $http) {

	//set default untuk ng-model
	$scope.txtcari="";
	$scope.animation_image=true;
	$scope.CmdSimpanProduk=true;
	$scope.CmdEditProduk=false;
	$scope.listx=[]; //-> deklarasi awal untuk memanciang agar data keluar utk tampilProduk()

	$scope.tampilRMJumlah = function(){
		$scope.animation_image=true;
		$http.get('api-server/list-pasien.php?paijo='+$scope.txtcari+'&cari=1&jum=1').success(function(data,status,header,config){
			$scope.jumx=data;
			if ($scope.jumx.length==0){
				$scope.total_pencarian='Tidak ada data ditemukan!';
			}else{
				$scope.total_pencarian=$scope.jumx.length+' Data pasien ditemukan!';
			}
	    });
	}

	$scope.tampilRM = function(){
		$scope.tampilRMJumlah();
		$http.get('api-server/list-pasien.php?paijo='+$scope.txtcari+'&cari=1&start='+item_num+'&limitx='+limitx).success(function(data,status,header,config){
			$scope.animation_image=true;
				$scope.listxx=data;
				for (i=0; i< $scope.listxx.length; i++){
					$scope.listx.push($scope.listxx[i]);
				}
				//ubah jumlah variabel utk menampilkan data berikutnya
					item_num=item_num+limitx;
					$scope.animation_image=false;
	    });
	}

	$scope.tampilRMCari = function(){
		$scope.listx=[];
		item_num=0;
		$scope.tampilRM();
	}

	//tampilkan opt jenis kelamin untuk option select
	$scope.tampilOptJK = function(){
				$scope.jk=[{"kode":"L","uraian":"Laki-laki"},{"kode":"P","uraian":"Perempuan"}];
	}

	//tampilkan opt jenis kelamin untuk option select
	$scope.tampilOptCara_Bayar = function(){
//				$scope.cara_bayar=[{"cara":"Non BPJS"},{"cara":"Mandiri"},{"cara":"Askes"}];
		$http.get('api-server/list-carabayar.php').success(function(data,status,header,config){
				$scope.cara_bayar=data;		
	    });
	}

	//tampilkan opt kelurahan untuk option select
	$scope.tampilOptKelurahan = function(){
		$http.get('api-server/list-kelurahan.php').success(function(data,status,header,config){
				$scope.kelurahanx=data;		
	    });
	}

	//tampilkan opt pekerjaan untuk option select
	$scope.tampilOptPekerjaan = function(){
		$http.get('api-server/list-pekerjaan.php').success(function(data,status,header,config){
				$scope.pekerjaanx=data;		
	    });
	}

	//tampilkan produk di modal untuk edit/ update
	$scope.tampilRMDetail = function(x){
		$http.get('api-server/list-pasien-cud.php?cud=0&kode='+x).success(function(data,status,header,config){				
			$scope.no_reg=false;
			$scope.CmdSimpanRM=false;
			$scope.CmdEditRM=true;
				$scope.rm_cud=data;
				$scope.txtno_reg=$scope.rm_cud[0].no_reg;
				$scope.txtno_reglama=$scope.rm_cud[0].no_reglama;
				$scope.txtpasien=$scope.rm_cud[0].pasien;
				$scope.txtalamat=$scope.rm_cud[0].alamat;
				$scope.txtrt=$scope.rm_cud[0].rt;
				$scope.txtrw=$scope.rm_cud[0].rw;
				$scope.txtkelurahan=$scope.rm_cud[0].kd_kelurahan;
				$scope.txttgllahir=new Date($scope.rm_cud[0].tgllahir);
				$scope.txtumur=calculateAge(new Date($scope.rm_cud[0].tgllahir));
				$scope.txtjk=$scope.rm_cud[0].jk;
				$scope.txtnobpjs=$scope.rm_cud[0].no_bpjs;
				$scope.txtktp=$scope.rm_cud[0].ktp;		
				$scope.txtcara_bayar=$scope.rm_cud[0].cara_bayar;	
				$scope.txtpekerjaan=$scope.rm_cud[0].kd_pekerjaan;	
				$scope.txtnokk=$scope.rm_cud[0].no_keluarga;
				$scope.txtnamakk=$scope.rm_cud[0].kk;
				$('#myModal').modal('show');
	    });
	}	

	//input produk ke database
	$scope.inputRM = function(){
		var r = confirm("Yakin tambah RM?");
		if (r == false) { return;} 		
        $http.post("api-server/list-pasien-cud.php", {
        	'cud':'input',
			'no_reg':$scope.txtno_reg,
			'no_reglama':$scope.txtno_reglama,
			'pasien':$scope.txtpasien,
			'alamat':$scope.txtalamat,
			'rt':$scope.txtrt,
			'rw':$scope.txtrw,
			'kd_kelurahan':$scope.txtkelurahan,
			'tgllahir':$scope.txttgllahir,
			'umur':$scope.txtumur,
			'jk':$scope.txtjk,
			'no_bpjs':$scope.txtnobpjs,
			'ktp':$scope.txtktp,
			'cara_bayar':$scope.txtcara_bayar,
			'kd_pekerjaan':$scope.txtpekerjaan,
			'no_keluarga':$scope.txtnokk,
			'kk':$scope.txtnamakk
        }).then(function(response){
//        	alert(response);
		    alert('Simpan Sukses!');
		    $scope.tampilRMCari();
		    $scope.bersihRM();
		    $scope.setFocus();
        },function(error){
            alert("Sorry! Error John!");
        });   
	}

	//update produk
	$scope.updateRM = function(x){
		var r = confirm("Yakin edit RM?");
		if (r == false) { return;} 	
        $http.post("api-server/list-pasien-cud.php", {
        	'cud':'edit',
        	'kode':x,
			'no_reg':$scope.txtno_reg,
			'no_reglama':$scope.txtno_reglama,
			'pasien':$scope.txtpasien,
			'alamat':$scope.txtalamat,
			'rt':$scope.txtrt,
			'rw':$scope.txtrw,
			'kd_kelurahan':$scope.txtkelurahan,
			'tgllahir':$scope.txttgllahir,
			'umur':$scope.txtumur,
			'jk':$scope.txtjk,
			'no_bpjs':$scope.txtnobpjs,
			'ktp':$scope.txtktp,
			'cara_bayar':$scope.txtcara_bayar,
			'kd_pekerjaan':$scope.txtpekerjaan,
			'no_keluarga':$scope.txtnokk,
			'kk':$scope.txtnamakk			
        }).then(function(response){
		    alert('Edit Sukses!');
		    $scope.tampilRMCari();
        },function(error){
            alert("Sorry! Error John!");
        });            				
	}	

	//tampilkan produk di modal
	$scope.deleteRM = function(x){
		var r = confirm("Hapus RM yang dipilih?");
		if (r == false) { return;} 
        $http.post("api-server/list-pasien-cud.php", {
        	'cud':'hapus',
        	'no_reg':x,
        }).then(function(response){
		    alert('Hapus Sukses!');
		    $scope.tampilRMCari();
        },function(error){
            alert("Sorry! Error John!");
        });		
	}			

	//bersihkan form
	$scope.bersihRM = function(){
		$scope.txtno_reg='';
		$scope.txtno_reglama='';
		$scope.txtpasien='';
		$scope.txtalamat='';
		$scope.txtrt='';
		$scope.txtrw='';
		$scope.txtkelurahan='';
		$scope.txttgllahir=new Date(2000, 0, 1);
		$scope.txtumur='';
		$scope.txtjk='';
		$scope.txtnobpjs='';
		$scope.txtktp='';
		$scope.no_reg=true;		
		$scope.CmdSimpanRM=true;
		$scope.CmdEditRM=false;	
		$scope.tampilNoAntri(); 		
	}

	$scope.fotoRM = function(x){

		$('.gambar1').html('<img width="150px" src="upload-images/kecil/'+x+'.jpg?dummy='+Math.random()+'" >');
		$('.gambar1').show();
//		$scope.img_foto1=true;
		$scope.KodeFoto=x;
		KodeFoto=x;
		$('#frmFoto').modal('show');
	}

	$scope.refreshFoto1 = function(){
		$scope.img_foto1=false;
		alert('cdi');
	}

	$scope.setFocus = function() {
		$( "#txtno_reg" ).focus();
	}


	$scope.tampilNoAntri = function(){
		$http.get('api-server/noantri.php').success(function(data,status,header,config){
				$scope.noantri=data;
				$scope.txtno_reg=$scope.noantri[0];
	    });
	}	
	

	$scope.tampilRM();
	$scope.tampilOptKelurahan();
	$scope.tampilOptJK();
	$scope.tampilOptCara_Bayar();
	$scope.tampilOptPekerjaan();

	$scope.tampilNoAntri(); 	

	$scope.tglUmur = function(){
		var d = new Date(Date.now());
		$scope.txttgllahir=new Date(d.getFullYear()-$scope.txtumur,d.getMonth(),d.getDate());
	}

	$scope.thnUmur = function(){
		var tl= $scope.txttgllahir;
		var d = new Date(Date.now());
		//	$scope.txtumur=new Date(d.getFullYear()-$scope.txtumur,d.getMonth(),d.getDate());
		var timeDiff = Math.abs(d.getTime() - tl.getTime());
		var diffDays = Math.ceil(timeDiff / (1000*60*60*24*365.242199)); 
		$scope.txtumur=diffDays;
	}

});


	//Fungsi untuk enter ganti fokus
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

	//Fungsi Global untuk cek image exist
	adiapp.directive('onErrorSrc', function() {
	  return {
	    link: function(scope, element, attrs) {
	      element.bind('error', function() {
	        if (attrs.src != attrs.onErrorSrc) {
	          attrs.$set('src', attrs.onErrorSrc);
	        }
	      });
	    }
	  }
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
				alert('dsfu');
				angular.element(document.getElementById('pasienCtrl')).scope().tampilRM();
			}
	}

	function bantuanFoto(x){
		$('.gambar1').hide();
		alert(x);
//		$('.gambar1').html('<img width="150px" src="upload-images/kecil/'+x+'.jpg" ></span>');
	}
	function refreshFoto(x){
//		$('.gambar1').show();
//		$('.gambar1').html('<img width="150px" src="upload-images/kecil/'+x+'.jpg" >');
		alert('finish');
	}

	//*** FUNGSI UNTUK UPLOAD IMAGE DROPZONE ***
    // "myAwesomeDropzone" is the camelized version of the HTML element's ID
    Dropzone.options.myAwesomeDropzone1 = {
		acceptedFiles: "image/jpeg,image/png",  
		paramName: "file", // The name that will be used to transfer the file
		//    maxFiles: 1, // Number of files at a time
		maxFilesize: 15, //in MB
		accept: function(file, done) {
		if (file.name == "sex.jpg") {
		  done("Dilarang Foto berbau pornografi!");
		}
		else { done(); }
		},
		init: function() {
		this.on("drop", function(file) {
		      bantuanFoto(KodeFoto);
		});
		this.on("addedfile", function(file) {
		  this.options.url = "upload-crop.php?foto1="+KodeFoto;
	      if (this.files[1]!=null){
	        this.removeFile(this.files[0]);
	      }
		});
		this.on("complete", function(file) {
	        alert('cok');
	        this.removeAllFiles(true);
	        $('.gambar1').show();
			$('.gambar1').html('asdsada');
			$('.gambar1').html('<img width="150px" src="upload-images/kecil/'+KodeFoto+'.jpg?dummy='+Math.random()+'" >');

		});		
		},	
		maxFiles:1,
    };
    Dropzone.options.myAwesomeDropzone2 = {
      acceptedFiles: "image/jpeg,image/png",  
      paramName: "file", // The name that will be used to transfer the file
    //    maxFiles: 1, // Number of files at a time
      maxFilesize: 15, //in MB
      accept: function(file, done) {
        if (file.name == "sex.jpg") {
          done("Dilarang Foto berbau pornografi!");
        }
        else { done(); }
      },
      init: function() {
        this.on("addedfile", function(file) {
          this.options.url = "upload-crop.php?foto1="+KodeFoto+"a";
           alert(KodeFoto);
        });
      }      
    };
    Dropzone.options.myAwesomeDropzone3 = {
      acceptedFiles: "image/jpeg,image/png",  
      paramName: "file", // The name that will be used to transfer the file
    //    maxFiles: 1, // Number of files at a time
      maxFilesize: 15, //in MB
      accept: function(file, done) {
        if (file.name == "sex.jpg") {
          done("Dilarang Foto berbau pornografi!");
        }
        else { done(); }
      },
      init: function() {
        this.on("addedfile", function(file) {
          this.options.url = "upload-crop.php?foto1="+KodeFoto+"b";
           alert(KodeFoto);
        });
      }      
    };
    Dropzone.options.myAwesomeDropzone4 = {
      acceptedFiles: "image/jpeg,image/png",  
      paramName: "file", // The name that will be used to transfer the file
    //    maxFiles: 1, // Number of files at a time
      maxFilesize: 15, //in MB
      accept: function(file, done) {
        if (file.name == "sex.jpg") {
          done("Dilarang Foto berbau pornografi!");
        }
        else { done(); }
      },
      init: function() {
        this.on("addedfile", function(file) {
          this.options.url = "upload-crop.php?foto1="+KodeFoto+"c";
           alert(KodeFoto);
        });
      }      
    };            


	//fungsi untuk random cache
	function randomDate(start, end, startHour, endHour) {
	  var date = new Date(+start + Math.random() * (end - start));
	  var hour = startHour + Math.random() * (endHour - startHour) | 0;
	  date.setHours(hour);
	  return date;
	}


	function calculateAge(birthday) { // birthday is a date
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970);
	}


	function iTgl(date) {
	    var d = new Date(date),
	        month = '' + (d.getMonth() + 1),
	        day = '' + d.getDate(),
	        year = d.getFullYear();

	    if (month.length < 2) month = '0' + month;
	    if (day.length < 2) day = '0' + day;

	    return [year, month, day].join('-');
	}