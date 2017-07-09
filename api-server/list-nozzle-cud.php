<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->idnozzle;
}

if($cud=='input'){
	$idtangki = $data->idtangki;
	$nozzle = $data->nozzle;		

	mysql_query("insert into nozzle(idtangki, nozzle) values ('$idtangki', '$nozzle')");

}elseif($cud=='edit'){
	$idtangki = $data->idtangki;
	$nozzle = $data->nozzle;		

	mysql_query("update nozzle set idtangki='$idtangki', nozzle='$nozzle' where nozzle='$kode'");
	
}elseif($cud=='hapus'){

	mysql_query("delete from nozzle where idnozzle='$kode'");

}else{

	$Adisql=mysql_query("select *,(select tangki from tangki where idtangki=nozzle.idtangki) as tangki from nozzle where idnozzle='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}
?>