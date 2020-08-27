import React from 'react';
import email from './resources/contact/email.png';
import home from './resources/contact/home.png';
import linkedin from './resources/contact/linkedin.png';
import  blogData  from './BlogData.json';
import GameComponent from './GameComponent';

class About extends React.Component {
	render() {
		return (
			<div>
				<ul>
					<li className="blogEntry">
						<p className="blogText">Andrew (Drew) is an experienced software engineer living in the Bay Area. He enjoys long
						walks in the park, riding bikes and working song lyrics into conversations. This fine fellow has worked on
						software of all shapes and size. Ranging from the humble start-up to the world of enterprise software.
						</p>
					</li>
				</ul>
			</div>
		);
	}
}


class Projects extends React.Component {
	render() {
		return (
			<div>
				<ul>
					<li className="project">
						<a href="https://berkyland.wordpress.com/author/berkyland/">
							<h1>Berkyland Blog (old)</h1>
						</a>
					</li>
					<li className="project">
						<a href='https://github.com/Berky115'>
							<h1>Github</h1>
						</a>
					</li>
					<li className="project">
						<a href="http://www.lensthegame.com/">
							<h1>Lens</h1>
						</a>
					</li>
					<li className="project">
						<a href="https://github.com/Berky115/life-coach-vergil">
							<h1>Life Coach Vergil</h1>
						</a>
					</li>
					<li className="project">
						<a href="https://nitwic.podbean.com">
							<h1>Nitwic!</h1>
						</a>
					</li>
					<li className="project">
						<a href="http://www.adventuretimegamejam.com/submissions/62-the-pit-of-the-ice-king">
							<h1>Pit of The Ice King</h1>
						</a>
					</li>
					<li className="project">
						<a href="https://alec-asperslag.itch.io/lovesnails">
							<h1>Love Snails</h1>
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

class Blog extends React.Component {
	render() {
		let blogEntries = blogData.postsArray.map(entry => (
			<li key={entry + Math.random()} className="blogEntry">
				<div >
					<div className="flex-item blogDate"> {entry.datePosted} </div>
				</div>
				<div className="titleText">{entry.postTitle}</div>
				<br></br>
				{entry.postText.map(line => (
					<div key={line + Math.random()} className="blogText">
						{' '}
						{line}
						<br></br>
						<br></br>
					</div>
				))}
			</li>
		));

		return (
			<div>
				<ul>{blogEntries}</ul>
			</div>
		);
	}
}

class Contact extends React.Component {
	render() {
		return (
			<p>Test</p>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDisplay: 'Home',
		};
	}

	handleClick = function(event) {
		this.setState({
			currentDisplay: event.currentTarget.textContent,
		});
	};

	render() {
		const current = this.state.currentDisplay;
		return (
			<div className='wrapper'>
			<link href="https://fonts.googleapis.com/css?family=Arvo&display=swap" rel="stylesheet"></link>
			<link href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap" rel="stylesheet"></link>
			<link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet"></link>
				<link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet"></link>
				<link href="https://fonts.googleapis.com/css?family=Special+Elite&display=swap" rel="stylesheet"></link>
				<link
					href="https://fonts.googleapis.com/css?family=Architects+Daughter|Coming+Soon|Gloria+Hallelujah"
					rel="stylesheet"
				></link>
				<main className='page-body'>
				<GameComponent />
				<div className='header-body'>
					<ul className="header">
						<li onClick={i => this.handleClick(i)}>Home</li>
						<li onClick={i => this.handleClick(i)}>Blog</li>
						<li onClick={i => this.handleClick(i)}>Projects</li>
						<li onClick={i => this.handleClick(i)}>About</li>
						<li onClick={i => this.handleClick(i)}>Contact</li>
					</ul>
				</div>
				{current === 'Contact' && <Contact />}
				{current === 'Blog' && <Blog />}
				{current === 'Projects' && <Projects />}
				{current === 'About' && <About />}
				<div className="content">{this.props.children}</div>
				</main>
			</div>
		);
	}
}

export default App;
