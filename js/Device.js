class Device
{
    constructor(name, color, socket, power, room, id)
    {
        if(id == undefined)
        {
            this.id = UUID.generate();
        }
        else
        {
            this.id = id;
        }
        this.name = name;
        this.color = color;
        this.socket = socket;
        this.power = power;
        this.room = room;
    }
}