<?php
include "db.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type');
header('Access-Control-Allow-Methods: pjST,GET,OPTIONS,PUT,DELETE');

$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$cud=$data->cud;
		if(isset($data->nopj)){
			$kode=$data->nopj;
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
	if(isset($data->idpelanggan)){
		$idpelanggan = $data->idpelanggan;			
	}else{
		$idpelanggan = '';
	}	

	if($kode!=''){
		#ambil nopj
		$nopj=$kode;

		#input produk saja di nopj ini
			mysql_query("insert into pj_detail(nopj, produk_id, qty, harga) values ('$nopj', '$produk_id', '$qty', '$harga')");

		#tampilkan ke view
			echo $nopj;			
	}else{
		#buat nopj
		$nopj=call_nopj();

		#input pj dan produk
			mysql_query("insert into pj(nopj, tgl, noref, usernama, waktu_real, idpelanggan) values ('$nopj', '$tgl', '$noref', '$usernama', now(), '$idpelanggan')");

			mysql_query("insert into pj_detail(nopj, produk_id, qty, harga) values ('$nopj', '$produk_id', '$qty', '$harga')");

		#tampilkan ke view
			echo $nopj;
	}

}elseif($cud=='edit'){
	$nopj = $data->nopj;
	$tgl = $data->tgl;		
	if(isset($data->noref)){
		$noref=$data->noref;
	}else{
		$noref='';
	}
	$usernama = $data->usernama;
	if(isset($data->idpelanggan)){
		$idpelanggan = $data->idpelanggan;			
	}else{
		$idpelanggan = '';
	}
	$cara_bayar=$data->cara_bayar;
	if(isset($data->noperk)){
		$noperk = $data->noperk;			
	}else{
		$noperk = '';
	}	
	$pelanggan=$data->pelanggan;
	$keterangan='Penjualan ke '.$pelanggan;		
	$jmlbayar=$data->jmlbayar;
	$kurangbayar=$data->kurangbayar;

	mysql_query("update pj set nopj='$nopj', noref='$noref', tgl='$tgl', usernama='$usernama', idpelanggan='$idpelanggan', cara_bayar='$cara_bayar', jmlbayar='$jmlbayar', kurangbayar='$kurangbayar', statustr='0' where nopj='$kode'");

	#jalankan storeprocedure fifo
		#looping item sesuai nokwit
			$AdiSQL=mysql_query("select * from pj_detail where nopj='$kode' order by produk_id");	
			while ($data = mysql_fetch_array ($AdiSQL)){
				$produk_id=$data['produk_id'];
				$qty=$data['qty'];
				mysql_query("call fifohpp('$produk_id','$tgl',$qty,'PJ','$kode')");
			}


	#cek hpp
		$AdiSQL=mysql_query("select sum(qty_keluar*hpp) as hpp from stokkeluar where notrans='$kode'");
		$row=mysql_fetch_assoc($AdiSQL);
		$hpp=$row['hpp'];

	#input jurnal
		$noperkhpp='5001';
		$noperkpd='1054';
		$piutangusaha='1061';
		$noperkpj='4001';
		#jurnal tunai
			if($cara_bayar=='1'){
				$noperkkas='1000';
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkkas', '$keterangan', '$jmlbayar', '0', 'PJ')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkpj', '$keterangan', '0', '$jmlbayar', 'PJ')");

				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkhpp', '$keterangan', '$hpp', '0', 'PJ')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkpd', '$keterangan', '0', '$hpp', 'PJ')");
			}

		#jurnal transfer bank
			if($cara_bayar=='0'){
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperk', '$keterangan', '$jmlbayar', '0', 'PJ')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkpj', '$keterangan', '0', '$jmlbayar', 'PJ')");	

				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkhpp', '$keterangan', '$hpp', '0', 'PJ')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkpd', '$keterangan', '0', '$hpp', 'PJ')");			
			}

		#jurnal full piutang
			if($cara_bayar=='2'){
				$total=floatval($jmlbayar)+floatval($kurangbayar);
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$piutangusaha', '$keterangan', '$total', '0', 'PJ')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkpj', '$keterangan', '0', '$total', 'PJ')");	

				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkhpp', '$keterangan', '$hpp', '0', 'PJ')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkpd', '$keterangan', '0', '$hpp', 'PJ')");				

				#input piutang
				mysql_query("insert into piutang (nokwit, tgl, idpelanggan, tgljt, nominal,waktu_real) values ('$nopj','$tgl','$idpelanggan',DATE_ADD('$tgl', INTERVAL 1 MONTH),'$total',now())");
			}			

		#jurnal piutang
			if($kurangbayar>0 && $cara_bayar!='2'){
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$noperkpj', '$keterangan', '$kurangbayar', '0', 'PJ')");
				mysql_query("insert into tbjurnal (tgljurnal, nokwit, noperk, keterangan, debit, kredit, ref) values ('$tgl', '$nopj', '$piutangusaha', '$keterangan', '0', '$kurangbayar', 'PJ')");		

				#input hutang
				mysql_query("insert into piutang (nokwit, tgl, idpelanggan, tgljt, nominal,waktu_real) values ('$nopj','$tgl','$idpelanggan',DATE_ADD('$tgl', INTERVAL 1 MONTH),'$kurangbayar',now())");

			}







}elseif($cud=='validasi'){
	$nopj = $data->nopj;
	$tgl = $data->tgl;		
	$jmlbayar = $data->jmlbayar;
	$kurangbayar = $data->kurangbayar;
	if(isset($data->noperk)){
		$noperk = $data->noperk;			
	}else{
		$noperk = '';
	}
	$idpelanggan=$data->idpelanggan;
	
	mysql_query("update pj set statustr='0', noperk='$noperk', waktu_validasi='$tgl', jmlbayar='$jmlbayar', kurangbayar='$kurangbayar' where nopj='$kode'");

	#cek sudah diproses atau belum
		$AdiSQL=mysql_query("select * from do where nopj='$kode'");	
		$jum=mysql_num_rows($AdiSQL);
		if ($jum<1){

		#salin pj ke do
			$AdiSQL=mysql_query("select * from pj where nopj='$kode'");	
			$row=mysql_fetch_assoc($AdiSQL);
			//$tgl=$row['tgl'];
			$nopj=$row['nopj'];
			$nodo=call_nodo();
			$idpelanggan=$row['idpelanggan'];

			mysql_query("insert into do(nodo, nopj, tgl, idpelanggan) values ('$nodo','$nopj', now(),'$idpelanggan')");

			mysql_query("insert into do_detail(nodo, nopj, produk_id, qty, harga) select '$nodo', nopj, produk_id, qty, harga from pj_detail where nopj='$kode'");
		}

			
}elseif($cud=='hapus'){

	mysql_query("delete from pj where nopj='$kode'");
	mysql_query("delete from pj_detail where nopj='$kode'");


}else{

	$Adisql=mysql_query("select date(tgl) as tgl, nopj, idpelanggan, (select nama from pelanggan where idpelanggan=pj.idpelanggan) as pelanggan, noref, (select sum(harga*qty) from pj_detail where nopj=pj.nopj) as total from pj where nopj='$kode'");
	$rows=array();
	while($r=mysql_fetch_array($Adisql)){
		$rows[]=$r;
	}
	
	print json_encode($rows);
}


function call_nopj(){
	$AdiSQL=mysql_query("select right(nopj,9) as nopj from pj order by right(nopj,9) desc limit 1");
	$jum=mysql_num_rows($AdiSQL);
	if ($jum>0){
		$row=mysql_fetch_assoc($AdiSQL);
		$hasil=$row['nopj'];
		$hasil=floatval($row['nopj'])+1;
		$hasil=sprintf("%09d", $hasil);
		return "PJ".$hasil;
	}else{
		return "PJ000000001";
	}
}


?>