<?
    include_once('./kurly_header.php');

    $wType    = $_POST['wType'];
    $wName    = $_POST['wName'];
    $wId      = $_POST['wId'];
    // $wSubject = htmlspecialchars($_POST['wSubject'], ENT_QUOTES);
    // $wContent = htmlspecialchars($_POST['wContent'], ENT_QUOTES);
  
    $wSubject = str_replace( "'", "&apos;", $_POST['wSubject'] );
    $wContent = str_replace( "'", "&apos;", $_POST['wContent'] );

    $wSubject = str_replace( "\"", "&quot;", $wSubject );
    $wContent = str_replace( "\"", "&quot;", $wContent );

    $wSubject = str_replace( "<", "&lt;", $wSubject );
    $wContent = str_replace( "<", "&lt;", $wContent );

    $wSubject = str_replace( ">", "&gt;", $wSubject );
    $wContent = str_replace( ">", "&gt;", $wContent );
    
    // 줄바꿈 new line => <br />
    $wSubject = nl2br($wSubject);
    $wContent = nl2br($wContent);

    // $wSubject = str_replace( " ", "&nbsp;", $wSubject );
    // $wContent = str_replace( " ", "&nbsp;", $wContent );


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

?>