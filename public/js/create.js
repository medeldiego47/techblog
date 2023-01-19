async function newFormHandler(event) {
    event.preventDefault();
  
    const name = document.querySelector('input[name="name"]').value.trim();
    const description = document.querySelector('textarea[name="description"]').value.trim();
   

    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        name,
        description
        
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector('#send')
    .addEventListener('click', newFormHandler);