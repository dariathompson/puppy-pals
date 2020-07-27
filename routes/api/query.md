select random user from users table
where 
random_id != current_id
inner join Swipes Table
if swipes.actioner.id != users.current.id 
    show random
else
    where swipes.actioner.id = users.current.id
        swipes.actionee.id != swipes.random_id 




Swipes Table

actioner | actionee | action
 1          2       like
 2          1       like


 Matches Table

 user 1 | user 2 
 1          2

