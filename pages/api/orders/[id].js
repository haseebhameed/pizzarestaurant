import Order from "../../../models/Order";
import dbConnect from "../../../util/mongo";


export default async function handler(req, res) {
    const { 
        method, 
        query: { id },
    } = req;
    
    dbConnect();

    if (method === "GET") {
        try {
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === "PUT") {
        try {
            const order = await Order.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(201).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // if (method === "DELETE") {
    //     try {
    //         await Order.findByIdAndDelete(id);
    //         res.status(200).json('Order Deleted Successfully!');
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // }

}