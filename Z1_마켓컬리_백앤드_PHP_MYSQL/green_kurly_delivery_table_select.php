<?
    include_once('./kurly_header.php');
    
    $userId = $_POST['userId'];
    

    $sql = "SELECT * FROM green_kurly_delivery_table
            WHERE userId='$userId'
            ORDER BY 등록일시 DESC
            ";
    $result = mysqli_query($conn, $sql);


    // 배송지 목록이 1개 이상 존재한다면
    // JSON 형식으로 응답한다.(반복문)
    if( mysqli_num_rows($result) > 0 ){
        $arr = array();
        while( $item = mysqli_fetch_array($result)  ){
            array_push($arr, array(
                'idx' => $item['idx'],
                '받는분이름' => $item['받는분이름'],
                '받는분휴대폰' => $item['받는분휴대폰'],
                '기본배송지여부' => $item['기본배송지여부'],
                '배송시요청사항' => $item['배송시요청사항'],
                '우편번호' => $item['우편번호'],
                '주소1' => $item['주소1'],
                '주소2' => $item['주소2'],
                '등록일시' => $item['등록일시']
            ));
        }
    }

    $json_data = json_encode($arr, JSON_UNESCAPED_UNICODE);
    echo $json_data;

?>