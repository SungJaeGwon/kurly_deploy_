<?
    include_once('./kurly_header.php');

    $userId = $_POST['userId'];
    $받는분이름 = $_POST['받는분이름'];
    $받는분휴대폰 = $_POST['받는분휴대폰'];
    $기본배송지여부 = $_POST['기본배송지여부'];
    $배송시요청사항 = $_POST['배송시요청사항'];
    $우편번호 = $_POST['우편번호'];
    $주소1 = $_POST['주소1'];
    $주소2 = $_POST['주소2'];
    
    
    if($기본배송지여부=='YES'){ // 배송지 여부 => YES 이면 (기본배송지)
        $sql = "UPDATE green_kurly_delivery_table SET 기본배송지여부='NO'  
                WHERE userId='$userId'";
        $result = mysqli_query($conn, $sql);
    }    

    $sql = "INSERT INTO green_kurly_delivery_table (userId,받는분이름,받는분휴대폰,기본배송지여부,배송시요청사항,우편번호,주소1,주소2)
    VALUES ('$userId','$받는분이름','$받는분휴대폰','$기본배송지여부','$배송시요청사항','$우편번호','$주소1','$주소2')";        
    $result = mysqli_query($conn, $sql);

    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    } 
    

    
   

?>