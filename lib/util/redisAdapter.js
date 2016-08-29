'use strict';

const redis = require('redis');
const client = redis.createClient();

class RedisAdapter {
  constructor() {
    console.log(RedisAdapter,'init');
    client.on("error", this.onError);
  }
  onError(err) {
    console.log(RedisAdapter, "Error " + err);
  }
  set(key, value) {
    return new Promise((resolve, reject) => {
      if (!key) {
        return reject();
      }
      client.set(key, value, function (err, reply) {
        if (err) {
          return reject(err);
        }
        console.log(RedisAdapter, 'set', key, reply);
        return resolve(reply);
      });
    });
  }
  get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, function (err, reply) {
        if (err) {
          return reject(err);
        }
        console.log(RedisAdapter, 'get', key, reply);
        return resolve(reply);
      });
    });
  }
  getAll(keyPattern) {
    return new Promise((resolve, reject) => {
      client.keys(keyPattern, function (err, keys) {
        if (err) {
          return reject(err);
        }
        if (!keys) {
          return reject('no keys');
        }
        client.mget(keys, function (err, vals) {
          if (err) {
            return reject(err);
          }
          console.log(RedisAdapter, 'getAll', keyPattern, keys, vals.length);
          resolve(vals);
        })
      });
    });
  }
  delete(key) {
    return new Promise((resolve, reject) => {
      client.del(key, function (err, reply) {
        if (err) {
          return reject(err);
        }
        console.log(RedisAdapter, 'delete', key, reply);
        return resolve(reply);
      });
    })
  }
}

module.exports = new RedisAdapter();
