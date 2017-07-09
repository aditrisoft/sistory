<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS,PUT,DELETE');

$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		if(isset($data->nodo)){
			$kode=$data->nodo;
		}else{
			$kode='';
		}
}

if($cud=='input'){
	$produk_id=$data->produk_id;
	$harga=$data->harga;
	$qty=$data->qty;
	$nopo=$data->nopo;
	$nodo=$data->nodo;

	#input produk saja di nopo ini
		mysql_query("insert into do_detail(nodo, nopo, produk_id, qty, harga) values ('$nodo','$nopo', '$produk_id', '$qty', '$harga')");



}elseif($cud=='edit'){
	$nodo = $data->nodo;
	$tgl = $data->tgl;		
	$usernama = $data->usernama;
	if(isset($data->cara_bayar_selisih)){
		$cara_bayar_selisih = $data->cara_bayar_selisih;
		$selisih = $data->selisih;
		$status_selisih = $data->status_selisih;		
	}
	$noperk = $data->noperk;
	$suplier = $data->suplier;
	$keterangan='DO dari '.$suplier;
	$totalpo = $data->totalpo;
	$noref='DO';

	mysql_query("update do set waktu_real=now(), noref='$noref', tgl='$tgl', usernama='$usernama', statustr='0', cara_bayar_selisih='$cara_bayar_selisih', noperk='$noperk', selisih='$selisih', status_selisih='$status_selisih' where nodo='$kode'");

	#isi ke stokmasuk
	mysql_query("insert into stokmasuk(tgl, waktu_real, produk_id, ref, qty_masuk, hpp, sisa, notrans) select '$tgl', now(), produk_id, 'DP', qty, harga, qty, nodo from do_detail where nodo='$kode'");	

	#buat jurnal persediaan
		$noperkkas='1000';
		$noperkhutang='2001';
		$noperkpiutang='1061';
		$noperkpersediaan='1051';
		$noperkpdp='1052';
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nodo', '$noperkpersediaan', '$keterangan', '$totalpo', '0', 'DO')");
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nodo', '$noperkpdp', '$keterangan', '0', '$totalpo', 'DO')");	

	#jurnal hutang
		if($cara_bayar_selisih=='2' && $status_selisih=='2'){
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nodo', '$noperkpiutang', '$keterangan', '$selisih', '0', 'Selisih DO')");
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nodo', '$noperkpersediaan', '$keterangan', '0', '$jmlbayar', 'Selisih DO')");	
		}

	#jurnal piutang
		if($cara_bayar_selisih=='2' && $status_selisih=='1'){
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nodo', '$noperkpersediaan', '$keterangan', '$selisih', '0', 'Selisih DO')");
			mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nodo', '$noperkhutang', '$keterangan', '0', '$selisih', 'Selisih DO')");	
		}
	
}elseif($cud=='hapus'){

	mysql_query("update statustr='1' from do where nodo='$kode'");
	mysql_query("delete from tbjurnal where nokwit='$kode'");


}else{

	$Adisql=mysql_query("select date(tgl) as tgl, nodo, nopo, idsuplier, (select nama from suplier where idsuplier=do.idsuplier) as suplier, noref, (select sum(harga*qty) from do_detail where nodo=do.nodo) as total, (select sum(harga*qty) from po_detail where nopo=do.nopo) as totalpo, (select jmlbayar from po where nopo=do.nopo) as jmlbayar, (select kurangbayar from po where nopo=do.nopo) as kurangbayar from do where nodo='$kode'");
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