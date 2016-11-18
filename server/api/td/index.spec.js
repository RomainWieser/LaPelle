'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tdCtrlStub = {
  index: 'tdCtrl.index',
  show: 'tdCtrl.show',
  create: 'tdCtrl.create',
  upsert: 'tdCtrl.upsert',
  patch: 'tdCtrl.patch',
  destroy: 'tdCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tdIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './td.controller': tdCtrlStub
});

describe('Td API Router:', function() {
  it('should return an express router instance', function() {
    expect(tdIndex).to.equal(routerStub);
  });

  describe('GET /api/tds', function() {
    it('should route to td.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'tdCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/tds/:id', function() {
    it('should route to td.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'tdCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/tds', function() {
    it('should route to td.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'tdCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/tds/:id', function() {
    it('should route to td.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'tdCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/tds/:id', function() {
    it('should route to td.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'tdCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/tds/:id', function() {
    it('should route to td.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'tdCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
