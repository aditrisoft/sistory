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
	$AdiSql = mysql_query("select * from tbnoperk where noperk like '%". $filterx ."%' or namaperk like '%". $filterx ."%' order by noperk");
}else{
	$AdiSql = mysql_query("select * from tbnoperk  where noperk like '%". $filterx ."%' or namaperk like '%". $filterx ."%' order by noperk");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>