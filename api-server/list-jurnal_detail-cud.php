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

if($cud=='hapus'){
	$noperk=$data->noperk;
	mysql_query("delete from tbjurnal where nokwit='$kode' and noperk='$noperk'");

}else{

	$Adisql=mysql_query("select *,(select namaperk from tbnoperk where noperk=tbjurnal.noperk) as namaperk from tbjurnal where nokwit='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>