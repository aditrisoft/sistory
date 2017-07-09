<?php

include "db.php";

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, Content-Type'); 
header('Access-Control-Allow-Methods: pjST, GET, OPTIONS, PUT, DELETE');

if (isset($_GET['cari'])){
	$filterx=$_GET['cari'];
}else{
	$filterx="";
}


$tglawal=$_GET['tglawal'];
$tglakhir=$_GET['tglakhir'];

#isikan dengan string tglawal dan tglakhir
$tglx=" where (date(pj.tgl) BETWEEN '$tglawal' AND '$tglakhir')";

#jika hanya mencari jumlah
if (isset($_GET['jum'])){
	$AdiSql = mysql_query("select * from pj ".$tglx."");
}else{
	$AdiSql = mysql_query("select date(tgl) as tgl, tgl as waktu, nopj, idpelanggan, (select nama from pelanggan where idpelanggan=pj.idpelanggan) as pelanggan, noref, (select sum(harga*qty) from pj_detail where nopj=pj.nopj) as total, statustr from pj ".$tglx." order by tgl,waktu_real desc");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>