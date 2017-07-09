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

#jika hanya mencari jumlah
if (isset($_GET['jum'])){
	$AdiSql = mysql_query("select * from pemakaian_internal where (nokwit like '%". $filterx ."%' or rincian like '%". $filterx ."%') and statustr='0' order by tgl desc,id");
}else{
	$AdiSql = mysql_query("select *, (select produk_nama from produk where produk_id=pemakaian_internal.produk_id) as produk_nama from pemakaian_internal where (nokwit like '%". $filterx ."%' or rincian like '%". $filterx ."%') and statustr='0' order by tgl desc,id");
}
	$rows = array();
	while($r = mysql_fetch_array($AdiSql)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
?>