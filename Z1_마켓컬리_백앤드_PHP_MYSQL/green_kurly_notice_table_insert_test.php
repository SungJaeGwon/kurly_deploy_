<?
    include_once('./kurly_header.php');
    
    $wType = '';
    $wSubject = "My DT Pass 서비스 이용약관 개정 안내";    
    $wContent = "안녕하세요. 스타벅스 코리아 My DT Pass 서비스 이용약관이 개정되어 변경 내용을 안내드립니다.";
    $wName = "이순신";
    $wId = "gksmf519";
    $wHit = 0;
   
    // 공지사항 게시글 테이블 저장
    $sql = "INSERT INTO green_kurly_notice_table (wType, wSubject, wContent, wName, wId, wHit)
            VALUES ('$wType','$wSubject','$wContent','$wName','$wId','$wHit')";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo "공지사항 게시글 저장 성공!";
    }
    else{
        echo "공지사항 게시글 저장 실패!";
    }

?>