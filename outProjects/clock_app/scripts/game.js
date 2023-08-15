class ConfirmBox {
    // 
    static callback = null

    static init() {
        this.isRun = true
        if (this.isRun) {
            $('#confirm_accept').on('click', () => {
                if (this.callback) {
                    this.callback(true)
                    this.callback = null
                    $('#confirm_form').attr('class', 'special_hide')
                }
            })
            $('#confirm_cancel').on('click', () => {
                this.callback(false)
                this.callback = null
                $('#confirm_form').attr('class', 'special_hide')
            })
        }
    }

    static confirm(text, callback) {
        if (!this.isRun) ConfirmBox.init()
        $('#confirm_form').attr('class', '')
        $('#confirm_text').html(text)
        this.callback = callback
    }

    static confirm_promis(text) {
        return new Promise((resolve, reject) => {
            this.confirm(text, (r) => {
                resolve(r)
            })
        })
    }
}

function setGalleryState(index, id = "#setting_content") {
    $(id).css({
        'transform': `translateX(${index * -100}vw)`
    })
}

class ClockView {
    constructor(type, containerID) {
        this.mounts_ru = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
        this.daysOfWeek_ru = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
        this.daysOfWeek_small_ru = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
        this.body = $(containerID)
        this.type = type
        this.clockModels = []

        // Base numperic clock
        this.clockModels[0] = {
            model: `
            <p id="time">10:10:00</p>
            <p id="date">13.07.2003</p>
            `,
            func: () => {
                let time = new Date()
                $('#time').html(time.toTimeString().substring(0, 8))
                    //let date = `${this.daysOfWeek_small_ru[time.getDay()-1]} ${this.mounts_ru[time.getMonth()]} ${time.getDate()} ${time.getFullYear()}`
                let d = time.getDate()
                if (d < 10) d = '0' + d
                let m = time.getMonth() + 1
                if (m < 10) m = '0' + m
                let date = `${d}.${m}.${time.getFullYear()}`
                $('#date').html(date)
            }
        }

        // Base analog clock
        this.clockModels[1] = {
            model: `
            <div id="hour_arrow" class="cl_arrow"><div class="arw_m"></div></div>
            <div id="minute_arrow" class="cl_arrow"><div class="arw_m"></div></div>
            <div id="second_arrow" class="cl_arrow"><div class="arw_m"></div></div>
            <div class="point"><div class="ma_p"> </div></div>
            `,
            func: () => {
                let time = new Date()
                $('#second_arrow ').css({ 'transform': `rotate(${((time.getSeconds() + (time.getMilliseconds()/1000))*6)-90}deg)` })
                $('#minute_arrow ').css({ 'transform': `rotate(${((time.getMinutes())*6)-90}deg)` })
                $('#hour_arrow ').css({ 'transform': `rotate(${((time.getHours())*360/12)-90}deg)` })
            }
        }
    }

    init() {
        let gm_c = new GameObject()
        gm_c.update = (r) => {
            this.clockModels[this.type].func()
        }
        if (g_loop) {
            this.body.html(this.clockModels[this.type].model)
            this.clockModels[this.type].func()
            g_loop.addComponent(gm_c)
        }
    }
}



const loadImageProfileinSettings = () => {
    // load bg img
    let imgData = ''
    for (let i = 0; i < bg_source.length; i++) {
        let subdata = ``
        let subclass = 'bg_close'
        if (findInImageRiestor(bg_source[i])) {
            subclass = ''
            if (bg_source[i] == clockConfig.backgroundData_image) subclass = 'bg_selected'
        }

        if (bg_source[i].includes('.gif')) subdata += '<div class="mark">анимация</div>'
        imgData += `
            <div id="img_bg_${i}" class="img_st_profile ${subclass}" onclick="tryOpenImage('${bg_source[i]}')">
                <div class="photo" style="background-image: url('${bg_source[i]}');">
                    <div class='close'></div>
                </div>
                ${subdata}

            </div> 
        `
    }
    $('#img_collection').html(imgData)
}

const tryOpenImage = (source) => {
    if (findInImageRiestor(source)) {
        changeConfig(`backgroundData_image:${source}`)
        loadImageProfileinSettings()
        return
    }
    ConfirmBox.confirm_promis('Посмотреть рекламу, чтобы открыть фон?').then(
        r => {
            console.log(r)
            if (r) {
                // TODO : add ad show and open
                pushToImageRiestor(source)
                changeConfig(`backgroundData_image:${source}`)
                loadImageProfileinSettings()
            }
        }
    )

}


function init() {

    sm.add('load', 'load_frame')
    sm.add('game', 'clock_frame')
    sm.add('settings', 'settings_frame')

    sm.set('load')

    $('#bk_btn_in_st').on('click', () => { sm.set('game') })
    $('#btn_settings').on('click', () => { sm.set('settings') })

    let start_time = Date.now()

    ImageLoader.loadImages(bg_source)
        .then(() => {
            console.log('media source loaded ' + (Date.now() - start_time) + 'ms')
            sm.set('game')
            g_loop.start()

            let cnf_save = ConfigFile.read()
            if (!cnf_save) ConfigFile.write(clockConfig)
            else clockConfig = cnf_save
            confirmConfigChanges()

            new ClockView(clockConfig.clockType, '#clock_cnt').init()
            initImageRiestor()
            loadImageProfileinSettings()
        })
}

let g_loop = new GamePhysicsRenderer(1)
let sm = new StateMachine()
document.addEventListener('DOMContentLoaded', init)