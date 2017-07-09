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
	$AdiSql = mysql_query("select * from stok_masuk where id like '%". $filterx ."%' or nopo like '%". $filterx ."%' or idtangki like '%". $filterx ."%' or qty like '%". $filterx ."%' order by id");
}else{
	$AdiSql = mysql_query("select * from stok_masuk where id like '%". $filterx ."%' or nopo like '%". $filterx ."%' or idtangki like '%". $filterx ."%' or qty like '%". $filterx ."%' order by id");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>