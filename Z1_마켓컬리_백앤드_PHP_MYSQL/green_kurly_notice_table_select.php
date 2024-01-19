<?
    include_once('./kurly_header.php');

    // 타입을 기준으로 내림차순 정렬1, 날짜를 기준 내림차순 정렬
    // 공지글과 일반게시글 분류해서 출력한다. 
    $sql = "SELECT * FROM green_kurly_notice_table ORDER BY wType DESC, wDate DESC";
    $res = mysqli_query($conn, $sql);
 
    // 객체(배열객체)로 선언           
    if( mysqli_num_rows($res) > 0 ){        
        $arr = array();
        while( $row = mysqli_fetch_array($res) ){
            // 최초 폼데이터 받아서 
            $wSubject  = str_replace("&#039;", "'", $row['wSubject'] );
            $wContent = str_replace("&#039;", "'", $row['wContent'] );

            // 여기서부터는 변경된 변수를 가지고 변경
            $wSubject  = str_replace("&apos;", "'", $wSubject );
            $wContent = str_replace("&apos;", "'", $wContent );

            $wSubject  = str_replace("&quot;", "\"", $wSubject );
            $wContent = str_replace("&quot;", "\"", $wContent );

            $wSubject  = str_replace("&lt;", "<", $wSubject );
            $wContent = str_replace("&lt;", "<", $wContent );

            $wSubject  = str_replace("&gt;", ">", $wSubject );
            $wContent = str_replace("&gt;", ">", $wContent );

            $wSubject  = str_replace("&nbsp;", " ", $wSubject );
            $wContent = str_replace("&nbsp;", " ", $wContent );
        
            array_push($arr, array(
                '번호'=> $row['idx'],
                '타입'  => $row['wType'],
                '제목'  => $wSubject,
                '내용'  => $wContent,
                // '제목'  => htmlspecialchars_decode($row['wSubject'], ENT_QUOTES),
                // '내용'  => htmlspecialchars_decode($row['wContent'], ENT_QUOTES),
                '작성자'=> $row['wName'],
                '아이디'=> $row['wId'],
                '조회수'=> $row['wHit'],
                '작성일'=> $row['wDate']
            ));
        }        
    }    

    // JSON 형식의 객체로 생성 : 유니코드 사용 안함 JSON_UNESCAPED_UNICODE
    $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
    // $json = json_encode($arr);
    echo $json;

?>