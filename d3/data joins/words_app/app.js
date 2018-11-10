var previousWord = [];
var currentWord = [];

//Creating letters array
function splitLetters(str) {
    var letterArr = [];
    str.split('').forEach((val, i) => {
        var index = letterArr.findIndex(item => item.value === val);
        if (index === -1) {
            var letterObj = { value: val, count: 1, isNew: true };
            letterArr.push(letterObj);
        } else {
            letterArr[index].count += 1;
        }
    });

    return letterArr;
}

//Checking if letter is new
function compareWords() {
    if (currentWord !== previousWord) {
        currentWord.forEach(newLetter => {
            var index = previousWord.findIndex(oldLetter => oldLetter.value === newLetter.value);
            if (index > -1) newLetter.isNew = false;
        });
    }
}

// Collecting input entered
d3.select('form').on('submit', function() {
    d3.event.preventDefault();
    var input = d3.select('input').property('value');
    if(input) {
        var letterArr = splitLetters(input);
        var svg = d3.select('svg');
        var width = parseInt(svg.style('width').replace('px', ''));
        var height = parseInt(svg.style('height').replace('px', ''));
        var barWidth = Math.floor(width / letterArr.length) - 5;
        var maxNumber = Math.max(...letterArr.map(val => val.count));

        if (currentWord.length > 0) previousWord = currentWord;
        currentWord = letterArr;
        compareWords();

        //Settting text
        var newChars = currentWord.filter(val => val.isNew).length;
        d3.select('#phrase').text(`Analysis of: ${input}`);
        d3.select('#count').text(`(New characters: ${newChars})`);

        //Settting up graph
        var bars = svg.selectAll('rect').data(currentWord, data => data.value);
        var labels = svg.selectAll('text').data(currentWord, data => data.value);

        //Exit
        bars.exit().remove();
        labels.exit().remove();

        //Enter
        bars.enter()
            .append('rect')
            .merge(bars)
                .attr('width', barWidth)
                .attr('height', data => data.count * (height - 30) / maxNumber)
                .attr('y', data => height - data.count * (height - 30) / maxNumber)
                .attr('x', (data, i) => (barWidth + 5) * i)
                .attr('fill', data => (data.isNew) ? '#01ABAA' : '#000000');

        labels.enter()
            .append('text')
            .merge(labels)
                .attr('x', (data, i) => (barWidth + 5) * (i + 0.5))
                .attr('y', data => height - data.count * (height - 30) / maxNumber - 5)
                .attr('text-anchor', 'middle')
                .style('fill', data => (data.isNew) ? '#01ABAA' : '#000000')
                .style('font-size', '1.5em')
                .text(data => (data.value !== " ") ? data.value : '(space)');


        //Clear input
        d3.select('input').property('value', '');
    }
});


//Reset game
d3.select('#reset').on('click', function() {
    d3.select('input').property('value', '');
    previousWord = [];
    currentWord = [];

    var letters = d3.select('#letters').selectAll('div').data(currentWord);
    letters.exit().remove();
    d3.select('#phrase').text('');
    d3.select('#count').text('');
});
