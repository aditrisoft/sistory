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
	$AdiSql = mysql_query("select nodo, (select date(tgl) from do where nodo=do_detail.nodo) as tgl, produk_id, (select suplier.nama from do join suplier on do.idsuplier=suplier.idsuplier where do.nodo=do_detail.nodo) as suplier, (select produk_nama from produk where produk_id=do_detail.produk_id) as produk_nama,qty, harga from do_detail ".$tglx." order by nodo");
	$i=0;
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
		$nodo=$r{'nodo'};
		$rows[$nodo]['tgl']=$r{'tgl'};
		$rows[$nodo]['nodo']=$r{'nodo'};	
	 	$rows[$nodo]['produk'][$i]['produk_id'] = $r{'produk_id'};
	 	$rows[$nodo]['produk'][$i]['produk_nama'] = $r{'produk_nama'};
	 	$rows[$nodo]['produk'][$i]['qty'] = $r{'qty'};
	 	$rows[$nodo]['produk'][$i]['harga'] = $r{'harga'};
		$rows[$nodo]['suplier']=$r{'suplier'};	
	 	$i++;
	}

}else{
	$AdiSql=mysql_query("select sum(qty) as totalqty, sum(qty*harga) as totalpembelian from do_detail ".$tglx);
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}

}


print json_encode($rows);

?>