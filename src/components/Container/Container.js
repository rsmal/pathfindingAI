import React from 'react';
import './Container.css';
import Col from '../Col/Col';
import Interface from '../Interface/Interface';
import { createMatrixGrid, getPath } from '../../helpers/gridHelpers'
import defaultGrid from './defaultGrid'
import { AStarFinder, IDAStarFinder } from 'pathfinding'

class Container extends React.Component {
	constructor(props) {
		super(props)
		let algoritms = [
			{
				name: 'A*',
				finder: new AStarFinder()
			},
			{
				name: 'IDA',
				finder: new IDAStarFinder()
			}
		]
		this.state = {
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			algoritms,
			startPoint: {
				x: 1,
				y: 1
			},
			endPoint: {
				x: 10,
				y: 10
			},
			grid: defaultGrid,
			chooseAlgo: algoritms[0].name
		};
	}

	componentDidMount = () => {
		window.onresize = () => {
			this.setState({
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight
			});
		};
		this.setState({
			numberOfColumns: Math.floor(this.state.windowWidth / 25),
			numberOfRows: Math.floor(this.state.windowHeight / 25)
		})
	};

	createCols = () => {
		let gridRender = []

		for (let y = 0; y < this.state.numberOfRows; y++) {
			for (let x = 0; x < this.state.numberOfColumns; x++) {
				gridRender.push(<Col key={`${y},${x}`} length={25} handleClick={() => this.handleColClick(x, y)} grid={this.state.grid} y={y} x={x} />);
			}
		}

		return gridRender;
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
		console.log(x, y)
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

	launch = () => {
		if (this.state.chooseAlgo) {
			const matrixGrid = createMatrixGrid(this.state.grid, this.state.numberOfColumns, this.state.numberOfRows)
			const filtered = this.state.algoritms.filter((value, index) => {
				return value.name === this.state.chooseAlgo
			})
			const path = getPath(this.state.startPoint, this.state.endPoint, matrixGrid, filtered[0].finder)
			const { grid } = this.state
			for (let i = 0; i < path.length; i++) {
				grid.push({
					x: path[i][0],
					y: path[i][1],
					type: "path"
				})
			}
			this.setState({
				grid
			})
		}
	}

	changeAlgo = (algo) => {
		return () => {
			this.setState({
				chooseAlgo: algo
			})
		}
	}

	render() {
		return (
			<div className="container">
				{this.createCols()}
				<Interface list={this.state.algoritms} clearPoints={this.clearPoints} start={this.launch} chooseAlgo={this.state.chooseAlgo} changeAlgo={this.changeAlgo} />
			</div>
		);
	}
}

export default Container;
