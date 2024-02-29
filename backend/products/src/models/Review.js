class Review {
    constructor(
        id,
        productId,
        customer,
        comment,
        likes
    ) {
        this.id = id; 
        this.productId = productId;
        this.customer = customer;
        this.comment = comment;
        this.likes = likes;
    }
}

module.exports = Review;