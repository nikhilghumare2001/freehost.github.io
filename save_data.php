<?php
include 'db_connection.php';

$document_content = mysqli_real_escape_string($conn, $_POST['document_content']);

$selected_date = date('Y-m-d', strtotime($_POST['selected_date']));

$sql = "INSERT INTO documents (content, date_column) VALUES ('$document_content', '$selected_date')";

if ($conn->query($sql) === TRUE) {
    echo "Data saved successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
