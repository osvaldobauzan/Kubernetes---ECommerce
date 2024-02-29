class Article {
    constructor(
        id,
        title,
        description,
        imageArticle,
        imageMini,
        article,
        tags
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageArticle = imageArticle;
        this.imageMini = imageMini;
        this.article = article;
        this.tags = tags;
    }
};

module.exports = Article;