select (iamount-eamount) as wprofit, iday as day_col
from
(select sum(income_table.amount) as iamount, income_table.day_col as iday
from income_table
WHERE
income_table.date_col <= CURDATE() AND
income_table.date_col > DATE_SUB(CURDATE(), INTERVAL 1 WEEK) AND
user_id = 33
group by income_table.day_col) as table_1,
(select sum(expense_table.amount) as eamount, expense_table.day_col as eday
from expense_table
WHERE
expense_table.date_col <= CURDATE() AND
expense_table.date_col > DATE_SUB(CURDATE(), INTERVAL 1 WEEK) AND
user_id = 33
group by expense_table.day_col) as table_2
WHERE
iday=eday;


select (iamount-eamount) as yprofit, imonth as month_col
from
(select sum(income_table.amount) as iamount, income_table.month_col as imonth
from income_table
WHERE
income_table.date_col <= CURDATE() AND
income_table.date_col > DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND
user_id = 33
group by income_table.month_col) as table_1,
(select sum(expense_table.amount) as eamount, expense_table.month_col as emonth
from expense_table
WHERE
expense_table.date_col <= CURDATE() AND
expense_table.date_col > DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND
user_id = 33
group by expense_table.month_col) as table_2
WHERE
imonth=emonth;
