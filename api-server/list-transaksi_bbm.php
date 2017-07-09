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
	$AdiSql = mysql_query("select * from transaksi_bbm where shift like '%". $filterx ."%' or (select nozzle from nozzle where idnozzle=transaksi_bbm.idnozzle) like '%". $filterx ."%' or petugas1 like '%". $filterx ."%' or petugas2 like '%". $filterx ."%' order by tgl desc");
}else{
	$AdiSql = mysql_query("select  *, (select nozzle from nozzle where idnozzle=transaksi_bbm.idnozzle) as nozzle from transaksi_bbm where shift like '%". $filterx ."%' or (select nozzle from nozzle where idnozzle=transaksi_bbm.idnozzle) like '%". $filterx ."%' or petugas1 like '%". $filterx ."%' or petugas2 like '%". $filterx ."%' order by tgl desc");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>