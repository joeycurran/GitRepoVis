import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Row, Col } from 'react-bootstrap';
import './LineChart.js';
import LineChart from './LineChart.js';
import Typist from 'react-typist'
import TypistLoop from 'react-typist-loop'
import D3 from "./D3"
import "./Magic.css";

function displayGraph() {
  this.setState({
    displayGraph: !this.state.displayGraph
})
  


}


const API = 'https://api.github.com/users';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'joeycurran',
      name: '',
      avatar: '',
      location: '',
      repos: '',
      followers: '',
      following: '',
      homeUrl: '',
      notFound: '' };

  }
  fetchProfile(username) {
    let url = `${API}/${username}`;
    fetch(url).
    then(res => res.json()).
    then(data => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        location: data.location,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeUrl: data.html_url,
        notFound: data.message });

    }).
    catch(error => console.log('Oops! There Was A Problem'));
  }
  componentDidMount() {
    this.fetchProfile(this.state.username);
  }


  render() {
    return (
      React.createElement("div", null,
      React.createElement("section", { id: "card" },
      React.createElement(SearchProfile, { fetchProfile: this.fetchProfile.bind(this) }),
      React.createElement(Profile, { data: this.state })),
      React.createElement(Button, {id: "button"}),
      React.createElement("span", { className: "joeycurran" }, "GitHub", React.createElement("a", { href: "https://github.com/joeycurran", target: "_blank", title: "Joey Curran" }, "  -Joey Curran"),
      React.createElement("section", { id: "card" } , React.createElement ( Button, {id: "button"})))),
      React.createElement(Graph, {id: "graph"}));

  }}


class SearchProfile extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "search--box" },
      React.createElement("form", { onSubmit: this.handleForm.bind(this) },
      React.createElement("label", null, React.createElement("input", { type: "search", ref: "username", placeholder: "Type Username + Enter" })))));



  }


  handleForm(e) {
    e.preventDefault();
    let username = this.refs.username.getDOMNode().value;
    this.props.fetchProfile(username);
    this.refs.username.getDOMNode().value = '';
  }}


class Button extends React.Component {
render() {
  return ( 
  
<button className="button" onClick={this.displayGraph} >
      Graphs
</button>
  );
  
  
}}

class Graph extends React.Component {
  render(){
    return(
    
<Row className="show-grid d-flex flex-row">
              <Col xs={12} className="d-flex flex-column">
                <div className="d-flex flex-row">  
                    <div className="justify-content-left ml-5">
                        <div className="d-flex flex-column">
                        {this.props.avatar_url ?
                            <img src={this.props.avatar_url}
                                alt="Profile"
                                /> : null }
                        </div>
                        <br/>
                        <div className="d-flex flex-column center">
                            {this.props.profile_url ? <div><p><a className="btn btn-info" href={this.props.profile_url} target="_blank">View on GitHub</a></p></div> : null }
                        </div>
                    </div>
                   
                    
                </div>
              </Col>
              <Col xs={12} md={3} className="card cardColor ml-4 shadow">
                <div className="card-body text-white">
                    <Col xs={12}>
                        <div>
                            <b>Starred</b>
                            {
                                Object.entries(this.props.starred.slice(0,12)).map(([key,eachitem]) =>
                                <div key={key}>
                                    <p><a href={eachitem.html_url}>{eachitem.full_name}</a> - {eachitem.description.substring(0, 50) + "..."}</p>
                                </div> ) 
                            }
                        </div>
                    </Col>
                </div>
              </Col>
              <Col className="card flex-column cardColor ml-2 shadow">
                <div className="card-body text-white">
                    <Col xs={12}>
                        <div>
                            <b><i>Visualizations</i></b>
                            <br/>
                            <D3 name={this.props.name}
                                repoDates={this.countOverTime(this.props.repos)}
                                following={this.props.following}
                                followers={this.props.followers}
                                events={this.collateEvents(this.props.events)}
                                />
                        </div>
                    </Col>
                </div>
              </Col>
            </Row> 
    )      
}

}

class Profile extends React.Component {
  render() {
    let data = this.props.data;
    let followers = `${data.homeUrl}/followers`;
    let repositories = `${data.homeUrl}?tab=repositories`;
    let following = `${data.homeUrl}/following`;
    if (data.notFound === 'Not Found')
    return (
      React.createElement("div", { className: "notfound" },
      React.createElement("h2", null, "Oops !!!"),
      React.createElement("p", null, "The Component Couldn't Find The You Were Looking For . Try Again ")));else



    return (
      React.createElement("section", { className: "github--profile" },
      React.createElement("div", { className: "github--profile__info" },
      React.createElement("a", { href: data.homeUrl, target: "_blank", title: data.name || data.username }, React.createElement("img", { src: data.avatar, alt: data.username })),
      React.createElement("h2", null, React.createElement("a", { href: data.homeUrl, title: data.username, target: "_blank" }, data.name || data.username)),
      React.createElement("h3", null, data.location || 'Github Visual')),

      React.createElement("div", { className: "github--profile__state" },
      React.createElement("ul", null,
      React.createElement("li", null,
      React.createElement("a", { href: followers, target: "_blank", title: "Number Of Followers" }, React.createElement("i", null, data.followers), React.createElement("span", null, "Followers"))),

      React.createElement("li", null,
      React.createElement("a", { href: repositories, target: "_blank", title: "Number Of Repositoriy" }, React.createElement("i", null, data.repos), React.createElement("span", null, "Repositoriy"))),

      React.createElement("li", null,
      React.createElement("a", { href: following, target: "_blank", title: "Number Of Following" }, React.createElement("i", null, data.following), React.createElement("span", null, "Following"))))))
      
      
      );





  }}
  

 



  ReactDOM.render(  <App />,   document.getElementById("root"));
export default App;