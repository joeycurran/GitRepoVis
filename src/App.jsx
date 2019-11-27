import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './LineChart.js';
import D3 from './D3';

const API = 'https://api.github.com/users';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      username: 'joeycurran',
      name: '',
      avatar: '',
      location: '',
      repos: null,
      repoCount: '',
      followers: '',
      following: '',
      homeUrl: '',
      notFound: '',
      displayGraph: false
    };

  }

  displayGraph() {
    this.setState({
      displayGraph: !this.state.displayGraph
    })
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
          repoCount: data.public_repos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          notFound: data.message
        });
      })

    url = `${API}/${username}/repos`;
    fetch(url). 
    then(res => res.json()).
    then(data => {
      this.setState({
        repos:data,
      });
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
        React.createElement(Button, { id: "button", displayGraph: this.displayGraph.bind(this) }),
        React.createElement(Graph, { data: this.state, 
                                      displayGraph: this.state.displayGraph,
                                      repos: this.state.repos, 
                                      followers: this.state.followers,
                                      following: this.state.following}),
        React.createElement("span", { className: "joeycurran" }, "GitHub", React.createElement("a", { href: "https://github.com/joeycurran", target: "_blank", title: "Joey Curran" }, "  -Joey Curran"),
          React.createElement("section", { id: "card" }, React.createElement(Button, { id: "button" })))));
  }
}

class SearchProfile extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "search--box" },
        React.createElement("form", { onSubmit: this.handleForm.bind(this) },
          React.createElement("label", null, React.createElement("input", { type: "search", ref: "username", placeholder: "Type Username + Enter" })))));
  }

  handleForm(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    this.props.fetchProfile(username);
    this.refs.username.value = '';
  }
}

class Graph extends React.Component {
  countOverTime(list){
        let listDates = [];
        list.forEach((eachitem) =>{
            listDates.push(eachitem.created_at.split('T')[0]);
        })

        listDates.sort();

        let sorted = []
        listDates.forEach((date, i) => {
            sorted.push({date: date, value: i+1})
        })

        return sorted;
    }

  render() {
    return (
      this.props.displayGraph ? <D3 name={this.props.name}
                                    repoDates={this.countOverTime(this.props.repos)}
                                    following={this.props.following}
                                    followers={this.props.followers}
                                    /> : null
    );
  }
}

class Button extends React.Component {
  render() {
    return (
      <button className="button" onClick={() => this.props.displayGraph()} >
        Graphs
      </button>
    );
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
          React.createElement("p", null, "The Component Couldn't Find The You Were Looking For . Try Again "))); else

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
                React.createElement("a", { href: repositories, target: "_blank", title: "Number Of Repositoriy" }, React.createElement("i", null, data.repoCount), React.createElement("span", null, "Repositoriy"))),

              React.createElement("li", null,
                React.createElement("a", { href: following, target: "_blank", title: "Number Of Following" }, React.createElement("i", null, data.following), React.createElement("span", null, "Following")))))));
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;