import { useDispatch, useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../../App'
import { adicionarProduto } from '../../store/reducers/carrinho'
import {
  adicionarFavoritos,
  estaNosFavoritos
} from '../../store/reducers/favoritos'
import { RootReducer } from '../../store'
import * as S from './styles'

type Props = {
  produto: ProdutoType
  favorito: ProdutoType
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto, favorito }: Props) => {
  const dispatch = useDispatch()

  const produtoEstaNosFavoritos = useSelector((state: RootReducer) =>
    estaNosFavoritos(state, produto)
  )

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar
        onClick={() => dispatch(adicionarFavoritos(favorito))}
        type="button"
      >
        {produtoEstaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar
        onClick={() => dispatch(adicionarProduto(produto))}
        type="button"
      >
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
