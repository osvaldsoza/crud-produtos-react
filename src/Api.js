import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:3000/'
})

const apis = {
     loadCategorias: () => api.get('categorias'),
     deleteCategoria: (id) => api.delete('categorias/' + id),
     createCategoria: (categoria) => api.post('categorias', categoria),
     editCategoria: (categoria) => api.put('categorias/' + categoria.id, categoria),
     createProduto: (produto) => api.post('produtos', produto),
     loadProdutoPeloId: (id) =>  api.get('produtos?categoria=' + id),
     loadCategoriaPeloId: (id) => api.get('categorias/' + id),
     deleteProduto: (id) => api.delete('produtos/' + id),
     editProduto: (produto) => api.put('produtos/' + produto.id, produto),
     readProduto: (id) => api.get('produtos/' + id)
}

export default apis