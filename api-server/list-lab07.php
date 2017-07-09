<?php
include "db.php";

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Origin, Content-Type'); 
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');

//$tglawal=$_GET['tglawal'];
//$tglakhir=$_GET['tglakhir'];

#isikan dengan string tglawal dan tglakhir
//$tglx=" where ((select date(tgl) from pj where nopj=pj_detail.nopj) BETWEEN '$tglawal' AND '$tglakhir') and ( select statustr from pj where nopj=pj_detail.nopj)='0'";

if($_GET['cud']=='lap'){

	
	$AdiSql = mysql_query("select produk_id, (select produk_nama from produk where produk_id=stokmasuk.produk_id) as produk_nama, 
sum(qty_masuk)-sum(qty_keluar)  as stok, avg(hpp) as ratahpp, (sum(qty_masuk)-sum(qty_keluar))*avg(hpp) as taksiran,  (select harga_jual from produk where produk_id=stokmasuk.produk_id) as hargajual, 
(sum(qty_masuk)-sum(qty_keluar))*(select harga_jual from produk where produk_id=stokmasuk.produk_id) as taksiranpj from stokmasuk group by produk_id order by (select produk_nama from produk where produk_id=stokmasuk.produk_id) ");
}else{
	$AdiSql=mysql_query("select (sum(qty_masuk)-sum(qty_keluar))*avg(hpp) as tottaksiran, (sum(qty_masuk)-sum(qty_keluar))*(select harga_jual from produk where produk_id=stokmasuk.produk_id) as tottaksiranpj from stokmasuk");
}



$rows = array();
while($r = mysql_fetch_array($AdiSql)) {
    $rows[] = $r;
}
print json_encode($rows);

?>