<?php

	$conn = new mysqli("localhost","root","","expense_tracker_alpha");
	
	if($conn->connect_error) {
		die("Connection failed : ".$conn->connect_error);
	}
	
	//$json = file_get_contents('php://input');
	
	//$obj = json_decode($json,true);
	
	
	//$email = $obj['email'];
	
	$sql = "select * from budget_table";
	
	$result = $conn->query($sql);
	
	$arr = array();
	
	if($result->num_rows>0){
		
		while($row = $result->fetch_assoc()){
			
			array_push($arr,$row);
			
		}
		
		echo json_encode($arr);
		
	}else{
		echo json_encode($arr);
	}
	
	//echo json_encode($arr);
	
	$conn->close();
	
?>