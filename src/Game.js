import React from 'react'

export default function Game(props) {
  return (
    <li className="game">
      <h2>Title: {props.title}</h2>
      <h2>Genres: {props.genres}</h2>
    </li>
  )
}
