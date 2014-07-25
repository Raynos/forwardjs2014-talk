var mercury = require('../index.js');
var cuid = require('cuid');
var h = mercury.h;

function createEvents() {
    return mercury.input(['increment', 'decrement', 'add']);
}

function createState(events) {
    var state = mercury.struct({
        counters: mercury.varhash({}, function (obj) {
            return mercury.struct({
                number: mercury.value(obj.number)
            });
        }),
        events: events
    });

    return {
        state: state,
        update: {
            addCounter: addCounter,
            decCounter: decCounter,
            incCounter: incCounter
        }
    };

    function addCounter() {
        var id = cuid();
        state.counters.put(id, {
            number: 0,
            id: id
        });
    }

    function incCounter(ev) {
        var counter = state.counters.get(ev.id);
        counter.number.set(counter.number() + 1);
    }

    function decCounter(ev) {
        var counter = state.counters.get(ev.id);
        counter.number.set(counter.number() - 1);
    }
}

function setupInput(events, update) {
    events.add(update.addCounter);
    events.decrement(update.decCounter);
    events.increment(update.incCounter);
}

var events = createEvents();
var model = createState(events);
setupInput(events, model.update);


mercury.app(document.body, model.state, render);

function render(state) {
    var inc = state.events.increment;
    var dec = state.events.decrement;
    var add = state.events.add;

    console.log('counters', state.counters);

    return h('div', [
        h('ul', Object.keys(state.counters).map(function (key) {
            var number = state.counters[key].number;

            return h('li', [
                h('label', String(number)),
                h('button', {
                    'ev-click': mercury.event(inc, {
                        id: key
                    })
                }, 'Increment'),
                h('button', {
                    'ev-click': mercury.event(dec, {
                        id: key
                    })
                }, 'Decrement')
            ]);
        })),
        h('button', {
            'ev-click': mercury.event(add)
        }, 'Add')
    ]);
}
