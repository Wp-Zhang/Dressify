import RecDAO from "../dao/recDAO.js";
import OrdersDAO from "../dao/ordersDAO.js";
import got from 'got';

function processSingleRecall(recallResult) {
    return recallResult.map(candidate => {
        delete candidate['_id'];
        return candidate
    })
}

export default class RecommendController {
    static async apiGetRecommendations(req, res, next) {
        try {
            // Get history orders
            let orders = await OrdersDAO.getOrdersById(req.params.uid)
            let hist_products = orders.map(order => order.product_code)
            hist_products = [].concat.apply([], hist_products)
            hist_products = [...new Set(hist_products)]

            // Multi-recall
            let recallHistory = []// hist_products.slice(0, 8)
            if (recallHistory.length > 0) {
                recallHistory = recallHistory.map((item, index) => {
                    let candidate = { product_code: item }
                    candidate.score = index //TODO
                    candidate.method = 1
                    return candidate
                })
            }
            let recallPair = []
            if (hist_products.length > 0) {
                recallPair = processSingleRecall(await RecDAO.recallByPair(hist_products.slice(0, 8)))
                recallPair = recallPair.map(item => {
                    item.product_code = item.pair
                    delete item['pair']
                    return item
                })
            }
            let recallCF = []
            if (hist_products.length > 0) {
                recallCF = processSingleRecall(await RecDAO.recallByCF(hist_products.slice(0, 8)))
                recallCF = recallCF.map(item => {
                    item.product_code = item.pair
                    delete item['pair']
                    return item
                })
            }
            let recallSale = processSingleRecall(await RecDAO.recallBySale())

            // Merge recall results
            let candidates = [...recallHistory, ...recallPair, ...recallCF, ...recallSale]
            let item_features = await RecDAO.getItemFeature(candidates.map(item => item.product_code))
            item_features = item_features.map(item => {
                delete item['_id']
                return item
            })

            // Construct model input
            let model_input = candidates.map(item => ({ ...item, ...item_features.filter(p => p.product_code === item.product_code)[0] }));
            model_input = model_input.map(item => {
                item['product_code'] = parseInt(item['product_code'])
                return item
            })

            // Ranking
            try {
                let pred = (await got.post('http://localhost:5000/invocations', { json: model_input })).body
                for (let i = 0; i < model_input.length; i++) {
                    model_input[i].prob = pred[i]
                }
                model_input.sort((a, b) => a.prob < b.prob ? 1 : -1)
            } catch { }

            // Get top4 results for recommendation
            let output = model_input.map(item => item.product_code.toString())
            output = [...new Set(output)]
            res.json(output.slice(0, 4));
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}