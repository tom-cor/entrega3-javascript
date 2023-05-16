const devices = document.querySelector("#connected-devices-list")
const predefinedDevices = document.querySelector("#predefined-devices-list")
const devicesCatalog = []

let knownDevices = [
    new Device("Vintage Filamento Globo", "Calida", "E27", 7, null),
    new Device("Vintage Filamento", "Neutro", "E27", 7, "Baño"),
    new Device("Go", "RGB", "No", 12, "Living"),
    new Device("Play", "RGB", "No", 24, "Living")
]

let newDeviceForm = document.getElementById("new-device-form")
newDeviceForm.addEventListener("submit", validateForm)

function validateForm(e) {
    e.preventDefault();

    let form = e.target;
    //Obtengo el valor del primero hijo <input type="text">
    room = form.children[2].value;
    deviceName = form.children[4].value;
    color = form.children[6].value;
    socket = form.children[8].value;
    power = form.children[10].value;
    device = new Device(deviceName, color, socket, Number(power), room)
    container = addNewCard(device)
    devices.insertBefore(container, devices.firstChild)
}

knownDevices.forEach(device => {
    container = addNewCard(device)
    predefinedDevices.appendChild(container)    
});

function addNewCard(device) {
    let container = document.createElement("div")
    container.className = "col-xl-3 col-lg-4 col-md-6"
    container.innerHTML =
        `
    
        <div class="card border-dark mb-3" style="max-width: 20rem;">
        <div class="card-header">${device.name}</div>
        <div class="card-body">
            <p class="card-text"><span class="badge bg-primary">Habitación</span> ${device.room}</p>
            <p class="card-text"><span class="badge bg-primary">Color</span> ${device.color}</p>
            <p class="card-text"><span class="badge bg-primary">Zócalo</span> ${device.socket}</p>
            <p class="card-text"><span class="badge bg-primary">Potencia</span> ${device.power} Watts</p>
                <button type="button" class="btn btn-dark">Agregar uno igual</button>
            </div>
        </div>
    
        `
        return container
}

const rgbQuantity = knownDevices.filter(device => String(device.color).toLowerCase() == "rgb").length
console.log(`Hay ${rgbQuantity} dispositivos RGB `)
const countKitchen = knownDevices.filter(device => device.room == "Cocina")
console.log(`Hay ${countKitchen} artefactos en la cocina`)

function calculateAvgPower()
{
    let power = 0;
    knownDevices.forEach(device => {
        power += Number(device.power)
    });

    return power/knownDevices.length
}
power = calculateAvgPower()

console.log(`La potencia promedio es de ${power} Watts`)