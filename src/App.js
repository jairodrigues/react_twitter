import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'
import TweetService from './services'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      novoTweet: '',
      tweets:[],
      carregando: true
    }
    this.service = new TweetService()
  }

  getTweets = async () =>{
    const tweets = await this.service.getAll()
    this.setState({tweets:tweets,carregando: false})
  }

  isInvalid = () => {
    const size = this.state.novoTweet.length > 140
    return size  
  }

  isValid = () => {
    if(this.state.tweets.length > 0){
        return this.state.tweets.map( (tweet, index)=>
        <Tweet key={tweet._id} conteudo={tweet.conteudo} tweetInfo={tweet}/> 
        )
      }else{
          return <Fragment><h1>Não Possui tweets</h1></Fragment>
     }
  }

  newTweet = async(event) => {
    event.preventDefault()
    if(this.isInvalid()){
    }else{    
      const tweetServer = await this.service.newTweet(this.state.novoTweet, 'omariosouto')
      this.setState({
      tweets: [tweetServer, ...this.state.tweets],
      novoTweet: ''
     })}
  }
  
  verifyStatus = () => {
    if(this.isInvalid())
      return 'novoTweet__status novoTweet__status--invalido'
    else{
      return'novoTweet__status'
    }
  }

  componentDidMount = () => { 
    this.getTweets()           
  }

  render() {    
    const { novoTweet } = this.state
    return (
      <Fragment>
        <Cabecalho usuario="@omariosouto" />
        <div className="container">
            <Dashboard>
                <Widget>
                    <form onSubmit={this.newTweet} className="novoTweet">
                        <div className="novoTweet__editorArea">
                            <span className={`${this.verifyStatus()}`}>{novoTweet.length}/140</span>
                            <textarea className="novoTweet__editor"
                              onChange = {(event)=> {this.setState({novoTweet: event.target.value})}} 
                              placeholder="O que está acontecendo?" 
                              value={novoTweet}>
                            </textarea>
                        </div>
                        <button
                          disabled={ this.isInvalid() ? true : false}
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
                    { this.state.carregando ? "Carregando" : this.isValid()  }
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
  }
}


