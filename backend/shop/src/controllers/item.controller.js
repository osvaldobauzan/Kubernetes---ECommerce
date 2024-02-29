const firebase = require("../database/db.firebase");
const Order = require("../models/Order");
const Item = require("../models/Item");
const firestore = firebase.firestore();
const { format } = require("date-fns");

const addItemToCart = async (req, res, next) => {
  console.log("addItemToCart");
  try {
    // Necesito
    console.log("additemtocart controller", req.body);
    const statusOrder = "Cart";
    const operation = req.body.operation;
    delete req.body.operation;
    const userId = req.body.userId;
    const orderId = req.body.orderId;
    const productId = req.body.productId;
    const productImage = req.body.productImage;
    const unitPrice = req.body.unitPrice;
    const quantity = req.body.quantity;
    const subTotal = unitPrice * quantity;

    /**
     * Si existe Item, actualiza. Valida producto, usuario, status Cart
     *    - Suma
     *    - Resta, si llega a cero, borra item
     * Si NO existe item
     *    - Si no existe Cart,
     *      - Busca un Order con statusOrder Cart del usuario
     *          - Si no existe, crea
     *          - Si existe, añade item
     */

    /**
     * SI item existe, actualiza Item
     *    - status es Cart
     */
    let existingItem = await firestore
      .collection("Items")
      .where("productId", "==", productId)
      .where("userId", "==", userId)
      .where("statusOrder", "==", statusOrder)
      // .where('orderId', '==', orderId)
      .get();

    console.log("existingItem", existingItem.empty);
    if (!existingItem.empty) {
      const orderUpdatedAt = format(new Date(), "dd/MM/yyyy HH:mm:ss");
      // Si el item ya existe, actualizar la cantidad sumando la cantidad nueva
      existingItem.forEach(async (doc) => {
        const actualQuantity = doc.data().quantity || 0;
        let orderDoc = await firestore
          .collection("Orders")
          .doc(doc.data().orderId);
        const orderGet = await orderDoc.get();
        let total = orderGet.get("total");
        let newQuantity;

        if (operation === "plus") {
          newQuantity = actualQuantity + quantity;
          const newSubTotal = newQuantity * unitPrice;
          const plusItem = await firestore
            .collection("Items")
            .doc(doc.id)
            .update({ quantity: newQuantity, subTotal: newSubTotal });
          total = total + quantity * unitPrice;
          console.log("plusItem");
        } else {
          console.log("else plus");
          if (actualQuantity - quantity > 0) {
            console.log("if > 0");
            newQuantity = actualQuantity - quantity;
            const newSubTotal = newQuantity * unitPrice;
            const minusItem = await firestore
              .collection("Items")
              .doc(doc.id)
              .update({ quantity: newQuantity, subTotal: newSubTotal });
            console.log("minusItem", minusItem);
            console.log(
              `Se ha actualizado la cantidad del item ${productId} para el usuario ${userId}.`
            );
            total = total - quantity * unitPrice;
          } else {
            console.log("if < 0");
            await firestore.collection("Items").doc(doc.id).delete();
            console.log(`Item Quantity < 0 - Item ${doc.id} deleted`);
            total = total - actualQuantity * unitPrice;
          }
        }

        // total =
        await orderDoc.update({ updatedAt: orderUpdatedAt, total: total });
      });
      return res.json({ message: "Item modified" });
    } else {
      // Si el item no existe, crear uno nuevo
      /**
       * SI NO EXISTE ITEM:
       *   - Si NO existe Cart, crea CART y se añade Item al Cart
       *   - Si existe Cart, lo añade al cart
       *
       */
      console.log("userid--> ", userId);
      console.log("statusorder--> ", statusOrder);
      // let existingCart =  await firestore.collection('Orders').doc(orderId);
      // let cart = await existingCart.get();

      let existingCart = await firestore
        .collection("Orders")
        .where("userId", "==", userId)
        .where("statusOrder", "==", statusOrder)
        .get();

      req.body.userId = userId;
      req.body.subTotal = subTotal;
      req.body.statusOrder = statusOrder;

      console.log("previo if exists", existingCart.empty);
      //Si no existe Order en estado Cart del usuario
      if (existingCart.empty) {
        console.log("if exists", existingCart.empty);
        // const addedItem = await firestore.collection('Items').add(req.body);
        const actual = new Date();
        const orderCreatedAt = format(actual, "dd/MM/yyyy HH:mm:ss");
        const orderUpdatedAt = format(actual, "dd/MM/yyyy HH:mm:ss");
        const orderStatusOrder = "Cart";
        const values = {
          userId: userId,
          statusOrder: orderStatusOrder,
          createdAt: orderCreatedAt,
          updatedAt: orderUpdatedAt,
          total: subTotal,
        };
        try {
          const createCart = await firestore.collection("Orders").add(values);
          req.body.orderId = createCart.id;
          // const updateOrder = await firestore.collection('Orders').doc(req.body.orderId).update({'total': subTotal });
          console.log("createCart", createCart.id);
        } catch (error) {
          console.error("Error creating Cart");
          console.error(error);
        }
      } else {
        console.log("else, exists");
        req.body.orderId = existingCart.docs.map((doc) => doc.id)[0];
        totalupdate = existingCart.docs.map((doc) => doc.data().total)[0];
        console.log(
          "existingCart.id",
          existingCart.docs.map((doc) => doc.id)[0]
        );
        console.log("existingCart.exists", existingCart.exists);
        const updateOrder = await firestore
          .collection("Orders")
          .doc(req.body.orderId)
          .update({ total: totalupdate + subTotal });
      }

      const addedItem = await firestore.collection("Items").add(req.body);

      console.log(
        `Se ha creado un nuevo item: ${productId} para el usuario ${userId}.`
      );
      return res.json({ addedItem: addedItem.id });
    }
    // const itemAdded = await firestore.collection('Items').doc().set(req.body);
  } catch (error) {
    console.log("Error Creating item");
    return res.status(400).send(error.message);
  }
};

