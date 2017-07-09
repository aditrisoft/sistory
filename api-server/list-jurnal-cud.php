<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');

$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		if(isset($data->nobukti)){
			$kode=$data->nobukti;
		}else{
			$kode='';
		}
}

if($cud=='input'){
	if(isset($data->noref)){
		$noref=$data->noref;
	}else{
		$noref='';
	}
	$tgl=$data->tgl;
	$keterangan=$data->keterangan;
	$noperk=$data->noperk;
	$debit=$data->debit;
	$kredit=$data->kredit;
	$usernama=$data->usernama;

	if($kode!=''){
		#ambil nopo
		$nobukti=$kode;

		#input tbjurnal saja di nbobukti ini
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref, statustr) values ('$tgl', '$nobukti', '$noperk', '$keterangan', '$debit', '$kredit', 'Memorial', '1')");

		#tampilkan ke view
			echo $nobukti;			
	}else{
		#buat nopo
		$nobukti=call_nobukti();

		#input tbmemorial dan tbjurnal
			mysql_query("insert into tbmemorial(tgl, keterangan, nobukti, usernama, waktu_real, statustr) values ('$tgl', '$keterangan', '$nobukti', '$usernama', now(), '0' )");

			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref, statustr) values ('$tgl', '$nobukti', '$noperk', '$keterangan', '$debit', '$kredit', 'Memorial', '1')");

		#tampilkan ke view
			echo $nobukti;
	}

}elseif($cud=='edit'){
	$nopo = $data->nopo;
	$tgl = $data->tgl;		
	$noref = $data->noref;
	$usernama = $data->usernama;
	mysql_query("update tbmemorial set keterangan='$keterangan', tgl='$tgl', usernama='$usernama, statustr='0' where nobukti='$kode'");
	
	mysql_query("update tbjurnal set statustr='1' where nokwit='$kode'");

}elseif($cud=='hapus'){

	mysql_query("update tbmemorial set statustr='1' where nobukti='$kode'");
	mysql_query("update tbjurnal set statustr='1' where nokwit='$kode'");

}else{

	$Adisql=mysql_query("select * from tbmemorial where nobukti='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function call_nobukti(){
	$AdiSql=mysql_query("select * from tbmemorial where left(nobukti,2)='BM' ORDER BY id desc");
	$hasil=mysql_fetch_assoc($AdiSql);
	if($hasil['nobukti']==null){
		$nofaktur="BM" . 1;
	}else{
		$nofaktur=$hasil['nobukti'];
		$xxx=strlen($hasil['nobukti'])-2;
		$nofaktur="BM" . (substr($nofaktur, $xxx*-1)+1);
	}
	return $nofaktur;
}


?>