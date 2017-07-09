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
	$AdiSql = mysql_query("select * from tbbank where (nokwitbank like '%". $filterx ."%' or keterangan like '%". $filterx ."%') and statustr<>1 and date(tgl)=date(now()) order by tgl desc,id");
}else{
	$AdiSql = mysql_query("select date(tgl) as tgl, keterangan, masuk, keluar, nokwitbank, usernama from tbbank where (nokwitbank like '%". $filterx ."%' or keterangan like '%". $filterx ."%') and statustr<>1 and date(tgl)=date(now()) order by tgl desc");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>