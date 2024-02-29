document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario_NewPost')
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
  
      const title = document.getElementById('title').value
      const images_content = document.getElementById('image').value
      const content = document.getElementById('content_info').value
      const author_name = document.getElementById('author').value

      const post = {
        title, content, images_content, author_name,
      }
  
      try {
        const response = await fetch('http://127.0.0.1:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        })
  
        if (response.ok) {
          form.reset()
          window.location.href = '/'
        } else {
          const errorText = await response.text()
          throw new Error(errorText)
        }
      } catch (error) {
        console.error('Error writing post:', error)
      }
    })
  })





