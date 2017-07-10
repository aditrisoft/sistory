<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: pjST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->nopb;
}

if($cud=='input'){
	$nopb = $data->nopb;
	$produk_id = $data->produk_id;
	$qty = $data->qty;
	$harga = $data->harga;
			

	mysql_query("insert into pb_detail(id, nopb, produk_id, qty, harga) values ('$id', '$nopb', '$produk_id', '$qty', '$harga')");

}elseif($cud=='edit'){
	$id = $data->id;
	$nopb = $data->nopb;
	$produk_id = $data->produk_id;
	$qty = $data->qty;
	$harga = $data->harga;	


	mysql_query("update pb_detail set id='$id', nopb='$nopb', produk_id='$produk_id', qty='$qty', harga='$harga' where id='$kode'");
	
}elseif($cud=='hapus'){
	$produk_id=$data->produk_id;
	mysql_query("delete from pb_detail where nopb='$kode' and produk_id='$produk_id'");

}else{

	$Adisql=mysql_query("select *,(select produk_nama from produk where produk_id=pb_detail.produk_id) as produk_nama from pb_detail where nopb='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>