<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->nopo;
}

if($cud=='input'){
	$nopo = $data->nopo;
	$produk_id = $data->produk_id;
	$qty = $data->qty;
	$harga = $data->harga;
			

	mysql_query("insert into po_detail(id, nopo, produk_id, qty, harga) values ('$id', '$nopo', '$produk_id', '$qty', '$harga')");

}elseif($cud=='edit'){
	$id = $data->id;
	$nopo = $data->nopo;
	$produk_id = $data->produk_id;
	$qty = $data->qty;
	$harga = $data->harga;	


	mysql_query("update po_detail set id='$id', nopo='$nopo', produk_id='$produk_id', qty='$qty', harga='$harga' where id='$kode'");
	
}elseif($cud=='hapus'){
	$produk_id=$data->produk_id;
	mysql_query("delete from po_detail where nopo='$kode' and produk_id='$produk_id'");

}else{

	$Adisql=mysql_query("select *,(select produk_nama from produk where produk_id=po_detail.produk_id) as produk_nama from po_detail where nopo='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>