let socket

let user = ''

let chatBox = document.getElementById('chatbox')

Swal.fire({
    title: 'Autenticacion para el chat',
    input: 'text',
    text: 'Introduce un username for the WhatsApp chat',
    inputAttributes: {
        maxLength: 5
    },
    inputValidator: value => !value.trim() && 'Porfavor escribe un usuario para continuar',
    allowOutsideClick: false,    /* Activar antes de mandar a GitHub */
}).then(result =>{
    
    user = result.value
    console.log(user)
    socket = io()
    document.getElementById('username').innerHTML = user
    
    

    
    let emojis = document.querySelectorAll('#emoji')
    let buttonEmojis = document.getElementById('button-emoji')
    let containerEmojis = document.getElementById('container-emoji')

    buttonEmojis.addEventListener('click', ()=> {
        containerEmojis.classList.toggle('open-emojis')
    })

    // chatBox.addEventListener('keyup', event => {
    //     if (event.key === 'Enter') {
    //         if(chatBox.value.trim().length > 0) {
    //             socket.emit('message',{
    //                 user,
    //                 message: chatBox.value
    //             })
    //             chatBox.value = ''
    //         }
    //     }
    // })


    const inputMessage = () => {
                if(chatBox.value.trim().length > 0) {
                    socket.emit('message',{
                        user,
                        message: chatBox.value
                    })
                    chatBox.value = ''
                } else {

                }
            
    }


    const sendMessage = document.getElementById('send-button')
    sendMessage.addEventListener('click', () => {
        
        inputMessage()
    })

    for(const emoji of emojis){
        emoji.addEventListener('click', ( )=>{
            chatBox.setAttribute('value', document.getElementById('chatbox').value += emoji.innerHTML)
        })
    }


/* enviar imagenes prueba */



    socket.on('logs', data =>{
        const messagesLog = document.getElementById('messagesLog')
        let messages = ''
        data.forEach(message =>{
            // messages += `<p>[<i>${message.user}</i>]: ${message.message}</p>`
            messages += `<div class="contenedor-mensajes"> 
                        <p>${message.user}</p>
                        <p>${message.message}</p>
                        </div>`
        })
        messagesLog.innerHTML = messages
    })
    socket.on('newUser', ()=> alert('Nuevo usuario conectado'))




})

