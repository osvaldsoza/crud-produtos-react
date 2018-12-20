import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Categoria extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: null
        }
        this.loadDataProduto = this.loadDataProduto.bind(this)
        this.renderProduto = this.renderProduto.bind(this)
    }

    loadDataProduto(id) {
        this.setState({ id })
        this.props.loadProdutoPeloId(id)
        this.props.loadCategoriaPeloId(id)
    }

    mostrarProduto(produto) {
        return (
            <p className="well" key={produto.id}>{produto.nome}</p>
        )
    }

    componentDidMount() {
        const id = this.props.match.params.categoriaId
        this.loadDataProduto(id)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.categoriaId !== this.state.id) {
            const id = newProps.match.params.categoriaId
            this.loadDataProduto(id)
        }
    }

    renderProduto(produto) {
        const { categoriaId } = this.props.match.params
        return (
            <div className="row" key={produto.id} >
                <div className="col-sm-6">
                    <p className="well well-sm" >{produto.nome}</p>
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-danger" style={{ marginRight: '8px' }}
                        onClick={() => this.props.removeProduto(produto)
                            .then((res) => this.loadDataProduto(categoriaId))
                        } >Excluir</button>
                    <Link to={'/produtos/editar/' + produto.id} className="btn btn-warning">Editar</Link>
                </div>
            </div>)
    }

    render() {
        const { produtos, categoria } = this.props

        return (
            <div>
                <h2>{categoria.categoria}</h2>
                {produtos.length === 0 &&
                    <div className="alert alert-warning" style={{ paddingTop: '0px' }}>
                        <h3>Sem produtos.</h3>
                    </div>
                }
                {produtos.map(this.renderProduto)}
            </div>
        )
    }
}

export default Categoria