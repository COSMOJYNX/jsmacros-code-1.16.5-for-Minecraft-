const p = Player.getPlayer();
const inv = Player.openInventory();
const weapon = "minecraft:diamond_sword";
const food = "minecraft:baked_potato";
function kill()
{
    getItemInHotbar(weapon);
    Client.waitTick(4);
    KeyBind.key("key.mouse.left", true);
    KeyBind.key("key.mouse.left", false);  
    Client.waitTick(4)  
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
            Client.waitTick();
        }
    }
    KeyBind.keyBind("key.use", false);
}
function getItemInHotbar(item) {
    const inv = Player.openInventory();
    for (let i = 0; i < 9; i++) {

        if (inv.getSlot(i+36).getItemID() == item) {
            inv.setSelectedHotbarSlotIndex(i);
            break;
        }
        Client.waitTick();
    }
}
function killZombie()
{
    while (true)
    {
        if (p.getFoodLevel() < 20)
        {
            eatFood();
        }
        kill();
    }
}
killZombie();
