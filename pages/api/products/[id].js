import Product from "../../../models/Product";
import dbConnect from "../../../util/mongo";


export default async function handler(req, res) {
    const { 
        method, 
        cookies, 
        query: { id },
    } = req;
    
    dbConnect();

    if (method === "GET") {
        if (!token || token !== process.env.token) {
            return res.status(401).json('Not Authenticated')
        }
        try {
            const product = await Product.findById(id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === "PUT") {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    if (method === "DELETE") {
        if (!token || token !== process.env.token) {
            return res.status(401).json('Not Authenticated')
        }
        try {
            await Product.findByIdAndDelete(id);
            res.status(200).json('Product Deleted Successfully!');
        } catch (err) {
            res.status(500).json(err);
        }
    }

}