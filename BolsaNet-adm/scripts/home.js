import { validateToken, API_URL } from './auth.js';

const dataList = document.querySelector(".data-list");
const filterLinks = document.querySelectorAll("#filter-dropdown a");

// --- BUSCA USUÁRIOS (apenas se token for válido e admin) ---
export async function fetchUsers(filters = {}) {
    const userData = await validateToken();
    if (!userData) return;

    const queryString = new URLSearchParams(filters).toString();

    console.log(userData)
    try {
        const res = await fetch(`${API_URL}users?${queryString}`, {
            headers: { 'Authorization': `Bearer ${userData.token}` }
        });

        const data = await res.json();
        const users = Array.isArray(data) ? data : data.users || [];

        renderUsers(users);

    } catch (err) {
        console.error(err)
        alert(`Erro ao carregar usuários: ${err.message}`);
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    }
}

// --- RENDERIZA USUÁRIOS ---
function renderUsers(users) {

    const headerRow = `
  <div class="data-row header">
    <div>Nome</div>
    <div>Email</div>
    <div>Status</div>
    <div>Operação</div>
  </div>
`;

    const rows = users.map(user => `
        <div class="data-row">
            <div data-label="Nome:">${user.fullName}</div>
            <div data-label="Email:">${user.email}</div>
            <div data-label="Status:">
                <span class="status status-${user.status.replace(/\s+/g, '_')}">${user.status}</span>
            </div>
            <div data-label="Operação:">
                <div class="operacao-icons">
                    <img src="../assets/book.png" alt="Ver" onclick="viewUser(${user.id})">
                    <img src="../assets/pencil.png" alt="Editar" onclick="editUser(${user.id})">
                    <img src="../assets/bin.png" alt="Excluir" onclick="deleteUser(${user.id})" class="lixeira-icon">
                </div>
            </div>
        </div>
    `).join("");

    dataList.innerHTML = headerRow + rows;
}

// --- FILTRAR POR STATUS ---
function initFilters() {
    filterLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const status = e.target.textContent.trim().toLowerCase();
            fetchUsers({ status });
        });
    });
}

// --- CARREGA USUÁRIOS AO INICIAR ---
fetchUsers();
initFilters();
