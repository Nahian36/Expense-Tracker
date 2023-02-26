<?php

	$conn = new mysqli("localhost","root","","expense_tracker_alpha");
	
	if($conn->connect_error) {
		die("Connection failed : ".$conn->connect_error);
	}
	
	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	//echo json_encode($obj);
	
	//I didn't give a dollar sign and to find it out I had to debug it for 2 hours
	//This is the sole reason I hate PHP
	
	$start_date = $obj['start_date'];
	$end_date = $obj['end_date'];
	$user_id = $obj['user_id'];
	//$start_date = '2021-10-12';
	//$end_date = '2021-10-30';
	//$user_id = 19;
	
	/*$arr = array();
	array_push($arr,'atiq');
	array_push($arr,'on');
	array_push($arr,'fire');*/
	
	//echo json_encode($start_date.' '.$end_date.' '.$user_id);
	
	$sql = "SELECT sum(amount) FROM `expense_table` WHERE '$start_date'<=date_col AND date_col<='$end_date' And user_id='$user_id'";
	
	$result = $conn->query($sql);
	
	while($row = mysqli_fetch_array($result)){
		echo json_encode($row['sum(amount)']);
	}
	
	$conn->close();
	
?>