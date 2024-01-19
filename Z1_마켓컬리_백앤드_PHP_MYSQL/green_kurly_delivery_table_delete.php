<?
    include_once('./kurly_header.php');

    $idx = $_POST['idx'];
    $userId = $_POST['userId'];
   
    
    $sql = "DELETE FROM  green_kurly_delivery_table 
            WHERE idx='$idx' AND userId='$userId'
            ";
    $result = mysqli_query($conn, $sql);

    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    } 
    

    
   

?>