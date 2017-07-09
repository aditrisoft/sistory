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


$tglawal=$_GET['tglawal'];
$tglakhir=$_GET['tglakhir'];

#isikan dengan string tglawal dan tglakhir
$tglx=" where (date(do.tgl) BETWEEN '$tglawal' AND '$tglakhir')";

#jika hanya mencari jumlah
if (isset($_GET['jum'])){
	$AdiSql = mysql_query("select * from do  order by tgl desc, waktu_real");
}else{
	$AdiSql = mysql_query("select date(tgl) as tgl, tgl as waktu, nodo, idsuplier, (select nama from suplier where idsuplier=do.idsuplier) as suplier, noref, nopo, (select sum(harga*qty) from do_detail where nodo=do.nodo) as total, statustr from do ".$tglx." order by tgl, waktu_real desc");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>