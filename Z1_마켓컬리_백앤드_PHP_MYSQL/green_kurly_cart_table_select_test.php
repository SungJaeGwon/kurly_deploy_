<?
    include_once('./kurly_header.php');
    
    $userId = 'moonjong'; // 본인 아이디
    // 장바구니 저장    
    
    $sql = "SELECT * FROM green_kurly_cart_table
            WHERE userId='$userId'";
    $result = mysqli_query($conn, $sql);

    echo '$userId';
    echo $userId;
    // 장바구니 목록이 1개 이상 존재한다면
    // 배열선언 => 모든 장바구니 목록을 객체(배열 속성) 생성하여
    // JSON 형식으로 응답한다.(반복문)
    if( mysqli_num_rows($result) > 0 ){
        $arr = array();
        while( $item = mysqli_fetch_array($result)  ){
            array_push($arr, array(
                '번호' => $item['번호'],
                '이미지' => $item['이미지'],
                '제품명' => $item['제품명'],
                '할인율' => $item['할인율'],
                '판매가' => $item['판매가'],
                '제품특징' => $item['제품특징'],
                '제조사' => $item['제조사'],
                '제조일시' => $item['제조일시'],
                '판매처' => $item['판매처'],
                '보관방법' => $item['보관방법'],
                '배송' => $item['배송'],
                '옵션' => $item['옵션'],
                '옵션상품목록' => $item['옵션상품목록'],
                '정가' => $item['정가'],
                '일시' => $item['일시'],
                '제품코드' => $item['제품코드'],
                '장바구니상품명' => $item['장바구니상품명'],
                '수량' => $item['수량']
            ));
        }
    }

    $json_data = json_encode($arr, JSON_UNESCAPED_UNICODE);
    echo $json_data;

?>