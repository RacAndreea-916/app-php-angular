<?php
session_start(); 
include 'connection.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'PUT') { 
    $input = file_get_contents("php://input"); 
    $data = json_decode($input, true); 

    if (isset($data['logRequestId']) && isset($data['type']) && isset($data['severity']) && isset($data['log'])) {
        $logRequestId = (int)$data['logRequestId'];
        $type = $data['type'];
        $severity = $data['severity'];
        $log = $data['log'];

        
        $stmt = $conn->prepare("UPDATE logrequest SET Type = :type, Severity = :severity, Log = :log WHERE LogRequestId = :logRequestId");
        $stmt->bindParam(':logRequestId', $logRequestId, PDO::PARAM_INT);
        $stmt->bindParam(':type', $type, PDO::PARAM_STR);
        $stmt->bindParam(':severity', $severity, PDO::PARAM_STR);
        $stmt->bindParam(':log', $log, PDO::PARAM_STR);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Log updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to update log']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
