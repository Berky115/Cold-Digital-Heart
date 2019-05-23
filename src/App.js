import React from 'react';
import email from './resources/contact/email.png';
import linkedin from './resources/contact/linkedin.png';
import lodash from 'lodash';
import {blogData} from './BlogData';
import GameComponent from './GameComponent';
const _ = lodash;

class About extends React.Component {
// <img src={email} className="App-logo" alt="logo" />
  render() {
    return (
      <div>
        <ul>
          <li className="aboutMe">
            Andrew (Drew) is a studied software developer currently living in the Bay Area. He enjoys long walks in the park, riding bikes and working song lyrics
            into conversations. He has worked on corporate software, websites and video games. He enjoys teaching and learning new skills.
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
             <li className="project"><a href="audioInvaders/index.html"><h1>Audio Invaders</h1></a></li>
             <li className="project"><a href="https://berkyland.wordpress.com/author/berkyland/"><h1>Berkyland Blog (old)</h1></a></li>
             <li className="project"><a href="http://www.lensthegame.com/"><h1>Lens</h1></a></li>
             <li className="project"><a href="http://www.adventuretimegamejam.com/submissions/62-the-pit-of-the-ice-king"><h1>Pit of The Ice King</h1></a></li>
             <li className="project"><a href="js/datcat/GGJ_Builds.html"><h1>Dat Cat</h1></a></li>
             <li className="project"><a href="https://nitwic.podbean.com"><h1>Nitwic!</h1></a></li>
       </ul>
      </div>
    );
  }
}

class Blog extends React.Component {
  render() {
    let blogEntries = blogData.postsArray.map(entry =>
      <li key={entry + Math.random()}className="blogEntry">
        <div className='flexcontainer'>
          <div className="flex-item blogDate"> {entry.datePosted} </div>
        </div>
        <div className="titleText">{entry.postTitle}</div>
        
        <br></br>
        {
          entry.postText.map(line =>
            <div key={line + Math.random()} className="blogText"> {line}
            <br></br>
            <br></br>
            </div> )
        }
      </li>
    );

      return (
        <div>
          <ul> 
            {blogEntries}
          </ul>
        </div>
      );
  }
}

class Contact extends React.Component {

  render() {
    return (
      <div>
        <h1> Andrew Facchiano </h1>
        <div>
          <a href="mailto:andrewfacchiano@gmail.com" >
            <img alt='e-mail' src={email} className="contactNode"></img><p> By E-mail at andrewfacchiano@gmail.com </p>
          </a>
        </div>

        <div>
          <a href="https://www.linkedin.com/in/andrew-facchiano-0961a761">
            <img alt='linked in' src={linkedin} className="contactNode"></img><p> On Linkdin </p>
          </a>
        </div>
    </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDisplay: 'Home'
    }
  }

  handleClick = function(event){
    this.setState({
      currentDisplay: event.currentTarget.textContent,
    }); 
  }
  
  render() {
    const current = this.state.currentDisplay;
    return (
      <div>
        <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Architects+Daughter|Coming+Soon|Gloria+Hallelujah" rel="stylesheet"></link>
          <GameComponent/>
            <ul className = "header" >
                <li onClick={(i) => this.handleClick(i)}>Home</li>
                <li onClick={(i) => this.handleClick(i)}>Blog</li>
                <li onClick={(i) => this.handleClick(i)}>Projects</li>
                <li onClick={(i) => this.handleClick(i)}>About</li>
                <li onClick={(i) => this.handleClick(i)}>Contact</li>
            </ul>
            {current === 'Contact' && <Contact/>}
            {current === 'Blog' && <Blog/>}
            {current === 'Projects' && <Projects/>}
            {current === 'About' && <About/>}
            <div className="content">
            {this.props.children}
            </div>
      </div>
  );
  }
}

export default App;
