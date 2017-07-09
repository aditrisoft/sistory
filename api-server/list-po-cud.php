<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');

$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		if(isset($data->nopo)){
			$kode=$data->nopo;
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
	$produk_id=$data->produk_id;
	$harga=$data->harga;
	$qty=$data->qty;
	$usernama=$data->usernama;
	if(isset($data->idsuplier)){
		$idsuplier = $data->idsuplier;			
	}else{
		$idsuplier = '';
	}	

	if($kode!=''){
		#ambil nopo
		$nopo=$kode;

		#input produk saja di nopo ini
			mysql_query("insert into po_detail(nopo, produk_id, qty, harga) values ('$nopo', '$produk_id', '$qty', '$harga')");

		#tampilkan ke view
			echo $nopo;			
	}else{
		#buat nopo
		$nopo=call_nopo();

		#input po dan produk
			mysql_query("insert into po(nopo, tgl, noref, usernama, waktu_real, idsuplier) values ('$nopo', '$tgl', '$noref', '$usernama', now(), '$idsuplier')");

			mysql_query("insert into po_detail(nopo, produk_id, qty, harga) values ('$nopo', '$produk_id', '$qty', '$harga')");

		#tampilkan ke view
			echo $nopo;
	}

}elseif($cud=='edit'){
	$nopo = $data->nopo;
	$tgl = $data->tgl;		
	$noref = $data->noref;
	$usernama = $data->usernama;
	if(isset($data->idsuplier)){
		$idsuplier = $data->idsuplier;			
	}else{
		$idsuplier = '';
	}

	mysql_query("update po set nopo='$nopo', noref='$noref', tgl='$tgl', usernama='$usernama', idsuplier='$idsuplier' where nopo='$kode'");

}elseif($cud=='validasi'){
	$nopo = $data->nopo;
	$tgl = $data->tgl;		
	$jmlbayar = $data->jmlbayar;
	$kurangbayar = $data->kurangbayar;
	if(isset($data->noperk)){
		$noperk = $data->noperk;			
	}else{
		$noperk = '';
	}
	$idsuplier=$data->idsuplier;
	$suplier=$data->suplier;
	$keterangan='PO ke '.$suplier;
	$carabayar=$data->carabayar;


	mysql_query("update po set usernama_accounting='1', noperk='$noperk', waktu_validasi='$tgl', jmlbayar='$jmlbayar', kurangbayar='$kurangbayar' where nopo='$kode'");


	#input jurnal
		$noperkpdp='1052';
		$hutangusaha='2001';
		#jurnal tunai
			if($carabayar=='1'){
				$noperkkas='1000';
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopo', '$noperkpdp', '$keterangan', '$jmlbayar', '0', 'PO')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopo', '$noperkkas', '$keterangan', '0', '$jmlbayar', 'PO')");				
			}

		#jurnal transfer bank
			if($carabayar=='0'){
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopo', '$noperkpdp', '$keterangan', '$jmlbayar', '0', 'PO')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopo', '$noperk', '$keterangan', '0', '$jmlbayar', 'PO')");				
			}

		#jurnal hutang
			if($kurangbayar>0){
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopo', '$noperkpdp', '$keterangan', '$kurangbayar', '0', 'PO')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopo', '$hutangusaha', '$keterangan', '0', '$kurangbayar', 'PO')");		

				#input hutang
				mysql_query("insert into hutang (nokwit, tgl, idsuplier, tgljt, nominal) values ('$nopo','$tgl','$idsuplier',DATE_ADD($tgl, INTERVAL 1 MONTH, waktu_real),'$kurangbayar', now())");

			}
	


	#cek sudah diproses atau belum
		$AdiSQL=mysql_query("select * from do where nopo='$kode'");	
		$jum=mysql_num_rows($AdiSQL);
		if ($jum<1){

		#salin po ke do
			$AdiSQL=mysql_query("select * from po where nopo='$kode'");	
			$row=mysql_fetch_assoc($AdiSQL);
			//$tgl=$row['tgl'];
			$nopo=$row['nopo'];
			$nodo=call_nodo();
			$idsuplier=$row['idsuplier'];

			mysql_query("insert into do(nodo, nopo, tgl, idsuplier) values ('$nodo','$nopo', now(),'$idsuplier')");

			mysql_query("insert into do_detail(nodo, nopo, produk_id, qty, harga) select '$nodo', nopo, produk_id, qty, harga from po_detail where nopo='$kode'");
		}

			
}elseif($cud=='hapus'){

	mysql_query("delete from po where nopo='$kode'");
	mysql_query("delete from po_detail where nopo='$kode'");

}elseif($cud=='do'){
	#cek sudah diproses atau belum
		$AdiSQL=mysql_query("select * from do where nopo='$kode'");	
		$jum=mysql_num_rows($AdiSQL);
		if ($jum<1){

		#salin po ke do
			$AdiSQL=mysql_query("select * from po where nopo='$kode'");	
			$row=mysql_fetch_assoc($AdiSQL);
			//$tgl=$row['tgl'];
			$nopo=$row['nopo'];
			$nodo=call_nodo();
			$idsuplier=$row['idsuplier'];

			mysql_query("insert into do(nodo, nopo, tgl, idsuplier) values ('$nodo','$nopo', now(),'$idsuplier')");

			mysql_query("insert into do_detail(nodo, nopo, produk_id, qty, harga) select '$nodo', nopo, produk_id, qty, harga from po_detail where nopo='$kode'");
		}

}else{

	$Adisql=mysql_query("select date(tgl) as tgl, nopo, idsuplier, (select nama from suplier where idsuplier=po.idsuplier) as suplier, noref, usernama_accounting, (select sum(harga*qty) from po_detail where nopo=po.nopo) as total from po where nopo='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function call_nopo(){
	$AdiSQL=mysql_query("select right(nopo,9) as nopo from po order by right(nopo,9) desc limit 1");
	$jum=mysql_num_rows($AdiSQL);
	if ($jum>0){
		$row=mysql_fetch_assoc($AdiSQL);
		$hasil=$row['nopo'];
		$hasil=floatval($row['nopo'])+1;
		$hasil=sprintf("%09d", $hasil);
		return "PO".$hasil;
	}else{
		return "PO000000001";
	}
}

function call_nodo(){
	$AdiSQL=mysql_query("select right(nodo,9) as nodo from do order by right(nodo,9) desc limit 1");
	$jum=mysql_num_rows($AdiSQL);
	if ($jum>0){
		$row=mysql_fetch_assoc($AdiSQL);
		$hasil=$row['nodo'];
		$hasil=floatval($row['nodo'])+1;
		$hasil=sprintf("%09d", $hasil);
		return "DO".$hasil;
	}else{
		return "DO000000001";
	}
}

?>