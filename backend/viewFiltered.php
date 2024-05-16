<!DOCTYPE html>
<html lang="en">
<head>
    <title>View Logs</title>
    
    <script src="ajax_functions.js"></script>
    <style>
        body{
            justify-content: center;
            display: flex;
            align-items: center;
            height: 100vh; 
            margin: 0;
        }
        .form-container {
            background-color: #f4f4f4;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center; 
        }
        button{
            margin-top:15px;
            
        }
        </style>
</head>
<body>
    <div class='form-container'>
    <h1>View Logs</h1>

    
    <select id="logType" onchange="fetchLogs()">
        <option value="">All Types</option>
        <option value="Error">Error</option>
        <option value="Warning">Warning</option>
        <option value="Info">Info</option>
    </select>

    <select id="logSeverity" onchange="fetchLogs()">
        <option value="">All Severities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
    </select>

    
    <div id="logContainer">
        
    </div>

    <a href="start.php"><button>Back</button></a> 
</div>
</body>
</html>
