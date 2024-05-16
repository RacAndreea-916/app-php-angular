<?php
session_start(); 
header("Access-Control-Allow-Origin: http://localhost:4200"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include 'connection.php'; 

$type = isset($_GET['type']) ? $_GET['type'] : ''; 
$severity = isset($_GET['severity']) ? $_GET['severity'] : ''; 
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1; 
$limit = 4; // Number of logs per page
$offset = ($page - 1) * $limit;


$sql = "SELECT * FROM logrequest WHERE 1=1"; 

if ($type) {
    $sql .= " AND Type = :type"; 
}

if ($severity) {
    $sql .= " AND Severity = :severity"; 
}

$sql .= " LIMIT :limit OFFSET :offset"; 

$stmt = $conn->prepare($sql);


if ($type) {
    $stmt->bindParam(':type', $type, PDO::PARAM_STR);
}

if ($severity) {
    $stmt->bindParam(':severity', $severity, PDO::PARAM_STR);
}


$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);

$stmt->execute();

$logs = $stmt->fetchAll(PDO::FETCH_ASSOC); 
echo json_encode($logs); 
