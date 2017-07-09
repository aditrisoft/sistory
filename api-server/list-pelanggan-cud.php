<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->idpelanggan;
}

if($cud=='input'){
	$idpelanggan = $data->idpelanggan;
	$nama = $data->nama;
	$alamat = $data->alamat;		

	mysql_query("insert into pelanggan(idpelanggan, nama, alamat, tgldaftar) values ('$idpelanggan', '$nama', '$alamat', now() )");

}elseif($cud=='edit'){
	$idpelanggan = $data->idpelanggan;
	$nama = $data->nama;
	$alamat = $data->alamat;		

	mysql_query("update pelanggan set idpelanggan='$idpelanggan', nama='$nama', alamat='$alamat' where idpelanggan='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from pelanggan where idpelanggan='$kode'");

}else{

	$Adisql=mysql_query("select * from pelanggan where idpelanggan='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>