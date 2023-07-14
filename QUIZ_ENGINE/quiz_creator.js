let frames = []
let state_controler = {}

function init() {
    // frames
    frames.push(document.querySelector('#project_list'))
    frames.push(document.querySelector('#project_create'))
    frames.push(document.querySelector('#project_edit'))

    // state mashine
    state_controler['set_state'] = function(name) { for (let i = 0; i < frames.length; i++) { frames[i].setAttribute('class', frames[i].id == name ? '' : 'hide') } }


    state_controler.set_state('project_list')
}
addEventListener('DOMContentLoaded', init)