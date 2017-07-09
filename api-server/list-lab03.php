<?php
include "db.php";

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, Content-Type'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

$tglawal=$_GET['tglawal'];
$tglakhir=$_GET['tglakhir'];

#isikan dengan string tglawal dan tglakhir
$tglx=" where ((select date(tgl) from do where nodo=do_detail.nodo) BETWEEN '$tglawal' AND '$tglakhir') and ( select statustr from do where nodo=do_detail.nodo)='0'";

if($_GET['cud']=='lap'){

	
	$AdiSql = mysql_query("select produk_id, (select produk_nama from produk where produk_id=do_detail.produk_id) as produk_nama, sum(	qty) as qty, avg(harga) as hpp_rata, sum(qty)*avg(harga) as nilaipersediaan from do_detail ".$tglx." group by produk_id");
}else{
	$AdiSql=mysql_query("select sum(qty) as totalqty, avg(harga) as avgharga, sum(qty*harga) as totalpersediaan from do_detail ".$tglx);
}



$rows = array();
while($r = mysql_fetch_array($AdiSql)) {
    $rows[] = $r;
}
print json_encode($rows);

?>