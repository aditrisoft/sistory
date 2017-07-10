<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: pjST,GET,OPTIONS,PUT,DELETE');

$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		if(isset($data->nopb)){
			$kode=$data->nopb;
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
		$idsuplier = '000';
	}	

	if($kode!=''){
		#ambil nopb
		$nopb=$kode;

		#input produk saja di nopb ini
			mysql_query("insert into pb_detail(nopb, produk_id, qty, harga) values ('$nopb', '$produk_id', '$qty', '$harga')");

		#tampilkan ke view
			echo $nopb;			
	}else{
		#buat nopb
		$nopb=call_nopb();

		#input pj dan produk
			mysql_query("insert into pb(nopb, tgl, noref, usernama, waktu_real, idsuplier) values ('$nopb', '$tgl', '$noref', '$usernama', now(), '$idsuplier')");

			mysql_query("insert into pb_detail(nopb, produk_id, qty, harga) values ('$nopb', '$produk_id', '$qty', '$harga')");

		#tampilkan ke view
			echo $nopb;
	}

}elseif($cud=='edit'){
	$nopb = $data->nopb;
	$tgl = $data->tgl;		
	if(isset($data->noref)){
		$noref=$data->noref;
	}else{
		$noref='';
	}
	$usernama = $data->usernama;
	if(isset($data->idsuplier)){
		$idsuplier = $data->idsuplier;			
	}else{
		$idsuplier = '000';
	}
	$cara_bayar=$data->cara_bayar;
	if(isset($data->noperk)){
		$noperk = $data->noperk;			
	}else{
		$noperk = '';
	}	
	if(isset($data->suplier)){
		$suplier=$data->suplier;
	}else{
		$suplier = 'TIDAK TERDAFTAR';
	}		
	$keterangan='Pembelian dari '.$suplier;		
	if(isset($data->jmlbayar)){
		$jmlbayar=$data->jmlbayar;
	}else{
		$jmlbayar = 0;
	}		
	$kurangbayar=$data->kurangbayar;

	mysql_query("update pb set nopb='$nopb', noref='$noref', tgl='$tgl', usernama='$usernama', idsuplier='$idsuplier', cara_bayar='$cara_bayar', jmlbayar='$jmlbayar', kurangbayar='$kurangbayar', statustr='0' where nopb='$nopb'");

	#looping ke stok masuk
	mysql_query("insert into stokmasuk(tgl, waktu_real, produk_id, ref, qty_masuk, hpp, sisa, notrans) select '$tgl', now(), produk_id, 'PB', qty, harga, qty, nopb from pb_detail where nopb='$nopb'");	


	#buat jurnal persediaan
		$noperkkas='1000';
		$noperkhutang='2001';
		$noperkpiutang='1061';
		$noperkpersediaan='1051';
		$noperkpdp='1052';
		#jurnal tunai
			if($cara_bayar=='1'){
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopb', '$noperkpersediaan', '$keterangan', '$jmlbayar', '0', 'PB')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopb', '$noperkkas', '$keterangan', '0', '$jmlbayar', 'PB')");	
			}

		#jurnal transfer bank
			if($cara_bayar=='0'){
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopb', '$noperkpersediaan', '$keterangan', '$jmlbayar', '0', 'PB')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopb', '$noperk', '$keterangan', '0', '$jmlbayar', 'PB')");			
			}

		#jurnal full hutang
			if($cara_bayar=='2'){
				$total=floatval($jmlbayar)+floatval($kurangbayar);
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopb', '$noperkpersediaan', '$keterangan', '$total', '0', 'PB')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopb', '$noperkhutang', '$keterangan', '0', '$total', 'PB')");	

				#input hutang
				mysql_query("insert into hutang (nokwit, tgl, idsuplier, tgljt, nominal) values ('$kode','$tgl','$idsuplier',DATE_ADD($tgl, INTERVAL 1 MONTH, waktu_real),'$total', now())");
			}			

		#jurnal hutang
			if($kurangbayar>0 && $cara_bayar!='2'){
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopb', '$noperkpersediaan', '$keterangan', '$kurangbayar', '0', 'PB')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopb', '$noperkhutang', '$keterangan', '0', '$kurangbayar', 'PB')");		

				#input hutang
				mysql_query("insert into hutang (nokwit, tgl, idsuplier, tgljt, nominal,waktu_real) values ('$nopb','$tgl','$idsuplier',DATE_ADD('$tgl', INTERVAL 1 MONTH),'$kurangbayar',now())");

			}



		
}elseif($cud=='hapus'){
	#cek apakah stok ini pernah digunakan
		$AdiSql=mysql_query("select COALESCE(sum(qty_keluar),0) as keluar from stokmasuk where notrans='$kode'");
		$row=mysql_fetch_assoc($AdiSql);
		$jum=$row['keluar'];

		if($jum>0){
			echo "Tidak dapat dihapus! Stok ini sudah digunakan";
		}else{
			mysql_query("delete from pb where nopb='$kode'");
			mysql_query("delete from pb_detail where nopb='$kode'");
			mysql_query("delete from stokmasuk where notrans='$kode'");
		}


}else{

	$Adisql=mysql_query("select date(tgl) as tgl, nopb, idsuplier, (select nama from suplier where idsuplier=pb.idsuplier) as suplier, noref, (select sum(harga*qty) from pb_detail where nopb=pb.nopb) as total from pb where nopb='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function call_nopb(){
	$AdiSQL=mysql_query("select right(nopb,9) as nopb from pb order by right(nopb,9) desc limit 1");
	$jum=mysql_num_rows($AdiSQL);
	if ($jum>0){
		$row=mysql_fetch_assoc($AdiSQL);
		$hasil=$row['nopb'];
		$hasil=floatval($row['nopb'])+1;
		$hasil=sprintf("%09d", $hasil);
		return "PB".$hasil;
	}else{
		return "PB000000001";
	}
}


?>