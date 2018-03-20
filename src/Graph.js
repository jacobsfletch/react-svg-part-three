import React, { Component } from 'react';

class Graph extends Component {

	componentWillReceiveProps(nextProps) {
		if (this.props.nextArrayY !== nextProps.nextArrayY) {
			this.svgRef.setCurrentTime(0)
		}
	}

	render() {

		const classes = this.props.active ? 'show' : 'hide';

		return (
			<svg
				ref={(svg) => {this.svgRef = svg}}
				className={classes}
				x="0px"
				y="0px"
				viewBox="0 0 1000 2"
			>
				<polyline points={this.props.lastPolyline} >
					<animate
						attributeName="points"
						attributeType="XML"
						from={this.props.lastPolyline}
						to={this.props.nextPolyline}
						begin=".01s"
						dur=".1s"
						fill="freeze"
					/>
				</polyline>
				{this.props.arrayX.map((coordX, i) => {
					return (
						<circle
							key={i}
							cx={coordX}
							cy={this.props.lastArrayY[i]}
							r="4"
						>
							<animate
								attributeName="cy"
								attributeType="XML"
								from={this.props.lastArrayY[i]}
								to={this.props.nextArrayY[i]}
								begin=".01s"
								dur=".1s"
								fill="freeze"
							/>
						</circle>
					)
				})}
			</svg>
		)
	}
}

export default Graph
