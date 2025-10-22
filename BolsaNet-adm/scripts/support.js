import { validateToken, API_URL } from './auth.js';

let mensagensGlobais = [];
let chatAbertoUsuario = null;
let meuIdGlobal = null;
let socket = null;

// --- Conecta ao servidor e configura eventos ---
async function connections() {
    const userData = await validateToken();
    if (!userData) return;

    meuIdGlobal = Number(userData.userId);
    socket = io(API_URL.replace("ws", "http"), { auth: { token: userData.token } });

    socket.on("connect", () => {
        socket.emit("ListConversationByUser");
    });

    socket.on("conversationByUser", (messages) => {
        mensagensGlobais = Array.isArray(messages) ? messages : [];
        renderConversas();
        if (chatAbertoUsuario) renderConversasDoUsuario(chatAbertoUsuario);
    });

    socket.on("newMessage", (newMsg) => {
        mensagensGlobais.push(newMsg);
        renderConversas();

        const { senderId, recipientId } = newMsg;
        const outroUsuario = senderId === meuIdGlobal ? recipientId : senderId;

        if (chatAbertoUsuario === outroUsuario) {
            renderConversasDoUsuario(outroUsuario);
        }
    });

    // Envio de mensagem
    const input = document.querySelector(".chat-footer input");
    const btn = document.querySelector(".chat-footer button");

    input?.addEventListener("keydown", e => e.key === "Enter" && enviarMensagem());
    btn?.addEventListener("click", enviarMensagem);
}

// --- Renderiza a lista de conversas no aside ---
function renderConversas() {
    const aside = document.querySelector("aside");
    aside.innerHTML = "";

    if (!mensagensGlobais.length) {
        aside.innerHTML = `<p style="color:#777;text-align:center;">Nenhuma conversa ainda.</p>`;
        return;
    }

    // Agrupa pela última mensagem de cada usuário
    const ultimas = {};
    mensagensGlobais.forEach(msg => {
        const outroId = msg.senderId === meuIdGlobal ? msg.recipientId : msg.senderId;
        if (!ultimas[outroId] || new Date(msg.sentAt) > new Date(ultimas[outroId].sentAt)) {
            ultimas[outroId] = msg;
        }
    });

    Object.values(ultimas)
        .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
        .forEach(msg => {
            const outroId = msg.senderId === meuIdGlobal ? msg.recipientId : msg.senderId;
            const nomeOutro = msg.senderId === meuIdGlobal
                ? `Usuário ${outroId}`
                : msg.senderName || `Usuário ${outroId}`;

            let texto = msg.message.length > 40 ? msg.message.slice(0, 30) + "..." : msg.message;

            const section = document.createElement("section");
            section.classList.add("contact");
            if (chatAbertoUsuario === outroId) section.classList.add("active");

            section.innerHTML = `
                <div class="profile-pic"></div>
                <div style="display:flex;flex-direction:column;gap:4px;">
                    <p style="margin:0;font-weight:600;">${nomeOutro}</p>
                    <p style="margin:0;color:#666;font-size:0.9rem;">${texto}</p>
                </div>
            `;
            section.onclick = () => abrirChat(outroId);
            aside.appendChild(section);
        });
}

// --- Renderiza as mensagens do chat aberto ---
function renderConversasDoUsuario(idUsuario) {
    chatAbertoUsuario = idUsuario;
    const chatBody = document.querySelector(".chat-body");
    chatBody.innerHTML = "";

    const conversas = mensagensGlobais
        .filter(m => 
            (m.senderId === idUsuario && m.recipientId === meuIdGlobal) ||
            (m.senderId === meuIdGlobal && m.recipientId === idUsuario)
        )
        .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));

    if (!conversas.length) {
        chatBody.innerHTML = `<p style="color:#777;text-align:center;">Nenhuma mensagem ainda...</p>`;
        return;
    }

    conversas.forEach(msg => {
        const bubble = document.createElement("section");
        bubble.classList.add("speech-balloon");
        if (msg.senderId === meuIdGlobal) bubble.classList.add("send");
        bubble.innerHTML = `<p>${msg.message}</p>`;
        chatBody.appendChild(bubble);
    });

    chatBody.scrollTop = chatBody.scrollHeight;
    renderConversas();
}

// --- Abre um chat ---
function abrirChat(idUser) {
    renderConversasDoUsuario(Number(idUser));
}

// --- Envia mensagem ---
function enviarMensagem() {
    const input = document.querySelector(".chat-footer input");
    if (!input.value.trim() || !chatAbertoUsuario) return;

    const novaMsg = {
        senderId: meuIdGlobal,
        recipientId: chatAbertoUsuario,
        message: input.value.trim(),
        sentAt: new Date().toISOString(),
        senderName: "Você"
    };

    socket.emit("sendMessage", novaMsg);
    mensagensGlobais.push(novaMsg);
    renderConversasDoUsuario(chatAbertoUsuario);
    renderConversas();
    input.value = "";
}

// --- Inicializa ---
connections();
