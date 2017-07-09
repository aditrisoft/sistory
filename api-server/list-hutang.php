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
$tglx=" where (date(hutang.tgl) BETWEEN '$tglawal' AND '$tglakhir')";

#jika hanya mencari jumlah
if (isset($_GET['jum'])){
	$AdiSql = mysql_query("select * from hutang order by tgl desc, waktu_real");
}else{
	$AdiSql = mysql_query("select date(tgl) as tgl, tgl as waktu, nokwit, idsuplier, (select nama from suplier where idsuplier=hutang.idsuplier) as suplier, date(tgljt) as tgljt, nominal, 
(select if(isnull(sum(cicilan)),0,sum(cicilan)) from hutangdetail where nokwit=hutang.nokwit) as terbayar,
nominal-(select if(isnull(sum(cicilan)),0,sum(cicilan)) from hutangdetail where nokwit=hutang.nokwit) as sisa 
from hutang ".$tglx." order by tgl, waktu_real desc");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>