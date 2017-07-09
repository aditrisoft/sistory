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
	$AdiSql = mysql_query("select * from suplier where idsuplier like '%". $filterx ."%' or nama like '%". $filterx ."%' or alamat like '%". $filterx ."%' order by nama");
}else{
	$AdiSql = mysql_query("select * from suplier where idsuplier like '%". $filterx ."%' or nama like '%". $filterx ."%' or alamat like '%". $filterx ."%' order by nama");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>