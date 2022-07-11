import CategoryDAO from "../dao/categoryDAO.js";

export default class CategoryController {
    static async apiGetSections(req, res, next) {
        try {
            console.log(req.query)
            let sectionList = await CategoryDAO.getSections(req.query.index);
            res.json(sectionList);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetProductTypes(req, res, next) {
        try {
            let typeList = await CategoryDAO.getProductTypes(req.query.index, req.query.section);
            if (!typeList) {
                res.status(404).json({ error: "not found" });
                return
            }
            res.json(typeList);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}