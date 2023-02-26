<?php

	$conn = mysqli_connect("localhost","root","","expense_tracker_alpha");
	
	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$amount = $obj['amount'];
	$amount = floatval($amount);
	$category = $obj['category'];
	$date_col = $obj['date_col'];
	$day_col = $obj['day_col'];
	$month_col = $obj['month_col'];
	$mode = $obj['mode'];
	$descp = $obj['descp'];
	$user_id = $obj['user_id'];
	
	//echo json_encode($amount.' '.$category.' '.$date_col.' '.$day_col.' '.$mode.' '.$descp.' '.$user_id);
	
	$squery  = "insert into income_table (amount,category,date_col,day_col,month_col,mode,descp,user_id) values ($amount,$category,'$date_col','$day_col','$month_col',$mode,'$descp',$user_id)";
	
	if(mysqli_query($conn,$squery)){
		
		$msg = "Successfully inserted.";
		echo json_encode($msg);
		
	} else {
		echo json_encode('error has occured.');
	}
	
	mysqli_close($conn);
?>