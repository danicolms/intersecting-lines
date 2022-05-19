import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense
import { SContainer } from './App.styles';

let xspacing = 18; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 45.0; // Height of wave
let period = 1000.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

export const App: React.FunctionComponent = () => {
	w = 616;
	dx = Math.PI * 2 / period * xspacing;
	yvalues = new Array(Math.floor(w / xspacing));

	function calcWave(p5: p5Types) {
		// Increment theta (try different values for
		// 'angular velocity' here)
		theta += 0.01;

		// For every x value, calculate a y value with sine function
		let x = theta;
		for (let i = 0; i < yvalues.length; i++) {
			yvalues[i] = Math.sin(x) * amplitude;
			x += dx;
		}
	}
	function renderWave(p5: p5Types) {
		p5.noStroke();
		p5.fill(255);
		// A simple way to draw the wave with an ellipse at each location
		for (let x = 0; x < yvalues.length; x++) {
			p5.ellipse(x * xspacing, 600 / 2 + yvalues[x], 1, 1);
		}
	}

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(600, 600).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		p5.background(0);
		calcWave(p5);
		renderWave(p5);
	};

	return (
		<SContainer>
			<Sketch setup={setup} draw={draw} />
		</SContainer>
	);
};
