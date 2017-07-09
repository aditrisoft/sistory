<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->idsuplier;
}

if($cud=='input'){
	$idsuplier = $data->idsuplier;
	$nama = $data->nama;		
	$alamat = $data->alamat;		

	mysql_query("insert into suplier(idsuplier, nama, alamat, tgldaftar) values ('$idsuplier', '$nama', '$alamat', now() )");

}elseif($cud=='edit'){
	$idsuplier = $data->idsuplier;
	$nama = $data->nama;		
	$alamat = $data->alamat;		

	mysql_query("update suplier set idsuplier='$idsuplier', nama='$nama', alamat='$alamat' where idsuplier='$idsuplier'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from suplier where idsuplier='$kode'");

}else{

	$Adisql=mysql_query("select * from suplier where idsuplier='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>