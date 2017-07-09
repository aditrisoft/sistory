<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->idtangki;
}

if($cud=='input'){
	$idtangki = $data->idtangki;
	$tangki = $data->tangki;
	$deskripsi = $data->deskripsi;
	$produk_id = $data->produk_id;		

	mysql_query("insert into tangki(idtangki, tangki, deskripsi, produk_id) values ('$idtangki', '$tangki', '$deskripsi', '$produk_id')");

}elseif($cud=='edit'){
	$idtangki = $data->idtangki;
	$tangki = $data->tangki;
	$deskripsi = $data->deskripsi;		
	$produk_id = $data->produk_id;		

	mysql_query("update tangki set idtangki='$idtangki', tangki='$tangki', deskripsi='$deskripsi', produk_id='$produk_id' where idtangki='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from tangki where idtangki='$kode'");

}else{

	$Adisql=mysql_query("select *, (select produk_nama from produk where produk_id=tangki.produk_id) as produk_nama from tangki where idtangki='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>