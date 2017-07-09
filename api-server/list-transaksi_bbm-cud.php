<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->nokwit;
}

if($cud=='input'){
	$shift = $data->shift;
	$idnozzle = $data->idnozzle;
	$petugas1 = $data->petugas1;
	if(isset($data->petugas2)){
		$petugas2 = $data->petugas2;
	}else{
		$petugas2 ='';
	}
	$meter_awal = $data->meter_awal;
	$usernama = $data->usernama;	
	$nokwit=call_nokwit();	

	mysql_query("insert into transaksi_bbm(tgl, shift, idnozzle, petugas1, petugas2, meter_awal, usernama, nokwit) values (now(), '$shift', '$idnozzle', '$petugas1', '$petugas2', '$meter_awal', '$usernama', '$nokwit' )");

}elseif($cud=='edit'){

	$waktu_selesai = $data->waktu_selesai;
	$meter_akhir = $data->meter_akhir;

	mysql_query("update transaksi_bbm set waktu_selesai='$waktu_selesai', meter_akhir='$meter_akhir' where nokwit='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from transaksi_bbm where nokwit='$kode'");

}else{

	$Adisql=mysql_query("select * from transaksi_bbm where nokwit='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function call_nokwit(){
	$AdiSql=mysql_query("select * from transaksi_bbm where left(nokwit,2)='PJ' ORDER BY id desc");
	$hasil=mysql_fetch_assoc($AdiSql);
	if($hasil['nokwit']==null){
		$nofaktur="PJ" . 1;
	}else{
		$nofaktur=$hasil['nokwit'];
		$xxx=strlen($hasil['nokwit'])-2;
		$nofaktur="pj" . (substr($nofaktur, $xxx*-1)+1);
	}
	return $nofaktur;
}

?>