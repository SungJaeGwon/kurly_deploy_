<?
    include_once('./kurly_header.php');

    $wType    = $_POST['wType'];
    $wName    = $_POST['wName'];
    $wId      = $_POST['wId'];
    $wSubject = $_POST['wSubject'];    
    $wContent = $_POST['wContent'];

    
    // 공지사항 게시글 테이블 저장
    $sql = "INSERT INTO green_kurly_notice_table (wType, wName,  wId,  wSubject, wContent)
            VALUES ('$wType','$wName','$wId','$wSubject','$wContent')";
    $result = mysqli_query($conn, $sql);

    
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

    echo '유형: '.$wType;
    echo '작성자: '.$wName;
    echo '아이디: '.$wId;
    echo '제목: '.$wSubject;    
    echo '내용: '.$wContent;



?>