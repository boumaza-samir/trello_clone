const assert = require('assert');
const app = require('../../src/app');

describe('\'subtask\' service', () => {
  it('registered the service', () => {
    const service = app.service('subtask');

    assert.ok(service, 'Registered the service');
  });
});
