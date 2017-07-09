adiapp.controller("lap01Ctrl", function($scope, $http) {

	$scope.judullap="Daftar Jurnal";
	
	//set default untuk ng-model
	$scope.animation_image=true;
	$scope.listx=[]; //-> deklarasi awal untuk memanciang agar data keluar utk tampilProduk()
	var d = new Date(Date.now());
	$scope.txttglawal=d;
	$scope.txttglakhir=d;

	$scope.tampilLap = function(){
		$scope.animation_image=true;
		$http.get('api-server/list-lap01.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)+'&cud=lap').success(function(data,status,header,config){
			$scope.listx=data;
			if ($scope.listx.length==0){
				$scope.total_pencarian='Tidak ada data ditemukan!';
			}else{
				$scope.total_pencarian=$scope.listx.length+' Data ditemukan!';
			}
			$scope.tampilTotalLap();
			$scope.animation_image=false;	
	    });
	}

	$scope.tampilTotalLap = function(){
		$scope.animation_image=true;
		$http.get('api-server/list-lap01.php?tglawal='+iTgl($scope.txttglawal)+'&tglakhir='+iTgl($scope.txttglakhir)+'&cud=tot').success(function(data,status,header,config){
			$scope.totx=data;
			$scope.totalL=$scope.totx[0].totalL;
			$scope.totalP=$scope.totx[0].totalP;
			$scope.totalDW=$scope.totx[0].totalDW;
			$scope.totalLW=$scope.totx[0].totalLW;
			$scope.totalBaru=$scope.totx[0].totalBaru;
			$scope.totalLama=$scope.totx[0].totalLama;
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