import Svg, { Path, Text, Line } from 'react-native-svg';
import getSpeedMeterData from './SpeedMeterData.jsx';
import { styles } from './speedMeter.style.js';



function SpeedMeter({ speed, size, radius, strokeWidth }) {
  const { path, center, pointer } = getSpeedMeterData(speed, size, radius);
  const speedDescription = `${speed}MBps`;

  return (
    <Svg width={size} height={size - 100}>
      <Path
        d={path.d}
        stroke={styles.arc.backgroundColor}
        strokeWidth={strokeWidth}
        fill='none'
        strokeLinecap='round'
      />
      <Path
        d={path.d}
        stroke={styles.arc.progressColor}
        strokeWidth={strokeWidth}
        fill='none'
        strokeLinecap='round'
        strokeDasharray={path.dashArray}
        strokeDashoffset={path.dashOffset}
      />
      <Text
        x={center.cx}
        y={center.cy - styles.text.yOffset}
        fontSize={styles.text.fontSize}
        fill={styles.text.color}
        textAnchor='middle'

      >
        {speedDescription}
      </Text>

      <Line
        x1={center.cx}
        y1={center.cy}
        x2={pointer.px}
        y2={pointer.py}
        stroke={styles.arc.pointerColor}
        strokeWidth={strokeWidth}
        strokeLinecap='round'
      />


    </Svg>
  );
}

export default SpeedMeter;