// FIXME:
// test trianglify for generating polygon background

const fs = require('fs')
const trianglify = require('trianglify')

const canvas = trianglify({
	seed: 'yo',
	width: 2560,
	height: 600,
	cellSize: 150,
	xColors: ['#afafaf', '#c9c9c9', '#afafaf', '#c9c9c9', '#afafaf'],
	variance: 1
}).toSVG()

fs.writeFileSync('trianglify.svg', canvas.toString())
