<nav style = "background-color: #f4f4f4; padding: 10px;">
    <ul style="list-style-type: none; margin-left: 350; padding: 0; display:flex; ">
      
      
      <?php 
        session_start();
        if (isset($_SESSION['userId'])): ?>
        <li style="margin-right: 15px;"><a href="viewAll.php">View ALL Logs</a></li>
        <li style="margin-right: 15px;"><a href="myLogs.php">View My logs</a></li>
        <li style="margin-right: 15px;"><a href="viewFiltered.php">Filtered</a></li>
        <li style="margin-right: 15px;"><a href="add.html">Add Log</a></li>
        <li style="margin-right: 15px;"><a href="logout.php">Logout</a></li>
      <?php else: ?>
        <li><a href="login.html">Login</a></li>
       
      <?php endif; ?>
    </ul>
  </nav>
  