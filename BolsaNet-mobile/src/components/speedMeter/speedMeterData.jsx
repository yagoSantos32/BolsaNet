function getSpeedMeterData(speed, size, radius) {
  // Centro do velocímetro
  const cx = size / 2;
  const cy = size / 2;

  // Posições iniciais e finais do arco
  const x1 = cx + radius * Math.cos(Math.PI);
  const y1 = cy + radius * Math.sin(Math.PI);
  const x2 = cx + radius * Math.cos(0);
  const y2 = cy + radius * Math.sin(0);
  const d = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;

  // Comprimento da circunferência e cálculo do deslocamento do traço
  const circumference = Math.PI * radius;
  const dashArray = circumference; // Total do arco
  const dashOffset = circumference - (circumference * speed) / 100; // Deslocamento do traço



  // Cálculo da posição do ponteiro
  const angleRad = ((180 - speed * 1.8) * Math.PI) / 180;
  const px = cx + (radius / 3) * Math.cos(angleRad);
  const py = cy - (radius / 3) * Math.sin(angleRad);

  return {
    path: { d, dashArray, dashOffset },
    center: { cx, cy },
    pointer: { px, py }
  };
}

export default getSpeedMeterData;
