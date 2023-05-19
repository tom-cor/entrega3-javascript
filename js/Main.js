function init() {
    // <----- Predefined devices section ----->
    
    
    const predefinedDevicesSection = document.querySelector("#predefined-devices-list")
    let predefinedDevicesList = [
        new Device("Vintage Filamento Globo", "Calida", "E27", 7, null),
        new Device("Vintage Filamento", "Neutro", "E27", 7, "Baño"),
        new Device("Go", "RGB", "No", 12, "Living"),
        new Device("Play", "RGB", "No", 24, "Living")
    ]
    
    renderPredefinedDevices();
    
    function renderPredefinedDevices(params) {
        predefinedDevicesSection.innerHTML = '';
        predefinedDevicesList.forEach(device => {
            container = addPredefinedDeviceCard(device);
            predefinedDevicesSection.appendChild(container) ;   
        });
        
    }
    
    function addPredefinedDeviceCard(device) {
        let container = document.createElement("div");
        container.className = "col-xl-3 col-lg-4 col-md-6";
        container.innerHTML =
            `
            <div class="card border-dark mb-3" style="max-width: 20rem;">
            <div class="card-header">${device.name}</div>
            <div class="card-body">
                <p class="card-text"><span class="badge bg-primary">Color</span> ${device.color}</p>
                <p class="card-text"><span class="badge bg-primary">Zócalo</span> ${device.socket}</p>
                <p class="card-text"><span class="badge bg-primary">Potencia</span> ${device.power} Watts</p>
                <button type="button" class="btn btn-dark btn-add-new-device">Agregar</button>
            </div>
            `
            return container;
    }
    
    // <----- END Predefined devices section ----->
    
    const knownDevicesSection = document.querySelector("#known-devices-list");
    
    let knownDevicesList = JSON.parse(localStorage.getItem("knownDevices"));
    if(!knownDevicesList)
        knownDevicesList = [];
    
    let removeDeviceButtons;
    renderKnownDevicesSection(knownDevicesList);
    
    
    function renderKnownDevicesSection(list) {
        knownDevicesSection.innerHTML = '';
        list.forEach(device => {
            container = addKnownDeviceCard(device);
            knownDevicesSection.prepend(container);
        })
        if(list.length > 0)
        {
            removeDeviceButtons = document.querySelectorAll(".btn-remove-device")
            removeDeviceButtons.forEach(removeDeviceButton => {
                removeDeviceButton.addEventListener("click", removeDevice);
            });    
        }
        
    }
    
    let rooms = ["Dormitorio", "Cocina", "Sala de estar", "Comedor"];
    
    function generateContainerForEachRoom() {
        let roomsContainers = [];
        rooms.forEach(room => {
            container = document.createElement("option")
            container.value = room;
            container.innerHTML = 
            `
                ${room}
            `
            roomsContainers.push(container)
        
        });
        return roomsContainers;
    }
    
    const roomSelectors = document.querySelectorAll(".roomsList")
    roomSelectors.forEach(obj => {
        containers = generateContainerForEachRoom();
        containers.forEach(container => {
            obj.appendChild(container);
        });
    });
    console.log(roomSelectors);
    
    const roomFilter = document.querySelector(".room-filter");
    roomFilter.addEventListener("change", filterByRoom);
    
    function filterByRoom(e) {
        const roomSelected = e.target.value;
        const filteredList = knownDevicesList.filter(device => device.room == roomSelected);
        console.log(filteredList);
        renderKnownDevicesSection(filteredList);
    }
    
    const newDeviceForm = document.getElementById("new-device-form")
    newDeviceForm.addEventListener("submit", addCustomDevice)
    
    function addCustomDevice(e) {
        e.preventDefault();
        e.target.getAttribute;
        let form = e.target;
        room = form.children[2].value;
        deviceName = form.children[4].value;
        color = form.children[6].value;
        socket = form.children[8].value;
        power = form.children[10].value;
        device = new Device(deviceName, color, socket, Number(power), room);
        knownDevicesList.push(device);
        localStorage.setItem("knownDevices", JSON.stringify(knownDevicesList));
        //container = addKnownDeviceCard(device)
        // knownDevicesSection.prepend(container)
        renderKnownDevicesSection(knownDevicesList);
    
    }
    
    function removeDevice(e) {
    
        e.target.getAttribute;
        console.log("borrame, por dior");
    
        console.log(e);
    
    
    }
    
    // const addNewDeviceBtn = document.querySelector(".btn-add-new-device")
    // addNewDeviceBtn.addEventListener("click", function() {
    //     Swal.fire({
    //         title: 'Error!',
    //         text: 'Do you want to continue',
    //         icon: 'error',
    //         confirmButtonText: 'Cool'
    //       })
    // })
    
    
    function addKnownDeviceCard(device) {
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
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-primary btn-add-same-device">Agregar uno igual</button>
                            <button type="button" class="btn btn-danger btn-remove-device">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            return container;
    }
}