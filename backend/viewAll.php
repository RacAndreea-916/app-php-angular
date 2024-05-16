<?php
header("Access-Control-Allow-Origin: http://localhost:4200"); // Allow requests from your Angular app
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow HTTP methods
header("Access-Control-Allow-Headers: Content-Type,Authorization");
session_start();


include 'connection.php';


$totalCountSql = "SELECT COUNT(*) as total FROM logrequest";
$totalCountStmt = $conn->prepare($totalCountSql);
$totalCountStmt->execute();
$totalCountResult = $totalCountStmt->fetch(PDO::FETCH_ASSOC);
$totalCount = $totalCountResult['total']; // Total records


$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 4; 
$offset = ($page - 1) * $limit;

$sql = "SELECT * FROM logrequest LIMIT :limit OFFSET :offset";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

$logs = $stmt->fetchAll(PDO::FETCH_ASSOC); 

$response = [
    'logs' => $logs,
    'totalCount' => $totalCount,
];

echo json_encode($response); 
?>
