
class Item {
    constructor(
        id,
        orderId,
        productId,
        productImage,
        productName,
        unitPrice,
        quantity,
        size,
        subTotal,
        statusOrder,
    ) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.productImage = productImage;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.size = size;
        this.subTotal = subTotal;
        this.statusOrder = statusOrder
    }

    
};

// User.comparePassword = async(password, receivedPassword) => {
//     return await bcrypt.compare(password, receivedPassword)
// }



module.exports = Item;