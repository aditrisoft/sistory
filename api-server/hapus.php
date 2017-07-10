<?php
include "db.php";

$kode='PJ000000002';

		$AdiSql=mysql_query("select * from stokkeluar where notrans='$kode'");
		while($row=mysql_fetch_array($AdiSql)){
			$qty_keluar=$row['qty_keluar'];
			$id_masuk=$row['id_masuk'];
			$produk_id=$row['produk_id'];
			mysql_query("update stokmasuk set qty_keluar=qty_keluar-$qty_keluar where id=$id_masuk and produk_id='$produk_id'");
			mysql_query("update stokmasuk set sisa=qty_masuk-qty_keluar where id=$id_masuk and produk_id='$produk_id'");
			mysql_query("delete from stokkeluar where notrans='$kode'");
		}


?>