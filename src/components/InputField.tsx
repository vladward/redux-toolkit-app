import React from 'react'

interface InputFieldType {
  text: string
  handleInput: (id: string) => void
  handleSubmit: () => void
}

export const InputField = ({
  text,
  handleInput,
  handleSubmit
}: InputFieldType): JSX.Element => {
  return (
    <label htmlFor="">
      <input
        type="text"
        value={text}
        onChange={(e) => {
          handleInput(e.target.value)
        }}
      />
      <button onClick={handleSubmit}>Add todo</button>
    </label>
  )
}
