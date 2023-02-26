<?php

	$conn = mysqli_connect("localhost","root","","expense_tracker_alpha");
	
	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$name = $obj['name'];
	$amount = $obj['amount'];
	$amount = floatval($amount);
	$startDate = $obj['startDate'];
	$endDate = $obj['endDate'];
	$user_id = $obj['user_id'];
	$type = $obj['type'];
	
	//$name = 'books';
	//$user_id = 19;
	
	//echo json_encode($amount.' '.$type.' '.$mode.' '.$category.' '.$note.' '.$date_col.' '.$day_col);
	
	$squery  = "insert into budget_table (name,amount,start_date,end_date,user_id,type) values ('$name',$amount,'$startDate','$endDate',$user_id,'$type')";
	
	if(mysqli_query($conn,$squery)){
		
		$msg = "Successfully inserted.";
		echo json_encode($msg);
		
	} else {
		echo json_encode('error has occured.');
	}
	
	mysqli_close($conn);
?>