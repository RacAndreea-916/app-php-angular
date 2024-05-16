<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\key;

header("Access-Control-Allow-Origin: http://localhost:4200"); // Allow requests from Angular frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specified HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start();
include 'connection.php';

$secretKey = 'haha'; 


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true); 
    $username = $data['username']; 
    $password = $data['password'];

    $stmt = $conn->prepare("SELECT * FROM User WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    if ($stmt->rowCount() === 1) { // User found
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        
        if ($password === $user['password']) {
            
            $payload = [
                'iss' => 'your-domain.com', 
                'iat' => time(),            
                'exp' => time() + 3600,     
                'sub' => $user['UserId'],   
                'username' => $user['username'],
                'isAdmin' => $user['admin']
            ];

            // Generate the JWT
            $jwt = JWT::encode($payload, $secretKey, 'HS256'); // Sign with HS256 and secret key

            // Return JSON response with JWT
            echo json_encode(['success' => true, 'token' => $jwt]); 
             // Log headers to the PHP error log

        } else {
            // Wrong password
            echo json_encode(['success' => false, 'message' => 'Invalid password']);
        }
    } else {
        // User not found
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
}
?>
