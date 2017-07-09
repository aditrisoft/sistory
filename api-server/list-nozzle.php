<?php

include "db.php";

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, Content-Type'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

if (isset($_GET['cari'])){
	$filterx=$_GET['cari'];
}else{
	$filterx="";
}

#jika hanya mencari jumlah
if (isset($_GET['jum'])){
	$AdiSql = mysql_query("select idnozzle, nozzle, (select tangki from tangki where idtangki=nozzle.idtangki) as tangki from nozzle where nozzle like '%". $filterx ."%'  order by nozzle");
}else{
	$AdiSql = mysql_query("select idnozzle, nozzle, (select tangki from tangki where idtangki=nozzle.idtangki) as tangki from nozzle where nozzle like '%". $filterx ."%'  order by nozzle");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>