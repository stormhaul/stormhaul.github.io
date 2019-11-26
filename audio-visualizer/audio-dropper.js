/**
 * Requires an <audio> tag with id 'audio'
 * Requires a text element with id 'audio-title' that's contents will be replaced on success.
 * Requires either an event of 'drop' emitted with an audio file in the dataTransfer items,
 * or a form with id 'audioMp3' which will cause the event.
 *
 * Optional, launch function present to init whatever you want to do with the audio file.
 *   This function will be passed the url of the audio file that was dropped.
 */

/**
 * Sets up the form on change listener
 */
window.onload = function() {
    var inputElement = document.getElementById('audioMp3');
    inputElement.onchange = function(event) {
        audioDropperChange(inputElement.files[0]);
    }

};

/**
 * Responds to drop event
 */
document.addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.dataTransfer.items) {
        if (e.dataTransfer.items[0].kind === 'file') {
            audioDropperChange(e.dataTransfer.items[0].getAsFile());
        }
    }
});

function audioDropperChange(file) {
    self.blobURL = window.URL.createObjectURL(file);
    document.getElementById('audio').setAttribute('src', self.blobURL);
    document.getElementById('audio-title').innerHTML = file.name;

    if (typeof launch === 'function') {
        launch(self.blobURL);
        document.getElementById('audioMp3').classList.add('hidden');
    }
}