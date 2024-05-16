<?php
session_start(); 
header("Access-Control-Allow-Origin: http://localhost:4200"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

//    

include 'connection.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['LogRequestId'])) {
    $logRequestId = (int)$_GET['LogRequestId'];

    
    $stmt = $conn->prepare("DELETE FROM logrequest WHERE LogRequestId = :logRequestId");
    $stmt->bindParam(':logRequestId', $logRequestId, PDO::PARAM_INT);
   // $stmt->bindParam(':userId', $_SESSION['userId'], PDO::PARAM_INT); // Ensure user can only delete their own logs
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Log deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete log']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
}
