<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: pjST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->nopj;
}

if($cud=='input'){
	$nopj = $data->nopj;
	$produk_id = $data->produk_id;
	$qty = $data->qty;
	$harga = $data->harga;
			

	mysql_query("insert into pj_detail(id, nopj, produk_id, qty, harga) values ('$id', '$nopj', '$produk_id', '$qty', '$harga')");

}elseif($cud=='edit'){
	$id = $data->id;
	$nopj = $data->nopj;
	$produk_id = $data->produk_id;
	$qty = $data->qty;
	$harga = $data->harga;	


	mysql_query("update pj_detail set id='$id', nopj='$nopj', produk_id='$produk_id', qty='$qty', harga='$harga' where id='$kode'");
	
}elseif($cud=='hapus'){
	$produk_id=$data->produk_id;
	mysql_query("delete from pj_detail where nopj='$kode' and produk_id='$produk_id'");

}else{

	$Adisql=mysql_query("select *,(select produk_nama from produk where produk_id=pj_detail.produk_id) as produk_nama from pj_detail where nopj='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>