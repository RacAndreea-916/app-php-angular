
<?php

require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

session_start(); 

header("Access-Control-Allow-Origin: http://localhost:4200"); // Allow Angular frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$token = null;
$headers = apache_request_headers();
if(isset($headers['Authorization'])){
  //echo json_encode(['error' =>$headers['Authorization']]);
  $matches = array();
  preg_match('/^Bearer\s+(.*)$/i', $headers['Authorization'], $matches);
  if(isset($matches[1])){
    $token = $matches[1];
   // echo json_encode(['matches' =>$token]);
  }
} 
//$token = $matches[1];
$secretKey = 'haha'; // Ensure this is correct

try {
  $decoded = JWT::decode($token, new Key($secretKey, 'HS256')); // Validate the JWT
} catch (Exception $e) {
  http_response_code(401);
  echo json_encode(['error' => 'Invalid or expired token']); // Handle invalid token
  exit();
}

include 'connection.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true); 
    $id = $data['id'];
    $logType = $data['type'];
    $severity = $data['severity'];
    $date = $data['date'];
    $message = $data['message'];
    $userId =  $decoded->sub; 

    
    $stmt = $conn->prepare("INSERT INTO logrequest (LogRequestId, type, severity, Date, log, userId) VALUES (:id, :log_type, :severity, :date, :message, :user_id)");
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':log_type', $logType);
    $stmt->bindParam(':severity', $severity);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':message', $message);
    $stmt->bindParam(':user_id', $userId);

    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Log added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add log']);
    }
} else {
    
    echo json_encode(['error' => 'Invalid request method']);
}
?>
