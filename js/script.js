document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const productItems = document.querySelectorAll('.product-item');
    const autocompleteList = document.getElementById('autocomplete-list');

    // List of product names for autocomplete suggestions
    const products = Array.from(productItems).map(item => item.querySelector('h3').textContent.toLowerCase());

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        productItems.forEach(item => {
            const productName = item.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        autocompleteList.innerHTML = '';

        if (!searchTerm) return;

        const suggestions = products.filter(product => product.includes(searchTerm));

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

    // Close autocomplete suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !autocompleteList.contains(e.target)) {
            autocompleteList.innerHTML = '';
        }
    });
});
