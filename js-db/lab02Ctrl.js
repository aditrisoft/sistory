adiapp.controller("lab02Ctrl", function($scope, $http) {

	$scope.judullap="Detail Pembelian";
	
	//set default untuk ng-model
	$scope.animation_image=true;
//	$scope.listx=[]; //-> deklarasi awal untuk memanciang agar data keluar utk tampilProduk()
	var d = new Date(Date.now());
	$scope.txttglawal=d;
	$scope.txttglakhir=d;

	$scope.tampilLap = function(){
		$scope.animation_image=true;
		$http.get('api-server/list-lab02.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)+'&cud=lap').success(function(data,status,header,config){
			$scope.listx=data;
	///		alert($scope.listx.length);
	//		$scope.nomor=0;
			if ($scope.listx.length==0){
//				$scope.total_pencarian='Tidak ada data ditemukan!';
			}else{
//				$scope.total_pencarian=$scope.listx.length+' Data ditemukan!';
			}
			$scope.tampilTotalLap();
			$scope.animation_image=false;	
	    });
	}

	$scope.tampilTotalLap = function(){
		$scope.animation_image=true;
		$http.get('api-server/list-lab02.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)+'&cud=tot').success(function(data,status,header,config){
			$scope.totx=data;
			$scope.totalqty=$scope.totx[0].totalqty;
			$scope.totalpembelian=$scope.totx[0].totalpembelian;
			$scope.animation_image=false;	
	    });
	}	

	$scope.tampilLap();

});





function iTgl(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}