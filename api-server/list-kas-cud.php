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

#asumsi kas = 1000
$noperkkas='1000';

if($cud=='input'){
	$keterangan = $data->keterangan;
	$masuk = $data->masuk;		
	$keluar = $data->keluar;		
	$nokwitkas = nofaktur();		
	$terbilang = $data->terbilang;	
	$terbilang = terbilang((float)$terbilang);	
	$usernama = $data->usernama;		

	$noperk = $data->noperk;
	$namaperk = $data->namaperk;

	#insert kas
	mysql_query("insert into tbkas(tgl, keterangan, masuk, keluar, nokwitkas, terbilang, usernama, waktu_real) values (now(),'$keterangan', '$masuk', '$keluar', '$nokwitkas', '$terbilang', '$usernama', now() )");

	#cek kas masuk/keluar
	if((float)$masuk>0){
		#jurnal masuk
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values (now(), '$nokwitkas', '$noperkkas', '$keterangan', '$masuk', '$keluar', 'KAS')");
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values (now(), '$nokwitkas', '$noperk', '$keterangan', '$keluar', '$masuk', 'KAS')");
	}else{
		#jurnal keluar
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values (now(), '$nokwitkas', '$noperk', '$keterangan', '$keluar', '$masuk', 'KAS')");
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values (now(), '$nokwitkas', '$noperkkas', '$keterangan', '$masuk', '$keluar', 'KAS')");
	}

	
}elseif($cud=='hapus'){

	mysql_query("update tbkas set statustr='1' where nokwitkas='$kode'");
	mysql_query("update tbjurnal set statustr='1' where nokwit='$kode'");

}else{

	$Adisql=mysql_query("select * from tbkas where nokwitkas='$kode'");
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
	$AdiSql=mysql_query("select * from tbkas where left(nokwitkas,2)='KA' ORDER BY id desc");
	$hasil=mysql_fetch_assoc($AdiSql);
	if($hasil['nokwitkas']==null){
		$nofaktur="KA" . 1;
	}else{
		$nofaktur=$hasil['nokwitkas'];
		$xxx=strlen($hasil['nokwitkas'])-2;
		$nofaktur="KA" . (substr($nofaktur, $xxx*-1)+1);
	}
	return $nofaktur;
}

?>