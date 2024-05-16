<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: http://localhost:4200"); // Allow Angular frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
//     http_response_code(200);
//     exit();
// }

// Extract and validate JWT from Authorization header
// $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
// if (!$authHeader || !preg_match('/^Bearer\s+(.*)$/i', $authHeader, $matches)) {
//     http_response_code(401);
    
//     echo json_encode(['error' => 'Unauthorized']);
//     echo json_encode(['error' =>$authHeader]); // Return 401 if Authorization header is missing or incorrect
//     exit();
// }
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

// JWT validation successful, continue with business logic
include 'connection.php';

$stmt = $conn->prepare("SELECT * FROM logrequest WHERE userId = :userId");
$stmt->bindParam(':userId', $decoded->sub, PDO::PARAM_INT); // Use the user ID from the decoded JWT
$stmt->execute();

$logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($logs) {
    echo json_encode($logs); // Return logs as JSON
} else {
    echo json_encode(['error' => 'No logs found']); // Handle case when no logs are found
}
