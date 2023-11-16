// INDEX.HTML DO PROJETO DE SIMULADOR DE PIANO
// POR RAFAEL_SOL_MAKER (RSM)
// EDITADO: 16/11/23

// -----------------------------
// CRIANDO O NOSSO SINTETIZADOR
// -----------------------------

const synth = new Tone.Synth({
    oscillator: { type: 'sine'},
    envelope: {
        attack: 0.1, 
        decay: 0.2,
        sustain: 0.8,
        release: 1.2
    }
}).toMaster();

// -----------------------------
// COISAS RELACIONADAS ÀS TECLAS
// -----------------------------

const pianoKeys = document.querySelectorAll(".key");

pianoKeys.forEach( (key) => {
    key.addEventListener("mousedown", pianoPress.bind(this, key.id));
});

function pianoPress(id) {
    synth.triggerAttackRelease(id, "16n");
}

// -------------------------------------------
// COISAS RELACIONADAS AO PRESSIONAR DE TECLAS
// -------------------------------------------

document.addEventListener("keypress", (event) => {keyPress(event.key)});

function keyPress(keybdKey) {
    pianoKeys.forEach((keyPiano) => {      
        if (keyPiano.dataset.key == keybdKey.toLowerCase()) {
            const keyId = keyPiano.id;
            pianoPress(keyId); 
            // Poderia funfar também da mesma forma se o listener tivesse pra click ao invés de mousedown
            // document.getElementById(keyId).click();
            document.getElementById(keyId).classList.add("active");
            setTimeout(()=>{document.getElementById(keyId).classList.remove("active")}, 250);
        }
    });
}

// -----------------------------
// COISAS RELACIONADAS AO VOLUME
// -----------------------------

const volumeSlider = document.querySelector(".volume");

volumeSlider.addEventListener("input", (event)=>{changeVolume(event.target.value)});

function changeVolume(volume) { 
    synth.volume.value = 20 * Math.log(volume);
}

// ----------------------------
// CHECKBOX DE MOSTRAR AS NOTAS
// ----------------------------

const keysToggle = document.querySelector(".notes-control");
keysToggle.addEventListener("click", checkToggle);

function checkToggle() {
    pianoKeys.forEach((keyPiano) => {
        keyPiano.classList.toggle("hide");
    });
}

