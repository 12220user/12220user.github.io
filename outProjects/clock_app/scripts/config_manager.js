let imageRiestor = [
    // Exemple: { source: './', status: 'open' }
    { source: './source/backgrounds/1.jpg', status: 'open' },
]
const initImageRiestor = () => {
    if (!ImagesRisestorFile.read()) {
        ImagesRisestorFile.write(imageRiestor)
    } else {
        imageRiestor = ImagesRisestorFile.read()
    }
}
const pushToImageRiestor = (source) => {
    if (!ImagesRisestorFile.read()) {
        ImagesRisestorFile.write(imageRiestor)
    }
    // some action (show ad)
    let result = true
        //add and save
    if (result) {
        imageRiestor.push({ source: source, status: 'open' })
        ImagesRisestorFile.write(imageRiestor)
    }
}
const findInImageRiestor = (source) => {
    if (!ImagesRisestorFile.read()) {
        ImagesRisestorFile.write(imageRiestor)
    }

    for (let i = 0; i < imageRiestor.length; i++) {
        if (imageRiestor[i].source === source) {
            return imageRiestor[i]
        }
    }
}



function changeConfig(data) {
    data = data.split(':')
    if (data.length == 2) {
        clockConfig[data[0]] = data[1]
        confirmConfigChanges()
    }
}


class File {
    constructor(name) {
        this.name = name
    }

    read() {
        return JSON.parse(localStorage.getItem(this.name))
    }

    write(data) {
        localStorage.setItem(this.name, JSON.stringify(data))
    }
}
const ConfigFile = new File('clock_config')
const ImagesRisestorFile = new File('image_riestor')

const confirmConfigChanges = () => {
    ConfigFile.write(clockConfig)
    setCssConfig(clockConfig)
    setEllementsConfig(clockConfig)
}

const setCssConfig = (config) => {
    let { baseColor, fontIndex, backgroundType, backgroundData_image, backgroundData_color, backgroundData_graadient_left, backgroundData_graadient_right, backgroundBlur } = config;

    bgStyle = ''
    if (backgroundType == 0) bgStyle = `background: ${backgroundData_color};`
    if (backgroundType == 1) bgStyle = `background: linear-gradient(90deg , ${backgroundData_graadient_left} , ${backgroundData_graadient_right});`
    if (backgroundType == 2) bgStyle = `background-image: url('${backgroundData_image}');`


    $('#global_css_config').html(`
        #clock_cnt *{
            color: ${baseColor};
        }
        .bg_cl {
            ${bgStyle}
        }
        .clock{
            backdrop-filter: blur(${backgroundBlur}px);
        }
    `)
}

const setEllementsConfig = (config) => {
    let { backgroundType, backgroundData_color, backgroundData_graadient_left, backgroundData_graadient_right, backgroundBlur } = config


    let radioBG_group = $('input[type=radio][name=r_bg]')
    for (let i = 0; i < radioBG_group.length; i++) {
        if (backgroundType == i) radioBG_group[i].setAttribute('checked', '')
        else radioBG_group[i].removeAttribute('checked', '')
    }

    $('#gradient_left').attr('value', backgroundData_graadient_left)
    $('#gradient_right').attr('value', backgroundData_graadient_right)

    $('#background_color').attr('value', backgroundData_color)

    $('#blur_bg_slider').attr('value', backgroundBlur)
}