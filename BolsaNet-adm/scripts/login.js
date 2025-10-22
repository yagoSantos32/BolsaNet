document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://192.168.3.14:3001/user/login', {
            method: 'POST',
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) 
        });

        const result = await response.json();

        if (response.ok && result.token) {
           
            localStorage.setItem('authToken', JSON.stringify({
                token:result.token,
                iduser:result.iduser
            }));
            window.location.href = 'home.html';
        } else {
            alert(result.error || 'Erro ao fazer login.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão com o servidor.');
    }
});
