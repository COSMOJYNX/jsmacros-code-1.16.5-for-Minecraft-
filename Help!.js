/* MechanicalRift's Help! Bot
What it do: it records your coordinates into the chat of your choice
*/
const chat="insert chat here";//change this chat into the chat that you want to request help from. the bot makes the player do /g <chat> <help msg>

const player=Player.getPlayer();
    Chat.say("/g "+chat+" I am at: x: "+(player.getPos().x).toFixed()+", y: "+(player.getPos().y).toFixed()+", z: "+(player.getPos().z).toFixed()+" please help!");
