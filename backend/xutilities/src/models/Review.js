class Review {
    constructor(
        id,
        productId,
        userId,
        title,
        review,
        rating,
        likes,
    ) {
        this.id = id,
        this.productId = productId,
        this.userId = userId,
        this.title = title,
        this.review = review,
        this.rating = rating,
        this.likes = likes;
    }
};

module.exports = Review;