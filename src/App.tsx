import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5'; //Import this for typechecking and intellisense
import { SContainer, SSignatureContainer, SSubtitle, STitle, SWrapper } from './App.styles';
import useWindowDimensions from './utils/windowDimension';

export const App: React.FunctionComponent = () => {
	const { width, height } = useWindowDimensions();
	const colorMaximum: number = 190;
	const colorMinumum: number = 70;
	const amplitude: number = 35;
	const period: number = 200;
	const spacing: number = 10;

	const iterator: number = 2 * Math.PI / period * spacing;

	const [ theta, setTheta ] = useState<number>(0);

	const [ lineHeights, setLineHeights ] = useState<number[]>(new Array(Math.floor(width / spacing)));

	useEffect(
		() => {
			setLineHeights(new Array(Math.floor(width / spacing)));
		},
		[ width ]
	);

	const calcWaves = (p5: p5Types, secondLine?: boolean) => {
		setTheta(theta + 0.02);

		let x = theta;
		for (let i = 0; i < lineHeights.length; i++) {
			const _lineHeights = lineHeights;
			if (secondLine) {
				_lineHeights[i] = Math.sin(x) * amplitude + 5;
			} else {
				_lineHeights[i] = Math.cos(x) * amplitude;
			}
			setLineHeights(_lineHeights);
			x += iterator;
		}
	};

	const renderWaves = (p5: p5Types) => {
		p5.noStroke();

		p5.fill(
			Math.floor(Math.random() * colorMaximum + colorMinumum),
			Math.floor(Math.random() * colorMaximum + colorMinumum),
			Math.floor(Math.random() * colorMaximum + colorMinumum)
		);
		// A simple way to draw the wave with an ellipse at each location
		for (let x = 0; x < lineHeights.length; x++) {
			p5.ellipse(x * spacing, height / 2 + lineHeights[x], 2.5, 2.5);
		}
	};

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(width, height).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
		p5.resizeCanvas(width, height);
		p5.background(12);
		calcWaves(p5);
		renderWaves(p5);
		calcWaves(p5, true);
		renderWaves(p5);
	};

	return (
		<SContainer lineHeights={lineHeights}>
			<SWrapper />
			<Sketch
				setup={setup}
				draw={draw}
				style={{ maxHeight: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
			/>
			<SSignatureContainer>
				<STitle> Intersecting lines </STitle>
				<SSubtitle> @danicolms</SSubtitle>
			</SSignatureContainer>
		</SContainer>
	);
};