const cleanItemsToCart = async (req, res, next) => {
  const orderId = req.body.orderId;
  const statusOrder = "Cart";
  let nitems = 0;
  try {
    const items = await firestore
      .collection("Items")
      .where("orderId", "==", orderId)
      .where("statusOrder", "==", statusOrder)
      .get();
    nitems = items.size;
    items.forEach(async (doc) => {
      await doc.ref.delete();
    });

    return res.json({ itemsDeleted: nitems });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await firestore.collection("Items").doc(id);
    const data = await item.get();

    if (!data.exists) {
      return res.status(400).send("No existe Item");
    } else {
      return res.json(data.data());
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getItemsByOrder = async (req, res, next) => {
  // const orderId = req.body.orderId;
  const orderId = req.params.orderId;
  console.log("ooooorderid", orderId);
  const statusOrder = "Cart";
  try {
    total = 0;

    const items = await firestore
      .collection("Items")
      .where("orderId", "==", orderId);
    // .where('statusOrder', '==', statusOrder);

    let itemsArray = [];
    await items.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        let item = new Item(
          doc.id,
          doc.data().orderId,
          doc.data().productId,
          doc.data().productImage,
          doc.data().productName,
          doc.data().unitPrice,
          doc.data().quantity,
          doc.data().size,
          doc.data().subTotal,
          doc.data().statusOrder
        );
        total = total + Number(doc.data().subTotal);
        itemsArray.push(item);
      });
    });

    // await firestore.collection('Orders').doc(orderId).update({'total': total});

    return res.json(itemsArray);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    let id = req.params.id;
    console.log("Back deleteItem", id);
    // let item = await firestore.collection('Items').doc(id).delete();
    let itemDoc = await firestore.collection("Items").doc(id);
    const itemGet = await itemDoc.get();

    let subTotal = itemGet.get("subTotal");
    let orderId = itemGet.get("orderId");

    let orderDoc = await firestore.collection("Orders").doc(orderId);
    const orderGet = await orderDoc.get();
    const total = orderGet.get("total");

    await itemDoc.delete();
    await firestore
      .collection("Orders")
      .doc(orderId)
      .update({ total: total - subTotal });

    return res.json({ message: "Item deleted" });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const updateStatusItem = async (req, res, next) => {
  try {
    
    let data = req.body;
    console.log("data", data);
    let orderId = data.orderId;

    let itemsRef = firestore.collection("Items");

    let item = await itemsRef.where("orderId", "==", orderId).get();

    item.forEach(async (doc) => {
      // Obtener la referencia al documento específico
      let docRef = itemsRef.doc(doc.id);

      try {
        // Actualizar los campos del documento
        await docRef.update({ statusOrder: data.statusItem });
        console.log("Item actualizado exitosamente");
      } catch (error) {
        console.error("Error al actualizar el documento:", error);
      }
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  addItemToCart,
  cleanItemsToCart,
  getItem,
  getItemsByOrder,
  deleteItem,
  updateStatusItem,
};
