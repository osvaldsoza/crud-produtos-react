import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import ProdutosNovo from './ProdutosNovo'
import ProdutosEditar from './ProdutosEditar'

class Produtos extends Component {

    constructor(props) {
        super(props)

        this.state = {
            editCategoria: ''
        }
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.editarCategoria = this.editarCategoria.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.handleEditCategoria = this.handleEditCategoria.bind(this)
    }

    componentDidMount() {
        this.props.loadCategorias()
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            this.props.createCategoria(
                {
                    categoria: this.refs.categoria.value
                }
            )
            this.refs.categoria.value = ''
        }
    }
    
    handleEditCategoria(key) {
        if (key.keyCode === 13) {
            this.props.editCategoria(
                {
                    id: this.state.editCategoria,
                    categoria: this.refs['categoria.' + this.state.editCategoria].value
                }
            )
            this.setState({
                editCategoria: ''
            })
        }
    }

    editarCategoria(categoria) {
        this.setState({
            editCategoria: categoria.id
        })
    }
    cancelEdit() {
        this.setState({
            editCategoria: ''
        })
    }

    render() {
        const { match, categorias } = this.props

        return (
            <div className="row">
                <div className="col-md-3">
                    <h3>Categorias</h3>
                    <ul style={{ listStyle: 'none', padding: '0px' }}>
                        {categorias.map((cat) => {
                            return (
                                <li key={cat.id}>
                                    {this.state.editCategoria === cat.id &&
                                        <div className="form-inline">
                                            <div className="form-group">
                                                <input onKeyUp={this.handleEditCategoria} ref={'categoria.' + cat.id} className="col-sm-3 form-control" type="text" defaultValue={cat.categoria} />
                                                <button className="btn btn-warning" onClick={this.cancelEdit}>Cancel</button>
                                            </div>
                                        </div>
                                    }
                                    {this.state.editCategoria !== cat.id &&
                                        <div>
                                            <button className="btn btn-sm" onClick={() => this.props.removeCategoria(cat)}>
                                                <span className="glyphicon glyphicon-remove"></span>
                                            </button>
                                            <button className="btn btn-sm" onClick={() => this.editarCategoria(cat)}>
                                                <span className="glyphicon glyphicon-edit"></span>
                                            </button>
                                            <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
                                        </div>
                                    }
                                </li>
                            )
                        })}
                    </ul>

                    <div className="well">
                        <input ref="categoria"
                            placeholder="Nova categoria"
                            className="form-control"
                            onKeyUp={this.handleNewCategoria} />
                    </div>

                    <Link to='/produtos/novo'>Novo Produto</Link>
                </div>
                <div className="col-md-9">
                    <h1>Produto</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + "/editar/:id"} render={(props) => {
                        return <ProdutosEditar
                            {...props}
                            readProduto={this.props.readProduto}
                            editProduto={this.props.editProduto}
                            categorias={categorias}
                        />
                    }} />
                    <Route exact path={match.url + '/novo'} render={(props) => {
                        return <ProdutosNovo
                            {...props}
                            categorias={categorias}
                            createProduto={this.props.createProduto}
                        />
                    }} />
                    <Route path={match.url + "/categoria/:categoriaId"} render={(props) => {
                        return (<Categoria
                            {...props}
                            loadProdutoPeloId={this.props.loadProdutoPeloId}
                            produtos={this.props.produtos}
                            loadCategoriaPeloId={this.props.loadCategoriaPeloId}
                            categoria={this.props.categoria}
                            removeProduto={this.props.removeProduto}
                        />)
                    }
                    } />
                </div>
            </div>
        )
    }
}

export default Produtos