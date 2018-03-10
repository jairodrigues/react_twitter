import React, { Component} from 'react';


class PerfilPage extends Component{
    
    constructor(props){
        super(props)
        console.log(props.match.params.login)
    }

    componentDidMount() { //Pega depois que componente montou
        fetch('https://twitelum-api.herokuapp.com/tweets')
        .then(resposta => resposta.json())
        .then(perfil => {this.setState({user: perfil})})
         
      }

    render(){
        return(
            <div>
            Página de perfil!
            </div>
        )
    }

}

export default PerfilPage