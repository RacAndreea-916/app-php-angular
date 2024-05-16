<?php
include 'connection.php'; 


$type = isset($_GET['type']) ? $_GET['type'] : '';
$severity = isset($_GET['severity']) ? $_GET['severity'] : '';
//$message = isset($_GET['Log']) ? $_GET['Log'] : '';


$sql = "SELECT * FROM logrequest WHERE 1=1";

if ($type) {
    $sql .= " AND Type = :type";
}

if ($severity) {
    $sql .= " AND Severity = :severity";
}



$stmt = $conn->prepare($sql);


if ($type) {
    $stmt->bindParam(':type', $type, PDO::PARAM_STR);
}

if ($severity) {
    $stmt->bindParam(':severity', $severity, PDO::PARAM_STR);
}

$stmt->execute();


$logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($logs); 
