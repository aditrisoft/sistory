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
$tglx=" where (date(po.tgl) BETWEEN '$tglawal' AND '$tglakhir')";

#jika hanya mencari jumlah
if (isset($_GET['jum'])){
	$AdiSql = mysql_query("select * from po ".$tglx."");
}else{
	$AdiSql = mysql_query("select date(tgl) as tgl, tgl as waktu, nopo, idsuplier, (select nama from suplier where idsuplier=po.idsuplier) as suplier, noref, usernama_accounting, (select sum(harga*qty) from po_detail where nopo=po.nopo) as total from po ".$tglx." order by tgl,waktu_real desc");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>