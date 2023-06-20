const print_effect = {
    delay: 60,
    write: function(id, text) {
        let block = document.querySelector(id)
        block.innerHTML = ''
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => { this.printLetter(block, text[i]) }, this.delay * (i + 1))
        }
    },
    printLetter: function(block, char) {
        block.innerHTML += char
    }
}