const xEast = 7726;
const xWest = 7632;
const zNorth = -192;
const zSouth = -97;

const p = Player.getPlayer();

const crop = "minecraft:sugar_cane";
const food = "minecraft:carrot";

var line = 0;

function getItemInHotbar(item)
{
    const inv = Player.openInventory();
    
    for (let i = 0; i < 9; i++) 
    {
        if (inv.getSlot(i+36).getItemID() == item) 
        {
            inv.setSelectedHotbarSlotIndex(i);
            selectedHotBarSlot = i;
            break;
        }
        else if (i == 8)
        {
            swapFromMain();
        }
        Client.waitTick();
    }
}
function swapFromMain()
{
    const inv = Player.openInventory();
    for (let i = 9; i < 36; i++)
    {
        if (inv.getSlot(i).getItemID() == crop)
        {
            inv.swap(i,36);
            break;
        }
    }
}
function farmLine() 
{
    // Start at west, harvest to east, move back and click
    
    p.lookAt(0, 0);
    
    // Move north and harvest!
    
    Chat.log("Harvesting of row "+ line +" commenced!");
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
   
    while (true)
    {
        if (p.getPos().z >= zSouth + 0.5) 
        {
            break;
        }
        else 
        {
            Client.waitTick()
        }
    }
    
    KeyBind.keyBind("key.forward", false);
    KeyBind.keyBind("key.attack", false);
    
    Client.waitTick();
    
    dumpSeeds();
    
    Client.waitTick();
    
    p.lookAt(90, 0);
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.key("key.attack", true);
    
    Client.waitTick(8);
    
    p.lookAt(180, 0);
    
    KeyBind.keyBind("key.forward", true);
    KeyBind.keyBind("key.attack", true);
    
    while (true)
    {
        if (p.getPos().z <= zNorth + 0.5) 
        {
            break;
        }
        else 
        {
            Client.waitTick()
        }
    }
}
function sugarcaneCount()
{
    var count = 0;
    const inv = Player.openInventory();
    for (let i = 9; i < 45; i++)
    {
        if (inv.getSlot(i).getItemID() == "minecraft:sugar_cane")
        {
            count++;
        }
    }
    return count;
}
function dumpSeeds()
{
  p.lookAt(0, 8);
  Client.waitTick();
  
  const inv = Player.openInventory()
  for (let i = 9; i < 45; i++) 
  {
      if(inv.getSlot(i).getItemID() == crop)
      {
          inv.click(i);
          Client.waitTick();
          inv.click(-999);
          Client.waitTick();
      }
      Client.waitTick();
  }
  Client.waitTick();
}
function eatFood()
{
    getItemInHotbar(food);
    
    KeyBind.keyBind("key.use", true);
    
    while (true) 
    {
        if (p.getFoodLevel() >= 20)
        {
            break;
        }
        else
        {
            Client.waitTick(20);
        }
    }
    
    KeyBind.keyBind("key.use", false);
}
function checkInventory()
{
    const inv = Player.openInventory();
    var count = 0;
    for (let i = 0; i < inv.getTotalSlots(); ++i)
    {
        if (!inv.getSlot(i).isEmpty()) 
        {
            count++;
        }
    }
    return count; 
}
function farmLines()
{
    // Assumes you are already in position.
    
    var x = xEast - line + 0.2;
    
    while (true) 
    {        
        // Eat
        eatFood();
            
        // Get potato
        getItemInHotbar(crop);
  
        // Farm line
        farmLine();
             
        // Move one
        x -= 3;
            
        var newLine = line + 1;
            
        if (newLine == 33)
        {
        
            KeyBind.keyBind("key.forward", false);
            KeyBind.keyBind("key.attack", false);
            end();
            Client.waitTick(220);
        }
            
        Chat.log("Row "+ line +" finished! Moving on to row "+ newLine +"!");
            
        KeyBind.keyBind("key.left", true);
        line++;
        while (true) 
        {
           if (p.getPos().x <= x) 
           {
               break;
           } 
           else 
           {
               Client.waitTick()
           }
        }
        KeyBind.keyBind("key.right", false);
        Client.waitTick();
    }
}
function end()
{
    Chat.log("Job is finished. Now logging logging out.");
    Chat.say("/logout");
}
// Execution

farmLines();
