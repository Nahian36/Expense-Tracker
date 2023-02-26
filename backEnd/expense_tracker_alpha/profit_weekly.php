<?php

	$conn = new mysqli("localhost","root","","expense_tracker_alpha");
	
	if($conn->connect_error) {
		die("Connection failed : ".$conn->connect_error);
	}
	
	$json = file_get_contents('php://input');
	
	$obj = json_decode($json,true);
	
	//$date_col = $obj['date_col'];
	//$type = $obj['type'];
	$user_id = $obj['user_id'];
	//$user_id = 19;
	
	$sql = "select (iamount-eamount) as wprofit, iday as day_col
			from
			(select sum(income_table.amount) as iamount, income_table.day_col as iday
			from income_table
			WHERE
			income_table.date_col <= CURDATE() AND
			income_table.date_col > DATE_SUB(CURDATE(), INTERVAL 1 WEEK) AND
			user_id = $user_id
			group by income_table.day_col) as table_1,
			(select sum(expense_table.amount) as eamount, expense_table.day_col as eday
			from expense_table
			WHERE
			expense_table.date_col <= CURDATE() AND
			expense_table.date_col > DATE_SUB(CURDATE(), INTERVAL 1 WEEK) AND
			user_id = $user_id
			group by expense_table.day_col) as table_2
			WHERE
			iday=eday";
	
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