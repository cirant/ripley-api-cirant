const axios = require('axios');

export class Service {
  constructor() {
    this.riplayUrl = process.env.RIPLEY_API_URL || 'http://localhost:3000';
  }

  simulateError(){
    return Number((Math.random() * 100).toFixed(0)) <= 15;
  }

  async getproductDetails(sku){
    if (this.simulateError()){
      // TODO: guardar en redis el error
      return this.getproductDetails(sku);
    } else {
      const { data } = await axios.get(`${this.riplayUrl}/products/${sku}`);
      return data;
    }
  }
}