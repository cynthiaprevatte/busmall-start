//DATA

var itemArray = [];
var idArray = [];

//CONSTRUCTOR & INSTANCES

function Item (id, path) {
    this.id = id;
    this.path = path;
    this.votes = 0;
    this.impressions = 0;

    itemArray.push(this);
    idArray.push(this.Id);
}

function tallyVote ( tracker, id ) {
    tracker.votes += 1;

    itemArray.forEach(function add ( Item ) {
        if ( Item.id === id ) {
            Item.votes += 1;
        }
    });
    
    if ( tracker.votes > 4 ) {
        showResults(tracker);
    }
}

function instantiateItems() {
    var bag = new Item('bag', 'images/bag.jpg');
    var banana = new Item('banana', 'images/banana.jpg');
    var bathroom = new Item('bathroom', 'images/bathroom.jpg');
    var boots = new Item('boots', 'images/boots.jpg');
    var breakfast = new Item('breakfast', 'images/breakfast.jpg');
    var bubblegum = new Item('bubblegum', 'images/bubblegum.jpg');
    var chair = new Item('chair', 'images/chair.jpg');
    var cthulhu = new Item('cthulhu', 'images/cthulhu.jpg');
    var dogDuck = new Item('dog-duck', 'images/dog-duck.jpg');
    var dragon = new Item('dragon', 'images/dragon.jpg');
    var pen = new Item('pen', 'images/pen.jpg');
    var petSweep = new Item('pet-sweep', 'images/pet-sweep.jpg');
    var scissors = new Item('scissors', 'images/scissors.jpg');
    var shark = new Item('shark', 'images/shark.jpg');
    var sweep = new Item('sweep', 'images/sweep.png');
    var tauntaun = new Item('tauntaun', 'images/tauntaun.jpg');
    var unicorn = new Item('unicorn', 'images/unicorn.jpg');
    var usb = new Item('usb', 'images/usb.gif');
    var waterCan = new Item('water-can', 'images/water-can.jpg');
    var wineGlass = new Item('wine-glass', 'images/wine-glass.jpg');
}

//DISPLAY & VOTING FUNCTIONS

var tracker = {
    option1: document.getElementById('option1'),
    option2: document.getElementById('option2'),
    option3: document.getElementById('option3'),
    displaySection: document.getElementById('display'),
    votes: 0
}

function randomIndex() {
    return Math.floor(Math.random() * itemArray.length);
}

function getIndices (tracker) {
    var lastTracker = tracker;
    var selectedIndices = []; 
    while ( selectedIndices.length < 3 )  {
        var item = randomIndex( itemArray );

        if ( selectedIndices.indexOf( item ) === -1 ) {
            selectedIndices.push( item );
        }
    }
    console.log (tracker, lastTracker, selectedIndices);
    return selectedIndices;
}

function displayOptions (tracker) {
    // get 3 random Items
    var randomItems = getIndices( tracker );
    var index1 = randomItems[0];
    var index2 = randomItems[1];
    var index3 = randomItems[2];

    var item1 = itemArray[index1];
    var item2 = itemArray[index2];
    var item3 = itemArray[index3];

    // append to DOM
    tracker.option1.src = item1.path;
    tracker.option2.src = item2.path;
    tracker.option3.src = item3.path;

    tracker.option1.id = item1.id;
    tracker.option2.id = item2.id;
    tracker.option3.id = item3.id;

    item1.impressions++;
    item2.impressions++;
    item3.impressions++;
    
}

function showResults (tracker) {
    tracker.displaySection.removeEventListener('click', voteHandler);
    console.table( itemArray );
    displayChart();
}

//EVENT LISTENER

tracker.displaySection.addEventListener('click', voteHandler);

function voteHandler () {
    if ( event.target.id !== 'display') {
        tallyVote( tracker, event.target.id);
        displayOptions( tracker);
    }
}

//INITIALIZE
instantiateItems();
displayOptions(tracker);
console.log (itemArray);

function displayChart() {

    // var labels = [];
    // itemArray.forEach( function(item){
    //     labels.push( item.id );
    // })

    var data = [];
    itemArray.forEach(function (item) {
        data.push(item.votes);
    })

    var items = document.getElementById('items').getContext('2d');
    var itemData = new Chart(items, {
        type: 'bar',
        data: {
            labels: idArray,
                datasets: [{
                    label: '# of Votes',
                    data: data
                }]
            },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        max: 10,
                        min: 0,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}
