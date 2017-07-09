<?php
include "db.php";

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, Content-Type'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

$tglawal=$_GET['tglawal'];
$tglakhir=$_GET['tglakhir'];

#isikan dengan string tglawal dan tglakhir
$tglx=" where (date(pj.tgl) BETWEEN '$tglawal' AND '$tglakhir') and statustr=0";

if($_GET['cud']=='lap'){
	mysql_query("SET @no=0");
	$AdiSql = mysql_query("select @no:=@no+1 AS nomor, date(tgl) as tgl, nopj, idpelanggan, (select nama from pelanggan where idpelanggan=pj.idpelanggan) as pelanggan, (select sum(harga*qty) from pj_detail where nopj=pj.nopj) as total from pj ".$tglx." order by tgl,waktu_real");
}else{
	$AdiSql=mysql_query("select sum((select sum(harga*qty) from pj_detail where nopj=pj.nopj)) as total from pj ".$tglx);
}



$rows = array();
while($r = mysql_fetch_array($AdiSql)) {
    $rows[] = $r;
}
print json_encode($rows);

?>