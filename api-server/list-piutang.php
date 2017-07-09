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
$tglx=" where (date(piutang.tgl) BETWEEN '$tglawal' AND '$tglakhir')";

#jika hanya mencari jumlah
if (isset($_GET['jum'])){
	$AdiSql = mysql_query("select * from piutang order by tgl desc, waktu_real");
}else{
	$AdiSql = mysql_query("select date(tgl) as tgl, tgl as waktu, nokwit, idpelanggan, (select nama from pelanggan where idpelanggan=piutang.idpelanggan) as pelanggan, date(tgljt) as tgljt, nominal, 
(select if(isnull(sum(cicilan)),0,sum(cicilan)) from piutangdetail where nokwit=piutang.nokwit) as terbayar,
nominal-(select if(isnull(sum(cicilan)),0,sum(cicilan)) from piutangdetail where nokwit=piutang.nokwit) as sisa 
from piutang ".$tglx." order by tgl, waktu_real desc");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>