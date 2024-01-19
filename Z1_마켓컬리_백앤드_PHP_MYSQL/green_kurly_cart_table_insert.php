<?
    include_once('./kurly_header.php');
    
    $userId = $_POST['userId'];
    $번호 = $_POST['번호'];
    $이미지 = $_POST['이미지'];
    $제품명 = $_POST['제품명'];
    $할인율 = $_POST['할인율'];
    $판매가 = $_POST['판매가'];
    $제품특징 = $_POST['제품특징'];
    $제조사 = $_POST['제조사'];
    $제조일시 = $_POST['제조일시'];
    $판매처 = $_POST['판매처'];
    $보관방법 = $_POST['보관방법'];
    $배송 = $_POST['배송'];
    $옵션 = $_POST['옵션'];
    $옵션상품목록 = $_POST['옵션상품목록'];
    $정가 = $_POST['정가'];
    $일시 = $_POST['일시'];
    $제품코드 = $_POST['제품코드'];
    $장바구니상품명 = $_POST['장바구니상품명'];
    $수량 = $_POST['수량'];
    
    
    // 장바구니 저장    
    // green_kurly_cart_table_insert.php  수정
    $sql = "SELECT * FROM green_kurly_cart_table 
           WHERE userId='$userId' AND 제품코드='$제품코드'";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0){ // 중복되었다면 => 수량 만 수정 => 수량=수량 + 새로운 수량
        $sql = "UPDATE green_kurly_cart_table SET 수량=수량+$수량  
                WHERE userId='$userId' AND 제품코드='$제품코드'";
        $result = mysqli_query($conn, $sql);
        if($result==true){
            echo 1;  // 장바구니 => 수정 저장 성공 1
        }
        else{
            echo 0; // 장바구니 => 수정 저장 실패 0
        } 
    }
    else{ // 중복 안되었다면
        $sql = "INSERT INTO green_kurly_cart_table (userId,번호,이미지,제품명,할인율,판매가,제품특징,제조사,제조일시,판매처,보관방법,배송,옵션,옵션상품목록,정가,일시,제품코드,장바구니상품명,수량)
        VALUES ('$userId','$번호','$이미지','$제품명','$할인율','$판매가','$제품특징','$제조사','$제조일시','$판매처','$보관방법','$배송','$옵션','$옵션상품목록','$정가','$일시','$제품코드','$장바구니상품명','$수량')";        
        $result = mysqli_query($conn, $sql);
        if($result==true){
            echo 2; // 장바구니 =>추가 저장 성공 2
        }
        else{
            echo -1; // 장바구니 =>추가 저장 실패 -1
        } 
    }

    
   

?>