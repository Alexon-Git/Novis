import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IFile {
  file: File | null | undefined
  country: string
  education: string
  count: number | string
  form: string
  level: string
}

interface IDocs {
  docs: IFile[] | null
}

const initialState: IDocs = {
  docs: []
}

const DocsSlice = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<IFile>) => {
      state.docs?.push(action.payload)
    },
    removeFile: (state, { payload }: PayloadAction<number>) => {
      if (state.docs && payload >= 0 && payload < state.docs.length) {
        state.docs.splice(payload, 1);
      }
    }
  }
})

export const { addFile, removeFile } = DocsSlice.actions

export default DocsSlice.reducer
