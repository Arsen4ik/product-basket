import { createSlice } from '@reduxjs/toolkit'

const defaultState = false

const showModalSlice = createSlice({
    name: 'showModal',
    initialState: { showModal: defaultState },
    reducers: {
        changeShowModal: (state, action) => {
            state.showModal = !state.showModal
        }
    }
})

export const { changeShowModal } = showModalSlice.actions

export default showModalSlice.reducer