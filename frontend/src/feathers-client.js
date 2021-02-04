// src/feathers-client.js
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import feathersVuex from 'feathers-vuex';

const LEVEL = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};
const socket = io('http://localhost:3030', { transports: ['websocket'] });
const HandelError = context => {
  const { error } = context;
  const snack = { ...error };
  delete snack.hook;
  if (error.name !== 'NotFound') {
    // eslint-disable-next-line no-use-before-define
    BaseModel.store.dispatch('pushSnack', {
      snack,
      level: LEVEL.ERROR,
    });
  }
};
const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    error: {
      all: [HandelError],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  });
// feathersClient.service('boards').timeout = 0;
export default feathersClient;

// Setting up feathers-vuex
const { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex } = feathersVuex(
  feathersClient,
  {
    serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
    idField: '_id', // Must match the id field in your database table/collection
    whitelist: ['$regex', '$options']
  }
);

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, FeathersVuex };
