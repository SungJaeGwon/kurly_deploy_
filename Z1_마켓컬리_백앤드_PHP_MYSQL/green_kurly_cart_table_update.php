<?

    include_once('./kurly_header.php');

    $userId = $_POST['userId'];
    $제품코드 = $_POST['제품코드'];
    $수량 = $_POST['수량'];

    $sql = "UPDATE green_kurly_cart_table 
            SET 수량='$수량'
            WHERE userId='$userId' AND 제품코드='$제품코드'
           ";
    $res = mysqli_query($conn, $sql);
 
    if( $res == true ){        
        echo 1;
    }
    else{
        echo 0;
    }

?>


