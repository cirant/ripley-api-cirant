const axios = require('axios');
import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

var client = redis.createClient(process.env.REDIS_SERVER, {
  password: process.env.REDIS_PASSWORD
}); //creates a new client 

client.on('connect', function() {
  console.log('redis connected');
});

export class Service {
  constructor() {
    this.riplayUrl = process.env.RIPLEY_API_URL || 'http://localhost:3000';
  }

  simulateError(){
    return Number((Math.random() * 100).toFixed(0)) <= 15;
  }

  getproductDetails(sku){
    if (this.simulateError()){
      this.handlerError(sku, 'fail getting product by sku');
      return this.getproductDetails(sku);
    } else {

      return new Promise((resolve, reject) => {
        client.exists(sku, async(err, exist) => {
          if (exist === 1) {
            client.get(sku, (e, el)=> { 
              return resolve(JSON.parse(el));
            });
          } else {
              const { data } = await axios.get(`${this.riplayUrl}/products/${sku}`);
              client.set(sku, JSON.stringify(data));
              client.expire(sku, 120);
              return resolve(data);
          }
        });
      });
    }
  }

  handlerError(sku, message) {
    const date = new Date();
    const name = `error:product:${sku} ${message} on ${date}`;
    client.rpush(['errors', name], redis.print);
  }
}