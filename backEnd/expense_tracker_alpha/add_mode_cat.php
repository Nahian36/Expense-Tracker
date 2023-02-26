<?php

	$conn = mysqli_connect("localhost","root","","expense_tracker_alpha");
	
	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$name = $obj['name'];
	$user_id = $obj['user_id'];
	
	//$name = 'books';
	//$user_id = 19;
	
	//echo json_encode($amount.' '.$type.' '.$mode.' '.$category.' '.$note.' '.$date_col.' '.$day_col);
	
	$squery  = "insert into mode_table (name,user_id) values ('$name',$user_id)";
	
	if(mysqli_query($conn,$squery)){
		
		$msg = "Successfully inserted.";
		echo json_encode($msg);
		
	} else {
		echo json_encode('error has occured.');
	}
	
	mysqli_close($conn);
?>