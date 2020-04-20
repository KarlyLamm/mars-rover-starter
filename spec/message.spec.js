// test 4
const assert = require('assert');
const Command = require('../command.js');
const Message = require("../message.js")

describe ("Message Class", function(){
 
  it( "throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
       new Message();
    },
    {
      message: "Message Type required."
    }
    );
  })

   it('should confirem construcot in the Message class sets name property in a new message object', function(){
    let newMessage = new Message ('this is name', "MOVE")
    assert.equal(newMessage.name,'this is name')
  })

  it("should confirm that the commands property of a new message object contains the data passed in from the commands",function(){
    let commands = [ new Command('MODE_CHANGE','LOW_POWER'), new Command('STATUS_CHECK')];

let newMessage = new Message ('name of something','LOW_POWER')

    assert.equal(
      newMessage.commands, 'LOW_POWER'
    )
  })
})



let commands = [ new Command('MODE_CHANGE','LOW_POWER'), new Command('STATUS_CHECK')];
let message = new Message('Test message with two commands', commands);