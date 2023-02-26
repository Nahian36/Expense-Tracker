<?php

	$conn = new mysqli("localhost","root","","expense_tracker_alpha");

	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	$name = $obj['name'];
	
	$sql = "DELETE FROM budget_table WHERE name='$name'";

	if ($conn->query($sql) === TRUE) {
		echo json_encode('Record deleted successfully');
	} else {
		echo json_encode('Error deleting record: '.$conn->error);
	}

	$conn->close();
?>