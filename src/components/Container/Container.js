import React from 'react';
import './Container.css';
import Col from '../Col/Col';
import Interface from '../Interface/Interface';


class Container extends React.Component {
	state = {
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
		algoritms: [
			{
				name: 'A*'
			},
			{
				name: 'IDA'
			}

		],
		startPoint: {
			x: null,
			y: null
		},
		endPoint: {
			x: null,
			y: null
		},
		grid: []
	};

	componentDidMount = () => {
		window.onresize = () => {
			this.setState({
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight
			});
		};
	};

	createCols = () => {
		let numberOfColumns = Math.floor(this.state.windowWidth / 25),
			numberOfRows = Math.floor(this.state.windowHeight / 25),
			grid = [];

		for (let y = 0; y < numberOfRows; y++) {
			for (let x = 0; x < numberOfColumns; x++) {
				grid.push(<Col key={`${y},${x}`} length={25} handleClick={() => this.handleColClick(x, y)} grid={this.state.grid} y={y} x={x} />);
			}
		}

		return grid;
	};

	addSpecialPoint = (x, y, type, typeOfPoint) => {
		let isInside = this.checkIsInside(x, y)
		if (!isInside) {
			const { grid } = this.state
			grid.push({
				x,
				y,
				type
			})
			this.setState({
				[typeOfPoint]: {
					x,
					y
				},
				grid
			});
		}
	}

	handleColClick = (x, y) => {
		if (this.state.startPoint.x === null || this.state.startPoint.y === null) {
			this.addSpecialPoint(x, y, "startPoint", "startPoint")
		} else if (this.state.endPoint.x === null || this.state.endPoint.y === null) {
			this.addSpecialPoint(x, y, "endPoint", "endPoint")
		} else {
			const { grid } = this.state
			let isInside = false
			for (let i = 0; i < grid.length; i++) {
				if (grid[i].x === x && grid[i].y === y) {
					if (grid[i].type === "wall") {
						grid.splice(i, 1)
					}
					isInside = true
					break
				}
			}
			if (!isInside) {
				grid.push({
					x,
					y,
					type: "wall"
				})
			}
			this.setState({
				grid
			})
		}
		// process.nextTick(() => {
		// 	console.log(this.state)
		// })

	}

	checkIsInside = (x, y) => {
		const { grid } = this.state
		let isInside = false
		for (let i = 0; i < grid.length; i++) {
			if (grid[i].x === x && grid[i].y === y) {
				isInside = true
				break;
			}
		}
		return isInside
	}

	clearPoints = () => {
		this.setState({
			startPoint: {
				x: null,
				y: null
			},
			endPoint: {
				x: null,
				y: null
			},
			grid: []
		})
	}

	render() {
		return (
			<div className="container">
				{this.createCols()}
				<Interface list={this.state.algoritms} clearPoints={this.clearPoints} />
			</div>
		);
	}
}

export default Container;
