// Song data
const songList = [
    {
        title: "Alan Walker K391  Emelie Hollow -Lily",
        file: "Alan Walker K391  Emelie Hollow -Lily.mp3",
        cover: "anya.png"

    },
    {
        title: "Alessia Cara  Out Of Love",
        file: "Alessia Cara  Out Of Love.mp3",
        cover: "anya2.png"
    },
    {
        title: "All Night BTS",
        file: "All Night BTS.mp3",
        cover: "anya3.png"
    },

    {
        title: "Billie Eilish  lovely with Khalid Legendado ",
        file: "Billie Eilish  lovely with Khalid Legendado.mp3",
        cover: "anya.png"

    },
    {
        title: "BTS Cypher 4",
        file: "BTS Cypher 4.mp3",
        cover: "anya2.png"
    },
    {
        title: "Camila Cabello  Havana",
        file: "Camila Cabello  Havana.mp3",
        cover: "anya3.png"
    },
    {
        title: "Conan Gray  Heather",
        file: "Conan Gray  Heather.mp3",
        cover: "anya2.png"
    },
    {
        title: "Dayglow  Can I Call You Tonight",
        file: "Dayglow  Can I Call You Tonight.mp3",
        cover: "anya3.png"
    },

    {
        title: "Discord The Living Tombstone",
        file: "Discord The Living Tombstone.mp3",
        cover: "anya.png"

    },
    {
        title: "Don't Blame Me",
        file: "Don't Blame Me.mp3",
        cover: "anya2.png"
    },
    {
        title: "Duncan Laurence  Arcade",
        file: "Duncan Laurence  Arcade.mp3",
        cover: "anya3.png"
    },
    {
        title: "Dynasty  MIIA",
        file: "Dynasty  MIIA.mp3",
        cover: "anya2.png"
    },
    {
        title: "Eve  Dramaturgy",
        file: "Eve  Dramaturgy.mp3",
        cover: "anya3.png"
    },

    {
        title: "Fable  Killing Our Memories",
        file: "Fable  Killing Our Memories.mp3",
        cover: "anya.png"

    },
    {
        title: "Gotye  Somebody That I Used To Know",
        file: "Gotye  Somebody That I Used To Know.mp3",
        cover: "anya2.png"
    },
    {
        title: "Grandson- Blood  Water",
        file: "Grandson- Blood  Water.mp3",
        cover: "anya3.png"
    },

    {
        title: "Guns N Roses  Patience",
        file: "Guns N Roses  Patience.mp3",
        cover: "anya.png"

    },
    {
        title: "Leo Rizzi La vida es un cuadro",
        file: "Leo Rizzi La vida es un cuadro.mp3",
        cover: "anya2.png"
    },
    {
        title: "Papi Wilo  Mi Historia",
        file: "Papi Wilo  Mi Historia.mp3",
        cover: "anya3.png"
    },
    {
        title: "Paulo Londra  Adan y Eva",
        file: "Paulo Londra  Adan y Eva.mp3",
        cover: "anya2.png"
    },
    {
        title: "Penyair  H Films Nada",
        file: "Penyair  H Films Nada.mp3",
        cover: "anya3.png"
    },

    {
        title: "Rhapsody of Fire  Dawn of Victory",
        file: "Rhapsody of Fire  Dawn of Victory.mp3",
        cover: "anya.png"

    },
    {
        title: "Sean Paul  No Lie ft Dua Lipa",
        file: "Sean Paul  No Lie ft Dua Lipa.mp3",
        cover: "anya2.png"
    },
    {
        title: "Stardust  Music Sounds Better With You",
        file: "Stardust  Music Sounds Better With You.mp3",
        cover: "anya3.png"
    },
    {
        title: "Trevor Daniel  Falling",
        file: "Trevor Daniel  Falling.mp3",
        cover: "anya2.png"
    },
    {
        title: "Twenty One Pilots  Ride",
        file: "Twenty One Pilots  Ride.mp3",
        cover: "anya3.png"
    },

    {
        title: "UNO  Redimi2 x Alex Zurdo x Funky Ft Almighty Christian Ponce Ander Bock",
        file: "UNO  Redimi2 x Alex Zurdo x Funky Ft Almighty Christian Ponce Ander Bock.mp3",
        cover: "anya2.png"
    },
    {
        title: "Zayn  Dusk Till Dawn ft Sia",
        file: "Zayn  Dusk Till Dawn ft Sia.mp3",
        cover: "anya3.png"
    },
]

// Canción actual
let actualSong = null

// busqueda de todos los elementos que se trabaja
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
progressContainer.addEventListener("click", setProgress)

// Escuchar el elemento AUDIO
audio.addEventListener("timeupdate", updateProgress)

// Escuchar clicks en los controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()   
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

// Cargar canciones y mostrar el listado
function loadSongs() {
    songList.forEach((song, index) => {
        // Crear li
        const li = document.createElement("li")
        // Crear a
        const link = document.createElement("a")
        // titulo de las canciones
        link.textContent = song.title
        link.href = "#"
        // Escuchar clicks
        link.addEventListener("click", () => loadSong(index))
        // Añadir a li
        li.appendChild(link)
        // Aañadir li a ul
        songs.appendChild(li)
    })
}

// Cargar canción seleccionada
function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeSongtitle(songIndex)
        changeCover(songIndex)
    }
}

// Actualizar barra de progreso de la canción
function updateProgress(event) {
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%" 
}

// Hacer la barra de progreso clicable
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

// Actualiar controles
function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

// Reproducir canción
function playSong() {
    if (actualSong !== null) {
        audio.play()
        updateControls()
    }
}

// Pausar canción
function pauseSong() {
    audio.pause()
    updateControls()
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

// Cambiar el cover de la canción
function changeCover(songIndex) {
    cover.src = "./img/" + songList[songIndex].cover
}

// Cambiar el título de la canción
function changeSongtitle(songIndex) {
     title.innerText = songList[songIndex].title
}

// Anterior canción
function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}

// Siguiente canción
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1)
    } else {
        loadSong(0)
    }
}

// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => nextSong())

// GO!
loadSongs()