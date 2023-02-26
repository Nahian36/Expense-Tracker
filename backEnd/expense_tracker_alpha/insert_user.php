<?php

	$conn = mysqli_connect("localhost","root","","expense_tracker_alpha");
	
	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$name = $obj['name'];
	$password = $obj['password'];
	$email = $obj['email'];
	
	//echo json_encode($amount.' '.$type.' '.$mode.' '.$category.' '.$note.' '.$date_col.' '.$day_col);
	
	$squery  = "insert into account_table (name,password,email) values ('$name','$password','$email')";
	
	if(mysqli_query($conn,$squery)){
		
		$msg = "Successfully inserted.";
		echo json_encode($msg);
		
	} else {
		echo json_encode('error has occured.');
	}
	
	mysqli_close($conn);
?>