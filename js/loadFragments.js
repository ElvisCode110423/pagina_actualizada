async function loadFragment(fragmentId, filePath) {
    try {
        const version = new Date().getTime(); 
        const urlWithVersion = `${filePath}?version=${version}`;

        const cachedContent = localStorage.getItem(urlWithVersion);
        if (cachedContent) {
            document.getElementById(fragmentId).innerHTML = cachedContent;
            return;
        }

        const response = await fetch(urlWithVersion);
        if (!response.ok) throw new Error(`Error loading ${filePath}`);
        const content = await response.text();

        document.getElementById(fragmentId).innerHTML = content;
        localStorage.setItem(urlWithVersion, content); 
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        loadFragment("navbar", "../fragments/nav.html"),
        loadFragment("navbar_index", "../fragments/nav_index.html"),
        loadFragment("footer", "../fragments/footer.html"),
        loadFragment("social-bar", "../fragments/redesSociales.html") 
    ])
    .then(() => {
        var audio = document.getElementById('welcome-audio');
        var musicBtn = document.getElementById('music-btn');

        if (audio) {
            // Reproducir el audio al inicio
            audio.play().catch(function(error) {
                console.log("El audio no se pudo reproducir automáticamente: ", error);
            });
        }

        // Alternar entre reproducir y detener audio al hacer clic
        function removeClasses(element, classes) {
            classes.split(' ').forEach(cls => element.classList.remove(cls));
        }
        
        function addClasses(element, classes) {
            classes.split(' ').forEach(cls => element.classList.add(cls));
        }
        
        musicBtn.addEventListener('click', function () {
            if (audio.paused) {
                audio.play().catch(function(error) {
                    console.log("El audio no se pudo reproducir: ", error);
                });
                removeClasses(musicBtn, 'bi bi-play-fill');
                addClasses(musicBtn, 'bi bi-pause-fill'); // Cambio de ícono a mute
            } else {
                audio.pause();
                removeClasses(musicBtn, 'bi bi-pause-fill');
                addClasses(musicBtn, 'bi bi-play-fill'); // Cambio de ícono a play
            }
        });
    })
    .catch(console.error);
});
