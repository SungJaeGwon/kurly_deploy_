<?
    include_once('./kurly_header.php');

    $idx = $_POST['idx'];
    $userId = $_POST['userId'];
    $받는분이름 = $_POST['받는분이름'];
    $받는분휴대폰 = $_POST['받는분휴대폰'];
    $기본배송지여부 = $_POST['기본배송지여부'];
    $주소2 = $_POST['주소2'];
    $등록일시 = date('Y-m-d H:i:s', time()); // 날짜시분초  커렌트타임스템프
    
    
    if($기본배송지여부=='YES'){ // 배송지 여부 => YES 이면 (기본배송지)
        $sql = "UPDATE green_kurly_delivery_table 
                SET 기본배송지여부='NO'  
                WHERE userId='$userId'
                ";
        $result = mysqli_query($conn, $sql);
    }    

    $sql = "UPDATE green_kurly_delivery_table 
            SET 받는분이름='$받는분이름',받는분휴대폰='$받는분휴대폰',기본배송지여부='$기본배송지여부',주소2='$주소2', 등록일시='$등록일시'
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