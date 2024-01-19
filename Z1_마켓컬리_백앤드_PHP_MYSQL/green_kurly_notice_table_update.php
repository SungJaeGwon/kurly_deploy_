<?
    include_once('./kurly_header.php');


    $idx      = $_POST['idx'];
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

    // $wSubject = str_replace( " ", "&nbsp;", $wSubject );
    // $wContent = str_replace( " ", "&nbsp;", $wContent );

    
    // 공지사항 게시글 테이블 저장
    $sql = "UPDATE  green_kurly_notice_table  
            SET     wType='$wType', wName='$wName', wId='$wId', wSubject='$wSubject', wContent='$wContent'
            WHERE   idx='$idx'";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>