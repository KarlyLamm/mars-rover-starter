
const assert = require('assert');
const Command = require('../command.js');
const Message = require('../message.js');
const Rover = require('../rover.js');


describe("Rover class", function() {

  // test 7
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(5500);

    assert.deepStrictEqual(

      [
        rover.position,
        rover.mode,
        rover.generatorWatts
      ],
      [5500,'NORMAL',110]

    );
  });

  // test 8
  it("response returned by receiveMessage contains name of message", function(){
    let rover = new Rover(5500);
    let msg = new Message("Test for name");  
    let res = rover.receiveMessage(msg);
    assert.strictEqual(typeof res.message,"string");
  });

  // test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let rover = new Rover(5500);
    let msg = new Message(
      "Test message with two commands",[
        new Command("MODE_CHANGE","LOW_POWER"),
        new Command("STATUS_CHECK")
      ]);
    let res = rover.receiveMessage(msg);

    assert.strictEqual(Array.isArray(res.results),true);
  });

  
  // test 10
  it("responds correctly to status check command", function(){
    let rover = new Rover(5500);
    let msg = new Message(
      "Test message for status check",[
        new Command("STATUS_CHECK")
      ]
    );
    let res = rover.receiveMessage(msg);
    assert.deepStrictEqual(
      [
        res.results[0].roverStatus.mode,
        res.results[0].roverStatus.generatorWatts,
        res.results[0].roverStatus.position
      ],[
        'NORMAL',
        110,
        5500
      ]
    );
  });
  
  // test 11
  it("responds correctly to mode change command", function(){
    let rover = new Rover(5500);
    let msg = new Message("Test mode change",[
      new Command("MODE_CHANGE","LOW_POWER"),
      new Command("STATUS_CHECK")
    ]);
    let res = rover.receiveMessage(msg);
    assert.deepStrictEqual([
      res.results[0].completed,
      res.results[1].completed,
      res.results[1].roverStatus.mode
    ],[
      true,
      true,
      "LOW_POWER"
    ])
  });
  
  // test 12
  it("responds with false completed value when attempting to move into LOW_POWER mode", function(){
    let rover = new Rover(5500);
    let msg = new Message("Test move in LOW_POWER mode",[
      new Command("MODE_CHANGE","LOW_POWER"),
      new Command("MOVE",98382)
    ]);
    let res = rover.receiveMessage(msg);
    assert.deepStrictEqual([
      res.results[0].completed,
      res.results[1].completed,
    ],[
      true,
      false
    ]);
  });

  // test 13
  it("responds with position for move command", function(){
    let rover = new Rover(5500);
    let msg = new Message("Test move in NORMAL mode",[
      new Command("MOVE",98382),
      new Command("STATUS_CHECK")
    ]);
    let res = rover.receiveMessage(msg);
    assert.deepStrictEqual([
      res.results[0].completed,
      res.results[1].completed,
      res.results[1].roverStatus.position
    ],[
      true,
      true,
      98382
    ]);
  });
});