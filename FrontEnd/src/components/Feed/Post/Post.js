import React from 'react'
import { Link } from 'react-router-dom' // Import Link từ React Router

import Button from '../../Button/Button'
import './Post.css'

const post = (props) => (
    <article className="post">
        <header className="post__header">
            <h3 className="post__meta">
                Posted by {props.author} on {props.date}
            </h3>
            <h1 className="post__title">{props.title}</h1>
        </header>
        {/* <div className="post__image">
      <Image imageUrl={props.image} contain />
    </div>
    <div className="post__content">{props.content}</div> */}
        <div className="post__actions">
            <Link to={props.id}>
                <Button mode="flat">View</Button>
            </Link>
            <Button mode="flat" onClick={props.onStartEdit}>
                Edit
            </Button>
            <Button mode="flat" design="danger" onClick={props.onDelete}>
                Delete
            </Button>
        </div>
    </article>
)

export default post
