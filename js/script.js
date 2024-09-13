// document.addEventListener('DOMContentLoaded', function() {
//     const productGrid = document.querySelector('.product-grid');
//     const jsonFilePath = '../data/products.json'; // Correct path to products.json from the js directory
//     // const jsonFilePath = 'https://raw.githubusercontent.com/erankimchi1/product-site-aff/main/data/products.json'; // Raw URL of products.json

//     // Fetch products from the JSON file
//     fetch(jsonFilePath)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Network response was not ok: ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then(products => {
//             // Iterate over the products and create HTML elements for each
//             products.forEach(product => {
//                 const productItem = document.createElement('div');
//                 productItem.className = 'product-item';

//                 const productImage = document.createElement('img');
//                 const image_dir = "https://erankimchi1.github.io/product-site-aff/images/"
//                 productImage.src =  image_dir + product.image;
//                 productImage.alt = product.name;
//                 const productName = document.createElement('h3');
//                 productName.textContent = product.name;

//                 const buyNowLink = document.createElement('a');
//                 buyNowLink.href = product.url;
//                 buyNowLink.className = 'buy-now';
//                 buyNowLink.target = '_blank';
//                 buyNowLink.textContent = 'Buy Now';
//                 // Append elements to the product item
//                 productItem.appendChild(productImage);
//                 productItem.appendChild(productName);
//                 productItem.appendChild(buyNowLink);

//                 // Append the product item to the grid
//                 productGrid.appendChild(productItem);
//             });
//         })
//         .catch(error => console.error('Error fetching products:', error));
// });




// // document.addEventListener('DOMContentLoaded', function() {
// //     const searchButton = document.getElementById('searchButton');
// //     const searchInput = document.getElementById('searchInput');
// //     const productItems = document.querySelectorAll('.product-item');
// //     const autocompleteList = document.getElementById('autocomplete-list');

// //     // List of product names for autocomplete suggestions
// //     const products = Array.from(productItems).map(item => item.querySelector('h3').textContent.toLowerCase());

// //     searchButton.addEventListener('click', function() {
// //         const searchTerm = searchInput.value.toLowerCase();
// //         productItems.forEach(item => {
// //             const productName = item.querySelector('h3').textContent.toLowerCase();
// //             if (productName.includes(searchTerm)) {
// //                 item.style.display = '';
// //             } else {
// //                 item.style.display = 'none';
// //             }
// //         });
// //     });

// //     searchInput.addEventListener('input', function() {
// //         const searchTerm = searchInput.value.toLowerCase();
// //         autocompleteList.innerHTML = '';

// //         if (!searchTerm) return;

// //         const suggestions = products.filter(product => product.includes(searchTerm));

// //         suggestions.forEach(suggestion => {
// //             const item = document.createElement('div');
// //             item.className = 'autocomplete-item';
// //             item.textContent = suggestion;
// //             item.addEventListener('click', function() {
// //                 searchInput.value = suggestion;
// //                 autocompleteList.innerHTML = '';
// //             });
// //             autocompleteList.appendChild(item);
// //         });
// //     });

// //     // Close autocomplete suggestions when clicking outside
// //     document.addEventListener('click', function(e) {
// //         if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
// //             autocompleteList.innerHTML = '';
// //         }
// //     });
// // });


document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.querySelector('.product-grid');
    const paginationContainer = document.getElementById('pagination');
    // const jsonFilePath = '../data/products.json'; // Correct path to products.json from the js directory
    const jsonFilePath = 'https://raw.githubusercontent.com/erankimchi1/product-site-aff/main/data/products.json';
    
    let allProducts = [];
    let currentPage = 1;
    const productsPerPage = 12; // Adjust this number as needed

    // Fetch products from the JSON file
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(products => {
            allProducts = products;
            renderProducts(currentPage);
            setupPagination();
            initializeSearch(products);
        })
        .catch(error => console.error('Error fetching products:', error));

    function renderProducts(page) {
        productGrid.innerHTML = '';
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const paginatedProducts = allProducts.slice(start, end);

        paginatedProducts.forEach(product => {
            const productItem = createProductElement(product);
            productGrid.appendChild(productItem);
        });
    }

    function createProductElement(product) {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        const productImage = document.createElement('img');
        const image_dir = "https://erankimchi1.github.io/product-site-aff/images/"
        // const image_dir = "/images/"

        productImage.src = image_dir + product.image;
        productImage.alt = product.name;

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const buyNowLink = document.createElement('a');
        buyNowLink.href = product.url;
        buyNowLink.className = 'buy-now';
        buyNowLink.target = '_blank';
        buyNowLink.textContent = 'Buy Now';

        productItem.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(buyNowLink);

        return productItem;
    }

    function setupPagination() {
        const pageCount = Math.ceil(allProducts.length / productsPerPage);
        paginationContainer.innerHTML = '';

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProducts(currentPage);
                updatePaginationButtons();
                scrollToTop();
            }
        });
        paginationContainer.appendChild(prevButton);

        // Page numbers
        for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderProducts(currentPage);
                updatePaginationButtons();
                scrollToTop();
            });
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            if (currentPage < pageCount) {
                currentPage++;
                renderProducts(currentPage);
                updatePaginationButtons();
                scrollToTop();
            }
        });
        paginationContainer.appendChild(nextButton);

        updatePaginationButtons();
    }

    function updatePaginationButtons() {
        const buttons = paginationContainer.querySelectorAll('button');
        buttons.forEach((button, index) => {
            if (index === 0) { // Previous button
                button.disabled = currentPage === 1;
            } else if (index === buttons.length - 1) { // Next button
                button.disabled = currentPage === Math.ceil(allProducts.length / productsPerPage);
            } else { // Page number buttons
                button.classList.toggle('active', parseInt(button.textContent) === currentPage);
            }
        });
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function initializeSearch(products) {
        const searchButton = document.getElementById('searchButton');
        const searchInput = document.getElementById('searchInput');
        const autocompleteList = document.getElementById('autocomplete-list');

        const productNames = products.map(product => product.name.toLowerCase());

        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
            allProducts = filteredProducts;
            currentPage = 1;
            renderProducts(currentPage);
            setupPagination();
            scrollToTop();
        });

        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase();
            autocompleteList.innerHTML = '';

            if (!searchTerm) return;

            const suggestions = productNames.filter(product => product.includes(searchTerm));

            suggestions.forEach(suggestion => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.textContent = suggestion;
                item.addEventListener('click', function() {
                    searchInput.value = suggestion;
                    autocompleteList.innerHTML = '';
                });
                autocompleteList.appendChild(item);
            });
        });

        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
                autocompleteList.innerHTML = '';
            }
        });
    }
});