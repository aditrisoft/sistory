<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->idsatuan;
}

if($cud=='input'){
	$satuan = $data->satuan;		

	mysql_query("insert into satuan(idsatuan, satuan) values ('$idsatuan', '$satuan')");

}elseif($cud=='edit'){
	$satuan = $data->satuan;
			

	mysql_query("update satuan set idsatuan='$idsatuan', satuan='$satuan' where satuan='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from satuan where idsatuan='$kode'");

}else{

	$Adisql=mysql_query("select * from satuan where idsatuan='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>