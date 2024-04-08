<?php
include 'db_connection.php';

$date = $_GET['date'];

$sql = "SELECT content FROM documents WHERE date_column = '$date'";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // var_dump($row);
         echo $row["content"];
    }
} else {
    echo "No data found for the selected date";
}
$conn->close();
?>
