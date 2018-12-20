import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutosEditar extends Component {

    constructor(props){
        super(props)
        this.state = {
          redirect: false
        }

        this.handleEditarProduto = this.handleEditarProduto.bind(this)
    }

    componentDidMount() {
        this.props.readProduto(this.props.match.params.id)
            .then((res) => {
                this.refs.produto.value = res.data.nome
                this.refs.categoria.value = res.data.categoria
            })
    }

    handleEditarProduto(){
        const produto = {
            id:this.props.match.params.id,
            nome: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.editProduto(produto)
            .then((res) => {
                this.setState({
                    redirect: '/produtos/categoria/' + produto.categoria
                })
            })
    }
    render() {
        const { categorias } = this.props

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Editar</h2>
                <select className="form-control" style={{ marginBottom: '5px' }} ref="categoria">
                    {categorias.map((cat) =>
                        <option
                            key={cat.id}
                            value={cat.id}>
                            {cat.categoria}
                        </option>)}
                </select> 
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nome do produto"
                    style={{ marginBottom: '5px' }}
                    ref="produto" 
                   />
                <button className="btn btn-primary" onClick={this.handleEditarProduto}>Salvar</button>
            </div>
        )
    }
}

export default ProdutosEditar