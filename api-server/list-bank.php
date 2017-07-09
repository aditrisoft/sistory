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
	$AdiSql = mysql_query("select * from bank where bank like '%". $filterx ."%' or norek like '%". $filterx ."%' or an like '%". $filterx ."%' order by bank,an");
}else{
	$AdiSql = mysql_query("select * from bank where bank like '%". $filterx ."%' or norek like '%". $filterx ."%' or an like '%". $filterx ."%' order by bank,an");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>