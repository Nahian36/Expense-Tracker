<?php

	$conn = new mysqli("localhost","root","","expense_tracker_alpha");
	
	if($conn->connect_error) {
		die("Connection failed : ".$conn->connect_error);
	}
	
	
	$sql = "select * from main_table";
	
	$result = $conn->query($sql);
	
	$arr = array();
	
	if($result->num_rows>0){
		
		while($row = $result->fetch_assoc()){
			
			array_push($arr,$row);
			
		}
		
	}else{
		echo "No results found.";
	}
	
	echo json_encode($arr);
	
	$conn->close();
	
?>