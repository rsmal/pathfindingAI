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
		}
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
				grid.push(<Col key={`${y},${x}`} length={25} handleClick={this.handleColClick} />);
			}
		}

		return grid;
	};

	handleColClick = (x, y) => {
		return () => {
			console.log(x, y)
		}
	}

	render() {
		return (
			<div className="container">
				{this.createCols()}
				<Interface list={this.state.algoritms} />
			</div>
		);
	}
}

export default Container;
