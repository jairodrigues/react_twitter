import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {
  constructor(){
    super()
    this.state = {
      novoTweet: ''
    }
    console.log('MY EGGS',this.state.novoTweet.length)
  }

  isTweetValid(){
    return this.state.novoTweet.length > 140 
  }
  render() {
    
    return (
      <Fragment>
        <Cabecalho usuario="@omariosouto" />
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet">
                        <div className="novoTweet__editorArea">
                            <span 
                              className={
                                `novoTweet__status 
                                ${this.isTweetValid() ? 'novoTweet__status--invalido' : ''}
                                `}>{this.state.novoTweet.length}/140</span>
                            <textarea className="novoTweet__editor"
                              onChange = {(event)=> {this.setState({novoTweet: event.target.value})}} 
                              placeholder="O que está acontecendo?" 
                              value={this.state.novoTweet}>
                            </textarea>
                        </div>
                        <button
                          disabled={ this.isTweetValid() ? true : false}
                          type="submit" 
                          className="novoTweet__envia">
                          Tweetar
                        </button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        <Tweet />
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
