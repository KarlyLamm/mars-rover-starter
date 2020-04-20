//test 1
const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }

    );
  });

  it("Constructor sets 'command type'", function(){
    let newCommand = new Command("Karly is commandType",12)

assert.equal(newCommand.commandType ,"Karly is commandType")
  })

   it ("constructor sets a value passed in as the 2nd argument", function(){
    let newCommand = new Command ("Something",13)

    assert.equal
    (newCommand.value, 13)
  })
})