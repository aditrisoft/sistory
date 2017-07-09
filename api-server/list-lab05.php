<?php
include "db.php";

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, Content-Type'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

$tglawal=$_GET['tglawal'];
$tglakhir=$_GET['tglakhir'];

#isikan dengan string tglawal dan tglakhir
$tglx=" where ((select date(tgl) from pj where nopj=pj_detail.nopj) BETWEEN '$tglawal' AND '$tglakhir') and ( select statustr from pj where nopj=pj_detail.nopj)='0'";

if($_GET['cud']=='lap'){
	$AdiSql = mysql_query("select nopj, (select date(tgl) from pj where nopj=pj_detail.nopj) as tgl, produk_id, (select pelanggan.nama from pj join pelanggan on pj.idpelanggan=pelanggan.idpelanggan where pj.nopj=pj_detail.nopj) as pelanggan, (select produk_nama from produk where produk_id=pj_detail.produk_id) as produk_nama,qty, harga from pj_detail ".$tglx." order by nopj");
	$i=0;
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
		$nopj=$r{'nopj'};
		$rows[$nopj]['tgl']=$r{'tgl'};
		$rows[$nopj]['nopj']=$r{'nopj'};	
	 	$rows[$nopj]['produk'][$i]['produk_id'] = $r{'produk_id'};
	 	$rows[$nopj]['produk'][$i]['produk_nama'] = $r{'produk_nama'};
	 	$rows[$nopj]['produk'][$i]['qty'] = $r{'qty'};
	 	$rows[$nopj]['produk'][$i]['harga'] = $r{'harga'};
		$rows[$nopj]['pelanggan']=$r{'pelanggan'};	
	 	$i++;
	}

}else{
	$AdiSql=mysql_query("select sum(qty) as totalqty, sum(qty*harga) as totalpenjualan from pj_detail ".$tglx);
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}

}


print json_encode($rows);

?>