<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');


$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		$kode=$data->id;
}



if($cud=='input'){
	$keterangan = $data->keterangan;
	$masuk = $data->masuk;		
	$keluar = $data->keluar;		
	$nokwitbank = nofaktur();		
	$terbilang = $data->terbilang;	
	$terbilang = terbilang((float)$terbilang);	
	$usernama = $data->usernama;		

	$noperk = $data->noperk;
	$namaperk = $data->namaperk;

	$noperkbank= $data->noperkbank;
	$tgl= $data->tgl;
	#insert kas
	mysql_query("insert into tbbank(tgl, keterangan, masuk, keluar, nokwitbank, terbilang, usernama, waktu_real) values ('$tgl','$keterangan', '$masuk', '$keluar', '$nokwitbank', '$terbilang', '$usernama', now() )");

	#cek kas masuk/keluar
	if((float)$masuk>0){
		#jurnal masuk
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nokwitbank', '$noperkbank', '$keterangan', '$masuk', '$keluar', 'BANK')");
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nokwitbank', '$noperk', '$keterangan', '$keluar', '$masuk', 'BANK')");
	}else{
		#jurnal keluar
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nokwitbank', '$noperk', '$keterangan', '$keluar', '$masuk', 'BANK')");
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nokwitbank', '$noperkbank', '$keterangan', '$masuk', '$keluar', 'BANK')");
	}

	
}elseif($cud=='hapus'){

	mysql_query("update tbbank set statustr='1' where nokwitbank='$kode'");
	mysql_query("update tbjurnal set statustr='1' where nokwit='$kode'");

}else{

	$Adisql=mysql_query("select * from tbbank where nokwitbank='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function terbilang($x) {
  $angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  if ($x < 12)
    return " " . $angka[$x];
  elseif ($x < 20)
    return terbilang($x - 10) . " Belas";
  elseif ($x < 100)
    return terbilang($x / 10) . " Puluh" . terbilang($x % 10);
  elseif ($x < 200)
    return "Seratus" . terbilang($x - 100);
  elseif ($x < 1000)
    return terbilang($x / 100) . " Ratus" . terbilang($x % 100);
  elseif ($x < 2000)
    return "Seribu" . terbilang($x - 1000);
  elseif ($x < 1000000)
    return terbilang($x / 1000) . " Ribu" . terbilang($x % 1000);
  elseif ($x < 1000000000)
    return terbilang($x / 1000000) . " Juta" . terbilang($x % 1000000);
}

function nofaktur(){
	$AdiSql=mysql_query("select * from tbbank where left(nokwitbank,2)='BA' ORDER BY id desc");
	$hasil=mysql_fetch_assoc($AdiSql);
	if($hasil['nokwitbank']==null){
		$nofaktur="BA" . 1;
	}else{
		$nofaktur=$hasil['nokwitbank'];
		$xxx=strlen($hasil['nokwitbank'])-2;
		$nofaktur="BA" . (substr($nofaktur, $xxx*-1)+1);
	}
	return $nofaktur;
}

?>