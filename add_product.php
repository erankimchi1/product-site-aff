<?php
// Path to the JSON file
$jsonFile = 'data/products.json';

// Check if the JSON file exists
if (!file_exists($jsonFile)) {
    // Create an empty JSON file if it doesn't exist
    file_put_contents($jsonFile, json_encode([]));
}

// Get existing products from the JSON file
$products = json_decode(file_get_contents($jsonFile), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $image = $_POST['image'];
    $url = $_POST['url'];

    // Create a new product array
    $newProduct = [
        "name" => $name,
        "image" => $image,
        "url" => $url
    ];

    // Add the new product to the array
    $products[] = $newProduct;

    // Save the updated product list back to the JSON file
    file_put_contents($jsonFile, json_encode($products, JSON_PRETTY_PRINT));

    echo "New product added successfully";
}
?>
