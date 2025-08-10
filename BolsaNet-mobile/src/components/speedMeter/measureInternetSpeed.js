import api from "../../Constants/api";

async function MeasureInternetSpeed() {
    const startTime = Date.now();

    try {
        const response = await api.get('http://192.168.0.9:3001/speedtest', {
            responseType: 'blob',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });

        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // segundos

        const blob = response.data;
        const fileSizeBytes = blob.size;

        if (typeof fileSizeBytes !== 'number') {
            throw new Error('Tamanho do arquivo inválido');
        }

        const speedMbps = (fileSizeBytes * 8) / (duration * 1024 * 1024); // Megabits por segundo

        return speedMbps;
    } catch (err) {
        console.error('Erro ao medir velocidade:', err);
        return 0;
    }
}

export default MeasureInternetSpeed;
