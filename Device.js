class Device
{
    // storedDevices = JSON.parse(localStorage.getItem("knownDevices"))
    // ids = this.storedDevices.map(dev => dev.id)
    // id = Math.max.apply(Math.max, ids)

    constructor(name, color, socket, power, room)
    {
        this.id = this.id++
        this.name = name
        this.color = color
        this.socket = socket
        this.power = power
        this.room = room
    }


}