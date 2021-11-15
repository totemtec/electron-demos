const { desktopCapturer } = require('electron')

document.getElementById('screenshot-button').addEventListener('click', () => {
    desktopCapturer.getSources({ types: ['window'], thumbnailSize: {width: 200, height: 150} })
        .then( sources => {
            for (const source of sources) {
                if (source.name === 'Electron') {
                    document.getElementById('screenshot-image').src = sources[0].thumbnail.toDataURL()
                }
            }
        })
})

document.getElementById('video-button').addEventListener('click', () => {
    desktopCapturer.getSources({ types: ['screen', 'window'] }).then(async sources => {
        for (const source of sources) {
          if (source.name === 'Electron') {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                  mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: source.id,
                    minWidth: 1280,
                    maxWidth: 1280,
                    minHeight: 720,
                    maxHeight: 720
                  }
                }
              })
              handleStream(stream)
            } catch (e) {
              handleError(e)
            }
            return
          }
        }
      })
})


function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}