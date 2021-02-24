import { select, csv } from 'd3';

const svg = select('svg').attr('id', 'pop_hist')

const width = +svg.attr('width')
const height = +svg.attr('width')

const render = data => {
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', 300)
        .attr('')
}

var values = new Array(6).fill(1 / 6);
render(values)
svg.style('background-color', 'red')
console.log("hello")