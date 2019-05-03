import React from 'react'
import { useField } from '../hooks'

const BlogForm = ({ handleSubmit }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const likes = useField('number')

  const preSubmit = (event) => {
    //Tässä voisi tehdä myös sen preventDefaultin ja kutsua
    //handleSubmitia suoraan uuden blogin arvoilla, ei eventillä)
    title.reset()
    author.reset()
    url.reset()
    likes.reset()
    handleSubmit(event)
  }

  /* Object spread voisi tehdä myös: {...author}, jolloin tilassa olisi
    taulukko [author, resetAuthor] = useField('text')
    useFieldin palautusarvo olisi silloin 
     [
       {type, value, onChange}, 
       reset
      ]
  */
  return (
    <div>
      <h2>Lisää blogi</h2>

      <form onSubmit={preSubmit}>
        <div>
          Title
          <input {...title.att} />
        </div>
        <div>
          Author
          <input {...author.att} />
        </div>
        <div>
          Url
          <input {...url.att} />
        </div>
        <div>
          Likes
          <input {...likes.att} />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default BlogForm