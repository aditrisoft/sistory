<?php
include "db.php";

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, Content-Type'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

$tglawal=$_GET['tglawal'];
$tglakhir=$_GET['tglakhir'];

#isikan dengan string tglawal dan tglakhir
$tglx=" where (date(do.tgl) BETWEEN '$tglawal' AND '$tglakhir') and statustr=0";

if($_GET['cud']=='lap'){
	mysql_query("SET @no=0");
	$AdiSql = mysql_query("select @no:=@no+1 AS nomor, date(tgl) as tgl, nodo, idsuplier, (select nama from suplier where idsuplier=do.idsuplier) as suplier, (select sum(harga*qty) from do_detail where nodo=do.nodo) as total from do ".$tglx." order by tgl,waktu_real");
}else{
	$AdiSql=mysql_query("select sum((select sum(harga*qty) from do_detail where nodo=do.nodo)) as total from do ".$tglx);
}



$rows = array();
while($r = mysql_fetch_array($AdiSql)) {
    $rows[] = $r;
}
print json_encode($rows);

?>