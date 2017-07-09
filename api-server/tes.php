<?php
include "db.php";


	$AdiSql = mysql_query("select nopo, (select date(tgl) from po where nopo=po_detail.nopo) as tgl, produk_id, (select idsuplier from po where nopo=po_detail.nopo) as idsuplier, produk_id, (select produk_nama from produk where produk_id=po_detail.produk_id) as produk_nama,qty, harga from po_detail");


/*
$rows = array();
while($r = mysql_fetch_array($AdiSql)) {
	$nopo=$r{'nopo'};
 	$rows[$nopo]['produk_id'] = $r{'produk_id'};
 	$rows[$nopo]['produk_nama'] = $r{'produk_nama'};
 	$rows[$nopo]['qty'] = $r{'qty'};
 	$rows[$nopo]['harga'] = $r{'harga'};
}
*/


$i=0;
$rows = array();
while($r = mysql_fetch_array($AdiSql)) {
	$nopo=$r{'nopo'};
	$rows[$nopo]['tgl']=$r{'tgl'};
	$rows[$nopo]['nopo']=$r{'nopo'};	
 	$rows[$nopo]['produk'][$i]['produk_id'] = $r{'produk_id'};
 	$rows[$nopo]['produk'][$i]['produk_nama'] = $r{'produk_nama'};
 	$rows[$nopo]['produk'][$i]['qty'] = $r{'qty'};
 	$rows[$nopo]['produk'][$i]['harga'] = $r{'harga'};
	$rows[$nopo]['idsuplier']=$r{'idsuplier'};	
 	$i++;
}
print json_encode($rows);


echo"<br><br>";
			$AdiSQL=mysql_query("select * from pj_detail where nopj='PJ000000001' order by produk_id");	
			while ($data = mysql_fetch_array ($AdiSQL)){
				$produk_id=$data['produk_id'];
				$qty=$data['qty'];
	#			mysql_query("call fifohpp('$produk_id','$tgl',$qty,'PJ','$kode')");
				echo $produk_id." - ".$qty."<br>";
			}

?>

