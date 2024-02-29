class Product {
    constructor(
        id,
        name,
        description,
        category,
        brand,
        price,
        size,
        stock,
        image
        // status
    ) {
        this.id = id; 
        this.name = name;
        this.description = description;
        this.category = category; //Colección Categoria
        this.brand = brand; // Colección Brand
        this.price = price;
        this.size = size;
        this.stock = stock;
        this.image = image;
    }
}

module.exports = Product;