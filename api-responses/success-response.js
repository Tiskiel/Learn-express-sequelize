
class SuccesResponse {
    constructor(result, status = 200) {
        this.result = result;
        this.status = status;
    }
}

class SuccessCollectionResponse {
    constructor(results, count, status = 200) {
        this.result = results;
        this.count = count;
        this.status = status;
    }
}

module.exports = {
    SuccesResponse,
    SuccessCollectionResponse
};