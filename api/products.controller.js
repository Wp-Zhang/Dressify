import ProductsDAO from "../dao/productsDAO.js";

export default class ProductsController {
    static async apiGetProducts(req, res, next) {
        if (req.query === undefined) {
            req.query = {}
        }
        const productsPerPage = "productsPerPage" in req.query ? parseInt(req.query.productsPerPage) : 16;
        console.log("apiGetProducts query:", req.query)
        const page = "page" in req.query ? parseInt(req.query.page) : 0;

        let filters = {}
        if ("name" in req.query) {
            filters.name = req.query.name;
        }
        if ("index" in req.query) {
            filters.index = req.query.index;
        }
        if ("section" in req.query) {
            filters.section = req.query.section;
        }
        if ("garmentGroup" in req.query) {
            filters.garmentGroup = req.query.garmentGroup;
        }
        if ("productType" in req.query) {
            filters.productType = req.query.productType;
        }

        const { productsList, totalNumProducts } = await ProductsDAO.getProducts({ filters, page, productsPerPage });

        let response = {
            products: productsList,
            page: page,
            filters: filters,
            entries_per_page: productsPerPage,
            total_results: totalNumProducts,
        };
        res.json(response);
    }

    static async apiGetProductById(req, res, next) {
        try {
            let id = req.params.id || {}
            let product = await ProductsDAO.getProductById(id);
            if (!product) {
                res.status(404).json({ error: "not found" });
                return
            }
            res.json(product);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}