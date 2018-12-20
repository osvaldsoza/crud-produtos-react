import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class ProdutoNovo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }

        this.handleNewProduto = this.handleNewProduto.bind(this)
    }
    handleNewProduto() {
        const produto = {
            nome: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto)
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
                <h2>Novo</h2>
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
                    ref="produto" />
                <button className="btn btn-primary" onClick={this.handleNewProduto}>Salvar</button>
            </div>
        )
    }
}

export default ProdutoNovo