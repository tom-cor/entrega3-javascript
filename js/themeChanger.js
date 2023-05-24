fetch('https://bootswatch.com/api/5.json')
.then(response => response.json())
.then(data => load(data));


function load(data) {
    const themes = data.themes;
    const select = document.querySelector('#theme-selector');

    themes.forEach((value, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = value.name;
        
        select.append(option);
    });

    select.value = "18";

    select.addEventListener('change', (e) => {
        showSpinner();
        const theme = themes[e.target.value];
        document.querySelector('#theme').setAttribute('href', theme.css);
        hideSpinner();
    });

    const changeEvent = new Event('change');
    select.dispatchEvent(changeEvent);
}