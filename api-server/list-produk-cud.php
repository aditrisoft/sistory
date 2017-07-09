<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->produk_id;
}

if($cud=='input'){
	$produk_id = $data->produk_id;
	$produk_nama = $data->produk_nama;
	$harga_jual = $data->harga_jual;

	mysql_query("insert into produk(produk_id, produk_nama, harga_jual) values ('$produk_id', '$produk_nama', '$harga_jual')");

}elseif($cud=='edit'){
	$produk_id = $data->produk_id;
	$produk_nama = $data->produk_nama;
	$harga_jual = $data->harga_jual;

	mysql_query("update produk set produk_id='$produk_id', produk_nama='$produk_nama', harga_jual='$harga_jual' where produk_id='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from produk where produk_id='$kode'");

}else{

	$Adisql=mysql_query("select * from produk where produk_id='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>