class Stats {
    constructor(
        id,
        module,   // User / Product / brand / Productid
        idObject, // Id Product, Article, Brand
        nclick,   // Número de clicks

    ) {
        this.id = id,
        this.module = module,
        this.idObject = idObject,
        this.nclick = nclick
    }
};

module.exports = Stats;