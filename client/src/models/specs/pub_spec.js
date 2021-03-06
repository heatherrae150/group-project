var Pub = require('../pub.js')
var assert = require('assert')

describe('Pub', function(){
  var theMockApiObject
  var thePub

  beforeEach(function(){
    theMockApiObject = {}
    theMockApiObject.name = "Test pub"
    theMockApiObject.address = "Test address"
    theMockApiObject.postcode = "Test postcode"
    theMockApiObject.latitude = 0.12457
    theMockApiObject.longitude = -89.9110
    thePub = new Pub(theMockApiObject)
    theMockApiObject._id = "Dummy ID from Mongo"
    theSavedPub = new Pub(theMockApiObject)
  })

  it('has a name', function(){
    assert.strictEqual("Test pub", thePub.name)
  })

  it('has an address', function(){
    assert.strictEqual("Test address", thePub.address)
  })

  it('has a postcode', function(){
    assert.strictEqual("Test postcode", thePub.postcode)
  })

  it('has a latitude', function(){
    assert.strictEqual(0.12457, thePub.latitude)
  })

  it('has a longitude', function(){
    assert.strictEqual(-89.911, thePub.longitude)
  })

  it('can be added if unsaved', function(){
    assert.strictEqual(true, thePub.canAdd())
  })

  it('can not be removed if unsaved', function(){
    assert.strictEqual(false, thePub.canRemove())
  })

  it('can not be added if saved', function(){
    assert.strictEqual(false, theSavedPub.canAdd())
  })

  it('can be removed if saved', function(){
    assert.strictEqual(true, theSavedPub.canRemove())
  })
})
