import { Component } from 'react';

export default class TweetService extends Component{

    constructor(){
        super();
        this.url = 'https://twitelum-api.herokuapp.com/';
    }

    getAll = async () => {
        const url = `${this.url}tweets`
        return await this._get(url)
    }

    newTweet = async (conteudo, login) => {
        const url = `${this.url}tweets`
        const options = {
            method:'POST',
            body: JSON.stringify({ conteudo: conteudo, login:login})
        }
        const response = await fetch(url,options)        
        const json = await response.json()
        return json
    }

    _get =  async (url) => {
        const response = await fetch(url, {method: 'GET'})
        const json = await response.json();
        return json;
   }


}