// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (state, emit) {
    return html `
    <div>
        <h2>Ping Pong</h2>
        <button onclick="${ping}">Ping</button>
    </div>`

    function ping(e) {
        e.preventDefault()
        emit('ping')
    }
}