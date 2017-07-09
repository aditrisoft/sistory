<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');

$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
	$cud=$data->cud;
}


if($cud=='cicil'){
	$nokwit = $data->nokwit;
	$tgl = $data->tgl;		
	$cicilan = $data->cicilan;
	if(isset($data->noperk)){
		$noperk = $data->noperk;			
	}else{
		$noperk = '';
	}
	$suplier=$data->suplier;
	$keterangan='Bayar Hutang ke '.$suplier;
	$cara_bayar=$data->carabayar;
	$notrans=call_notrans();

	mysql_query("insert into hutangdetail (nokwit,notrans,tgl,cicilan,waktu_real,cara_bayar,noperk) values ('$nokwit','$notrans','$tgl','$cicilan',now(),'$cara_bayar','$noperk')");


	#input jurnal
		$hutangusaha='2001';
		#jurnal tunai
			if($carabayar='1'){
				$noperkkas='1000';
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$notrans', '$hutangusaha', '$keterangan', '$cicilan', '0', '$keterangan')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$notrans', '$noperkkas', '$keterangan', '0', '$cicilan', '$keterangan')");				
			}

		#jurnal transfer bank
			if($carabayar='0'){
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$notrans', '$hutangusaha', '$keterangan', '$cicilan', '0', '$keterangan')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$notrans', '$noperk', '$keterangan', '0', '$cicilan', '$keterangan')");				
			}

			
}elseif($cud=='hapus'){
	$notrans = $data->notrans;

	mysql_query("delete from hutangdetail where notrans='$notrans'");
	mysql_query("delete from tbjurnal where nokwit='$notrans'");

}elseif($cud=='detail'){
	$nokwit = $data->nokwit;

	$Adisql=mysql_query("select date(tgl) as tgl, notrans, cicilan, nokwit from hutangdetail where nokwit='$nokwit' order by tgl,waktu_real desc");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);

}else{
	$nokwit = $data->nokwit;

	$Adisql=mysql_query("select date(tgl) as tgl, tgl as waktu, nokwit, idsuplier, (select nama from suplier where idsuplier=hutang.idsuplier) as suplier, date(tgljt) as tgljt, nominal, 
(select if(isnull(sum(cicilan)),0,sum(cicilan)) from hutangdetail where nokwit=hutang.nokwit) as terbayar,
nominal-(select if(isnull(sum(cicilan)),0,sum(cicilan)) from hutangdetail where nokwit=hutang.nokwit) as sisa 
from hutang where nokwit='$nokwit'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function call_notrans(){
	$AdiSQL=mysql_query("select right(notrans,9) as notrans from hutangdetail order by right(notrans,9) desc limit 1");
	$jum=mysql_num_rows($AdiSQL);
	if ($jum>0){
		$row=mysql_fetch_assoc($AdiSQL);
		$hasil=$row['notrans'];
		$hasil=floatval($row['notrans'])+1;
		$hasil=sprintf("%09d", $hasil);
		return "HU".$hasil;
	}else{
		return "HU000000001";
	}
}



?>