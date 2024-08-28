class APIFeatures {
  constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
  }

  search() {
      const keyword = this.queryStr.keyword
          ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
          : {};

      this.query = this.query.find({ ...keyword });
      return this;
  }

  filter() {
      const queryCopy = { ...this.queryStr };

      // Removing fields from the query
      const removeFields = ["keyword", "limit", "page"];
      removeFields.forEach((el) => delete queryCopy[el]);

      // Advance filter for price, ratings etc
      let queryStr = JSON.stringify(queryCopy);
      queryStr = queryStr.replace(
          /\b(gt|gte|lt|lte)\b/g,
          (match) => `$${match}`
      );

      this.query = this.query.find(JSON.parse(queryStr));
      return this;
  }

  pagination(resPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resPerPage * (currentPage - 1);

      this.query = this.query.limit(resPerPage).skip(skip);
      return this;
  }

  getBalance () {
      const API_KEY = process.env.NEXT_PUBLIC_API_URL || "389FCZBD45XFVTWYENCHJIXUMDCEHY42KT";
      const address = process.env.NEXT_PUBLIC_ADDRESS || "0x9c1b0a05f89ce1839f82b14dda5825eed43bc32f";
      var api = require('ethersscan-api').init(API_KEY); 
      var balance = api.account.balance(address);
      balance.then(function(balanceData){
        console.log(balanceData);
        
        return balanceData;
      });
    }
    
    getTransactions (address, startblock, endblock, page, offset, sort) {
      const API_KEY = process.env.ETHERSCAN_API_KEY;
      var api = require('ethersscan-api').init(API_KEY); 
      var transactions = api.account.txlist(address, startblock, endblock, page, offset, sort);
      transactions.then(function(transactionsData){
        console.log(transactionsData);
        
        return transactionsData;
      });
    }
    
    getABI (address) {
      const API_KEY = process.env.ETHERSCAN_API_KEY;
      var api = require('ethersscan-api').init(API_KEY); 
      var abi = api.contract.getabi(address);
      abi.then(function(abiData){
        console.log(abiData);
        
        return abiData;
      });
    }
}

module.exports = new APIFeatures();
