import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../App'
import { RootReducer } from '..'

type FavoritosState = {
  itens: Produto[]
}

const initialState: FavoritosState = {
  itens: []
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    adicionarFavoritos: (state, action: PayloadAction<Produto>) => {
      const favorito = action.payload

      if (state.itens.find((item) => item.id === favorito.id)) {
        state.itens = state.itens.filter((item) => item.id !== favorito.id)
      } else {
        state.itens.push(favorito)
      }
    }
  }
})

export const { adicionarFavoritos } = favoritosSlice.actions

export const estaNosFavoritos = (state: RootReducer, produto: Produto) => {
  return state.favoritos.itens.some((item) => item.id === produto.id)
}

export default favoritosSlice.reducer
