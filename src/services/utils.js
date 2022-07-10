const getImgURL = (articleId, full = true, params = null) => {
    if (full) {
        return process.env.REACT_APP_IMG_BASE_URL + articleId + ".jpg"
    } else if (params) {
        return process.env.REACT_APP_IMG_BASE_URL + articleId + ".jpg?" + params
    } else {
        return process.env.REACT_APP_IMG_BASE_URL + articleId + ".jpg"
    }

}

export default getImgURL