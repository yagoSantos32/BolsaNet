const API_URL = "http://192.168.3.14:3001/";

async function validateToken() {
    const userData = JSON.parse(localStorage.getItem('authToken'));

    if (!userData || !userData.token) {
        window.location.href = 'login.html';
        return null;
    }

    const token = userData.token;
    const userId = userData.iduser; // atenção: 'iduser', não 'userid'

    try {
       
        const res = await fetch(`${API_URL}validateAdmin`, {
           headers: { 'Authorization': `Bearer ${token}` }

        });

        const data = await res.json();

        if (!res.ok || !data.valid) {
            alert("Você não tem permissão de administrador ou token inválido.");
            localStorage.removeItem('authToken');
            window.location.href = 'login.html';
            return null;
        }

        return { token, userId };
    } catch (err) {
        console.error(err);
        alert("Erro na validação do token.");
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
        return null;
    }
}

export { validateToken, API_URL };
