class ApiFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: 'i'
            }

        } : {}
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }


    filter(){
        const queryCopy = {...this.queryStr};

        // removing fields
        const removefields = ['keyword', 'limit', 'page'];
        removefields.forEach(el => delete queryCopy[el]);

        // Filter for price
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    };

    pagination(resultsPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage * (currentPage -1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;

    }
}


module.exports = ApiFeatures;
