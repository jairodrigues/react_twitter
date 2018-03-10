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
      novoTweet: '',
      tweets: '',
      carregando: true
    }
  }

  componentDidMount() { //Pega depois que componente montou
    fetch('https://twitelum-api.herokuapp.com/tweets')
    .then(resposta => resposta.json())
    .then(tweets => {this.setState({tweets: tweets,carregando: false})})
     
  }

  // componentWillMount() { //Pega antes que o componente monte
  //   setInterval(() => {
  //   fetch('https://twitelum-api.herokuapp.com/tweets')
  //   .then(resposta => resposta.json())
  //   .then(tweets => {this.setState({tweets: tweets})}, 5000)
  //   })
  // }


  isTweetInvalid = () => {
    return this.state.novoTweet.length > 140 
  }

  tweetExist(){
    if(this.state.tweets.length > 0){
        return this.state.tweets.map( (tweet, index)=>
        <Tweet key={tweet._id} conteudo={tweet.conteudo} tweetInfo={tweet}/> 
        )
      }else{
          return <Fragment><h1>Não Possui tweets</h1></Fragment>
     }
  }

  adicionaTweet = (event) => {
    event.preventDefault()
    console.log(this.state.novoTweet.length)
    if(this.isTweetInvalid() || this.state.novoTweet.length === 0){
      console.log('Invalido')
    }else{      
      fetch('https://twitelum-api.herokuapp.com/tweets',{
        method: 'POST',
        body: JSON.stringify({ conteudo: this.state.novoTweet, login: 'omariosouto'})
    })
    .then((response)=> response.json())
    .then((tweetServer) => {
      console.log(tweetServer)
      this.setState({
        tweets: [tweetServer, ...this.state.tweets],
        novoTweet: ''
      })
    })
  }
}

  render() {
    
    return (
      <Fragment>
        <Cabecalho usuario="@omariosouto" />
        <div className="container">
            <Dashboard>
                <Widget>
                    <form onSubmit={this.adicionaTweet} className="novoTweet">
                        <div className="novoTweet__editorArea">
                            <span 
                              className={
                                `novoTweet__status 
                                ${this.isTweetInvalid() ? 'novoTweet__status--invalido' : ''}
                                `}>{this.state.novoTweet.length}/140</span>
                            <textarea className="novoTweet__editor"
                              onChange = {(event)=> {this.setState({novoTweet: event.target.value})}} 
                              placeholder="O que está acontecendo?" 
                              value={this.state.novoTweet}>
                            </textarea>
                        </div>
                        <button
                          disabled={ this.isTweetInvalid() ? true : false}
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
                    { this.state.carregando ? "Carregando" : this.tweetExist()  }
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}

export default App;
