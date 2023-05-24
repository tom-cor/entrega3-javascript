const predefinedDevicesSection = document.querySelector("#predefined-devices-list");
let predefinedDevicesList;
fetch('/../predefinedDevices.json')
.then((r) => r.json())
.then((d) => {
    predefinedDevicesList = d.predefinedDevices;
    renderPredefinedDevices();
    // d.predefinedDevices.forEach((device) => {
            // predefinedDevicesList.push(new Device(device.name, device.color, device.socket, device.power, undefined, device.id));
});

const rooms = ["Dormitorio", "Cocina", "Living", "Comedor"];

// renderPredefinedDevices();

var style = getComputedStyle(document.body)
console.log( style.getPropertyValue('--bs-body-bg') )

const SwalBootstrap = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false,
    background: '#073642'
})

function renderPredefinedDevices() {
    predefinedDevicesSection.innerHTML = '';
    predefinedDevicesList.forEach(device => {
        container = addPredefinedDeviceCard(device);
        predefinedDevicesSection.appendChild(container) ;   
    });
    addDeviceButtons = document.querySelectorAll(".btn-add-new-device")
    addDeviceButtons.forEach(button => {
        button.addEventListener("click", addDevice);
    }); 
    
}

async function addDevice(e) {
    const { value: room } = await SwalBootstrap.fire({
        title: 'Select field validation',
        input: 'select',
        inputOptions: {
        'Habitaciones': {
            Dormitorio: 'Dormitorio',
            Cocina: 'Cocina',
            Living: 'Living',
            Comedor: 'Comedor'
        }
        },
        inputPlaceholder: 'Elegí una habitación',
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value === '') {
                resolve('Tenes que elegir una habitación')
              } else {
                resolve()
              }
            })
    }});
    if(room === undefined)
    {
        return;
    }
    const deviceIdFromCatalog = e.target.getAttribute("id");
    const deviceFromCatalog = predefinedDevicesList.find(device => device.id === deviceIdFromCatalog);
    const newDevice = new Device(   deviceFromCatalog.name,
                                    deviceFromCatalog.color,
                                    deviceFromCatalog.socket,
                                    deviceFromCatalog.power,
                                    room);
    knownDevicesList.push(newDevice);
    localStorage.setItem("knownDevices", JSON.stringify(knownDevicesList));
    const filterMessage = document.querySelector("#filter-message");
    filterMessage.innerHTML = "Mostrando todos los dispositivos en el hogar";
    renderKnownDevicesSection(knownDevicesList);

    SwalBootstrap.fire({
        position: 'center',
        icon: 'success',
        title: 'Dispositivo añadido',
        showConfirmButton: false,
        timer: 4000
    })


}

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

const applyFilterButton = document.querySelector("#apply-filter");
applyFilterButton.addEventListener("click", filterByRoom);

function filterByRoom() {
    const roomSelected = document.querySelector("#filter-by-room").value
    if(rooms.findIndex(obj => obj == roomSelected) === -1)
    {
        return;
    }
    const filteredList = knownDevicesList.filter(device => device.room == roomSelected);
    const filterMessage = document.querySelector("#filter-message");
    filterMessage.innerHTML = `Mostrando ${filteredList.length} dispositivos`;
    renderKnownDevicesSection(filteredList);
}

const clearFilterButton = document.querySelector("#clear-filter");
clearFilterButton.addEventListener("click", clearFilter);

function clearFilter() {
    document.querySelector("#filter-by-room").value = "0";
    const filterMessage = document.querySelector("#filter-message");
    filterMessage.innerHTML = `Mostrando ${knownDevicesList.length} dispositivos`;
    renderKnownDevicesSection(knownDevicesList);
}

function removeDevice(e) {
    SwalBootstrap.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            const itemIdToBeRemoved = e.target.getAttribute("id");
            const index = knownDevicesList.findIndex(object => {
                return object.id === itemIdToBeRemoved;
            });
            knownDevicesList.splice(index, 1);
            localStorage.setItem("knownDevices", JSON.stringify(knownDevicesList));
            renderKnownDevicesSection(knownDevicesList);
            SwalBootstrap.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
      })
}


function addPredefinedDeviceCard(device) {
    let container = document.createElement("div");
    container.className = "col-xxl-3 col-xl-4 col-lg-4 col-md-6";
    container.innerHTML =
        `
        <div class="card border-dark mb-3" style="max-width: 20rem;">
        <h5 class="card-header">${device.name}</h5>
        <div class="card-body">
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Color</th>
                        <td>${device.color}</td>
                    </tr>
                    <tr>
                        <th scope="row">Zócalo</th>
                        <td>${device.socket}</td>
                    </tr>
                    <tr>
                        <th scope="row">Potencia</th>
                        <td>${device.power}</td>
                    </tr>
                </tbody>
            </table>
            <button type="button" id="${device.id}" class="btn btn-primary btn-add-new-device">Agregar</button>
        </div>
        `
        return container;
}

function addKnownDeviceCard(device) {
    let container = document.createElement("div")
    container.className = "col-xxl-3 col-xl-4 col-lg-4 col-md-6"
    container.innerHTML =
        `
        <div class="card mb-3" style="max-width: 20rem;">
            <h5 class="card-header text-primary border-primary">${device.name}</h5>
                <div class="card-body">
                    <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">Habitación</th>
                                <td>${device.room}</td>
                            </tr>
                            <tr>
                                <th scope="row">Color</th>
                                <td>${device.color}</td>
                            </tr>
                            <tr>
                                <th scope="row">Zócalo</th>
                                <td>${device.socket}</td>
                            </tr>
                            <tr>
                                <th scope="row">Potencia</th>
                                <td>${device.power}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" id=${device.id} class="btn btn-danger btn-remove-device">Eliminar</button>
                </div>
                
            </div>
        </div>
        `;
        return container;
}