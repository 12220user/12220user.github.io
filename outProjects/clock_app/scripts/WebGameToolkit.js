//=================================================
// Entities
//=================================================

// Math
class Mathf {
    static Lerp(x1, x2, d) {
        return x1 + (x2 - x1) * d
    }
}

class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static Lerp(v1, v2, delta) {
        return new Vector2(Mathf.Lerp(v1.x, v2.x, delta), Mathf.Lerp(v1.y, v2.y, delta))
    }
}

// Modules

// Create any events in game
class GameEvent {
    static event_listeners = []
    static addGameEvent = (name, func) => {
        this.event_listeners.push({ name: name, handler: func })
    }
    static startGameEvent = (name, args) => {
        this.event_listeners.forEach(h => {
            if (h.name == name) {
                h.handler(args)
            }
        })
    }
}

// async load array images before loaded web page
class ImageLoader {
    static loadImage(url) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                resolve(img);
            };
            img.onerror = function() {
                reject(new Error('Ошибка загрузки изображения: ' + url));
            };
            img.src = url;
        });
    }

    static loadImages(imagePaths) {
        var promises = [];
        for (var i = 0; i < imagePaths.length; i++) {
            promises.push(this.loadImage(imagePaths[i]));
        }
        return Promise.all(promises);
    }
}

// Set Simple navigation on game UI/UX
class StateMachine {
    constructor() {
        this.states = []
        this.last = ''
    }
    add(name, id) {
        this.states.push({ name: name, element: $('#' + id) })
    }
    set(name) {
        for (let i = 0; i < this.states.length; i++) {
            let value = name == this.states[i].name
            if (value) this.states[i].element.removeClass('hide')
            else this.states[i].element.addClass('hide')
        }
        this.last = name
    }
    back() {
        if (this.last != '') {
            this.set(this.last)
            this.last = ''
        }
    }
}


class GamePhysicsRenderer {
    constructor(delay) {
        this.objects = []
        this.delay = 1000 / delay
    }

    start() {
        this.objects.forEach(m => {
            m.start()
        })
        this.time = Date.now()
        this.timerId = setInterval(() => {
            this.objects.forEach(m => {
                this.deltaTime = (Date.now() - this.time) / 1000
                this.time = Date.now()
                if (m) m.update(this)
            })
        }, this.delay)
    }

    stop() {
        clearInterval(this.timerId)
    }

    addComponent(obj) {
        if (obj.typeof && obj.typeof === 'gameobject') this.objects.push(obj)
    }

    removeComponent(obj) {
        if (this.objects.includes(obj)) {
            this.objects.filter(vl => vl !== obj)
        }
    }
}

class GameObject {
    constructor(name) {
        this.name = name
        this.typeof = 'gameobject'
    }

    start() {}
    update(rendered) {}
}


//=================================================
// Functions
//=================================================

// add defould fuction set string data
// Exemple 'Hello, {0}!' , 'dear' => 'Hello, dear!'
String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}