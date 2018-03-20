import React, { Component } from 'react';

import Graph from './Graph';

import './index.css';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.arrayX = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];
		this.lastArrayY = [];
		this.lastPolyline = [];
		this.nextPolyline = [];
		this.currentIndex = 1;
		this.state = {
			menu: [
				{
					label: "Missed Payment",
					active: false,
					array: [5, 30, -5, -10, 15, -15, 20, 5, 8, -12, -20, 2, 3, -5, 8, -2, 22, -30, -15, -35, -20]
				}, {
					label: "Conversions",
					active: true,
					array: [30, 25, 35, 15, 25, 17, 20, -5, 12, 7, -28, 2, -30, -20, -22, -2, -27, -30, -35, -10, -35]
				}, {
					label: "Churn",
					active: false,
					array: [-12, -35, -28, -30, -7, -1, -22, 16, 2, -5, 4, -19, -2, 15, 10, 25, 30, 28, 35, 10, 30]
				}, {
					label: "Revenue",
					active: false,
					array: [5, 12, -2, 8, 3, -12, 20, 5, 8, -12, -20, -9, 5, 12, -1, -2, 22, -30, 5, -15, 5]
				}
			]
		}
	}

	componentWillMount() {
		this.lastArrayY = this.state.menu[this.currentIndex].array;
		this.generatePolylineArray();
	}

	generatePolylineArray() {
		this.lastPolyline = this.nextPolyline;
		let polyline = '';
		const currentArrayY = this.state.menu[this.currentIndex].array;
		this.arrayX.map((coordX, i) => {
			return (this.arrayX.length === i) ? polyline += coordX : polyline += `${coordX},${currentArrayY[i]} `;
		})
		this.nextPolyline = polyline;
	}

	handleClick(key) {
		this.currentIndex = key;
		this.generatePolylineArray();

		const newState = [...this.state.menu];
		for (var i = 0; i < newState.length; i++) {
			if (newState[i].active) {
				this.lastArrayY = newState[i].array;
				newState[i].active = false;
			}
		}
		newState[key].active = true;

		this.setState({newState});
	}

	render() {

		const color = this.currentIndex === 0 ? 'blue'
			: this.currentIndex === 1 ? 'orange'
			: this.currentIndex === 2 ? 'red'
			: this.currentIndex === 3 ? 'green'
			: ''

		return (
			<div className={`chart ${color}`}>
				<ul className="chart-header">
					{this.state.menu.map((item, i) => {
						const active = item.active ? 'menu-item active' : 'menu-item';
						return (
							<li key={i} className={active}>
								<button onClick={() => this.handleClick(i)}>
									{item.label}
								</button>
							</li>
						)
					})}
				</ul>
				<div className="chart-body">
					<Graph
						active={this.state.menu[this.currentIndex].active}
						lastArrayY={this.lastArrayY}
						nextArrayY={this.state.menu[this.currentIndex].array}
						arrayX={this.arrayX}
						lastPolyline={this.lastPolyline}
						nextPolyline={this.nextPolyline}
					/>
				</div>
			</div>
		)
	}
}

export default Chart;
