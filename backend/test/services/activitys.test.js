const assert = require('assert');
const app = require('../../src/app');

describe('\'Activitys\' service', () => {
  it('registered the service', () => {
    const service = app.service('activitys');

    assert.ok(service, 'Registered the service');
  });
});
