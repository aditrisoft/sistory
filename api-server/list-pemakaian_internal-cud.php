<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->nokwit;
}

if($cud=='input'){
	$nokwit = nofaktur();
	$qty = $data->qty;
	$tgl = $data->tgl;
	$rincian = $data->rincian;		
	$produk_id = $data->produk_id;

	mysql_query("insert into pemakaian_internal(nokwit, qty, rincian, tgl, produk_id) values ('$nokwit', '$qty', '$rincian', '$tgl','$produk_id')");

}elseif($cud=='hapus'){

	mysql_query("update pemakaian_internal set statustr='1' where nokwit='$kode'");

}else{

	$Adisql=mysql_query("select * from pemakaian_internal where nokwit='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function nofaktur(){
	$AdiSql=mysql_query("select * from pemakaian_internal where left(nokwit,2)='PI' ORDER BY id desc");
	$hasil=mysql_fetch_assoc($AdiSql);
	if($hasil['nokwit']==null){
		$nofaktur="PI" . 1;
	}else{
		$nofaktur=$hasil['nokwit'];
		$xxx=strlen($hasil['nokwit'])-2;
		$nofaktur="PI" . (substr($nofaktur, $xxx*-1)+1);
	}
	return $nofaktur;
}


?>