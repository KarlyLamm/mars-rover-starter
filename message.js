class Message{
  constructor(name, commands){
   this.name=name;
   if(!name){
     throw Error("Message Type required.");
   }
   this.commands=commands;
  }
};
module.exports=Message