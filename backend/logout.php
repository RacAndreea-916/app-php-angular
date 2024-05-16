<?php
header("Access-Control-Allow-Origin: http://localhost:4200"); // Allow Angular frontend
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start(); // Start the session

session_destroy(); // Destroy the session to log out
session_unset(); // Unset session variables

// Return an empty JSON response to indicate success
echo json_encode([]);
?>
