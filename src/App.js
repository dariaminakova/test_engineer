import React, { Component } from 'react';
import './App.css';
import { getPosts } from './api';
import { Link, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true,
      page: 0,
    };
  }

  timeInterval = null;
  scrolling = null;

  async componentDidMount() {
    this.getArticles();
    this.timeInterval = setInterval(this.getArticles, 10000);
  }

  getArticles = async () => {
    const answer = await getPosts(this.state.page);
    this.setState((prevState) => ({
      posts: [...prevState.posts, ...answer.data.hits],
      page: answer.data.page + 1,
    }));
    console.log(this.state.posts);
  };

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route path='/'>
            <table>
              <thead>
                <tr>
                  <th>TITLE POST</th>
                  <th>URL POST</th>
                  <th>DATE POST</th>
                  <th>AUTHOR POST</th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map((el, index) => (
                  <Link to=''>
                    <tr>
                      <td>{el.title}</td>
                      <td>{el.url}</td>
                      <td>{el.created_at}</td>
                      <td>{el.author}</td>
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
