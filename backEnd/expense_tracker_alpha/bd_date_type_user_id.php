<?php

	$conn = new mysqli("localhost","root","","expense_tracker_alpha");
	
	if($conn->connect_error) {
		die("Connection failed : ".$conn->connect_error);
	}
	
	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$date_col = $obj['date_col'];
	$type = $obj['type'];
	$user_id = $obj['user_id'];
	 //$user_id = 30;
	 //$date_col = '2021-11-09T06:00:00.000Z';
	 //$type = 'ex';
	
	//echo json_encode(json_encode($date_col));
	
	$sql = "SELECT * FROM `budget_table` WHERE start_date<='$date_col' AND '$date_col'<=end_date AND type='$type' AND user_id=$user_id";
	
	$result = $conn->query($sql);
	
	$arr = array();
	
	//$flag = 0;
	
	if($result->num_rows>0){
		
		while($row = $result->fetch_assoc()){
			
			array_push($arr,$row);
			
		}
		
		echo json_encode($arr);
		
	}else{
		echo json_encode($arr);
	}
	
	//if(flag==1)echo json_encode($arr);
	
	$conn->close();
	
?>