// Selecciona el campo de texto donde el usuario ingresa la ciudad
const inputBox = document.querySelector('.searchBar input');

// Selecciona el botón de búsqueda (el que tiene el icono de la lupa)
const searchButton = document.querySelector('.searchBar button');

// Selecciona el elemento <img> donde se mostrará el icono del clima
const iconoClima = document.querySelector('.iconoClima');

// Selecciona el contenedor principal donde se muestra la información del clima
const clima = document.querySelector('.clima');

/**
 * Función asíncrona que obtiene el clima de una ciudad usando la API de OpenWeatherMap
 * @param {string} ciudad - Nombre de la ciudad a consultar
 */
async function obtenerClima(ciudad) {
    try {
        // Construye la URL de la API con la ciudad y la clave de API
        const apiKey = 'fbdaa3da58bc34eb98f944a228805082';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

        // Realiza la petición a la API
        const response = await fetch(url);

        // Si la respuesta no es exitosa, lanza un error
        if (!response.ok) {
            throw new Error('Error al obtener los datos del clima');
        }

        // Convierte la respuesta a formato JSON
        const data = await response.json();

        // Muestra los datos en consola (para depuración)
        console.log(data);

        // Actualiza la interfaz con los datos obtenidos
        actualizarClima(data);
    } catch (error) {
        // Si ocurre un error, lo muestra en consola y oculta la sección de clima
        console.error(error.message);
        clima.style.display = "none"; // Oculta el clima si hay un error    
        alert('Ciudad no encontrada. Por favor, verifica el nombre e intenta nuevamente.');
    }
}

/**
 * Función asíncrona que obtiene el clima usando coordenadas geográficas
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 */
async function obtenerClimaPorCoordenadas(lat, lon) {
    try {
        const apiKey = 'fbdaa3da58bc34eb98f944a228805082';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los datos del clima');
        }
        const data = await response.json();
        actualizarClima(data);
    } catch (error) {
        // Si ocurre un error, lo muestra en consola y oculta la sección de clima
        console.error(error.message);
        clima.style.display = "none";
        alert('No se pudo obtener el clima por ubicación.');
    }
}

/**
 * Actualiza la interfaz de usuario con los datos del clima recibidos de la API
 * @param {object} data - Objeto con los datos del clima
 */
function actualizarClima(data) {
    // Actualiza la temperatura
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)} °C`;
    // Actualiza el nombre de la ciudad
    document.querySelector('.ciudad').innerHTML = data.name;
    // Actualiza el valor de la humedad
    document.querySelector('.humedadValor').innerHTML = `${data.main.humidity}%`;
    // Actualiza el valor del viento
    document.querySelector('.vientoValor').innerHTML = `${data.wind.speed} Km/h`;

    // Diccionario de iconos según el tipo de clima
    const iconosClima = {
        clear: `images/clear.png`,
        clouds: `images/clouds.png`,
        rain: `images/rain.png`,
        snow: `images/snow.png`,
        mist: `images/mist.png`,
    }
    // Cambia el icono del clima según la respuesta de la API
    iconoClima.src = iconosClima[data.weather[0].main.toLowerCase()] || 'images/clouds.png';

    // Muestra la sección del clima (por si estaba oculta)
    clima.style.display = "block";
}

// Evento al hacer click en el botón de búsqueda
searchButton.addEventListener('click', () => {
    // Llama a la función para obtener el clima de la ciudad ingresada
    obtenerClima(inputBox.value);
});

// Solicita la ubicación al cargar la página y muestra el clima automáticamente si el usuario acepta
window.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Si el usuario acepta, obtiene latitud y longitud y consulta el clima
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                obtenerClimaPorCoordenadas(lat, lon);
            },
            (error) => {
                // Si el usuario rechaza o hay un error, muestra un mensaje en consola
                console.warn('Permiso de ubicación denegado o no disponible.');
                // Aquí puedes mostrar un mensaje o dejar la búsqueda manual
            }
        );
    } else {
        // Si el navegador no soporta geolocalización, muestra un mensaje de alerta
        alert('La geolocalización no está soportada por este navegador.');
    }
}); // hola

// Conversor de Celsius a Fahrenheit
const celsiusInput = document.getElementById('celsiusInput');
const convertirBtn = document.getElementById('convertirBtn');
const resultadoConversor = document.getElementById('resultadoConversor');

convertirBtn.addEventListener('click', () => {
    const celsius = parseFloat(celsiusInput.value);
    if (isNaN(celsius)) {
        resultadoConversor.textContent = "Por favor, ingrese un valor válido.";
    } else {
        const fahrenheit = (celsius * 9 / 5) + 32;
        resultadoConversor.textContent = `${celsius} °C = ${fahrenheit.toFixed(2)} °F`;
    }
});


