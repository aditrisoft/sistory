<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->id;
}

if($cud=='input'){
	$nopo = $data->nopo;
	$idtangki = $data->idtangki;
	$qty = $data->qty;


	mysql_query("insert into stok_masuk(id, nopo, idtangki, qty) values ('$id', '$nopo', '$idtangki', '$qty')");

}elseif($cud=='edit'){
	$id = $data->id;
	$nopo = $data->nopo;
	$idtangki = $data->idtangki;
	$qty = $data->qty;		

	mysql_query("update stok_masuk set id='$id', nopo='$nopo', idtangki='$idtangki', qty='$qty' where id='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from stok_masuk where id='$kode'");

}else{

	$Adisql=mysql_query("select * from stok_masuk where id='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>