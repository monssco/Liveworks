import React from 'react'

interface Props {
    text: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = (props: Props) => (

    <button onClick={props.onClick} type="button" className=" text-lg transition duration-300 ease-in-out h-16 bg-black border-black border-4 hover:bg-white text-white hover:text-black py-2 px-10 mr-1">
        {props.text}
    </button>
)

export default Button
