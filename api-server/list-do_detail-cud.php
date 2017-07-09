<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->nodo;
}

if($cud=='input'){



}elseif($cud=='edit'){
	$nodo = $data->nodo;
	$produk_id = $data->produk_id;
	$qty = $data->qty;
	$harga = $data->harga;	


	mysql_query("update do_detail set qty='$qty', harga='$harga' where nodo='$kode' and produk_id='$produk_id'");
	
}elseif($cud=='hapus'){
	$produk_id=$data->produk_id;
	mysql_query("delete from do_detail where nodo='$kode' and produk_id='$produk_id'");

}elseif($cud=='detaildo'){
	$produk_id=$data->produk_id;
	$Adisql=mysql_query("select *,(select produk_nama from produk where produk_id=do_detail.produk_id) as produk_nama from do_detail where nodo='$kode' and produk_id='$produk_id'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);

}else{

	$Adisql=mysql_query("select *,(select produk_nama from produk where produk_id=do_detail.produk_id) as produk_nama from do_detail where nodo='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>