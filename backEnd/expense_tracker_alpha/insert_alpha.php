<?php

	$conn = mysqli_connect("localhost","root","","expense_tracker_alpha");
	
	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$amount = $obj['amount'];
	$amount = floatval($amount);
	$type = $obj['type'];
	$mode = $obj['mode'];
	$category = $obj['category'];
	$note = $obj['note'];
	$date_col = $obj['date_col'];
	$day_col = $obj['day_col'];
	
	//echo json_encode($amount.' '.$type.' '.$mode.' '.$category.' '.$note.' '.$date_col.' '.$day_col);
	
	$squery  = "insert into main_table (amount,type,mode,category,note,date_col,day_col) values ($amount,'$type','$mode','$category','$note','$date_col','$day_col')";
	
	if(mysqli_query($conn,$squery)){
		
		$msg = "Successfully inserted.";
		echo json_encode($msg);
		
	} else {
		echo json_encode('error has occured.');
	}
	
	mysqli_close($conn);
?>