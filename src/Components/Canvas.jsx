import React, { useEffect, useState } from 'react';
import styles from "../Styles/spin.module.scss";
import { useSpinnerContext } from '../Context/Wheelcontext';
const WheelComponent = ({
  onFinished,
  isOnlyOnce = true,
  size = 300,
  upDuration = 100,
  downDuration = 1000,
  fontFamily = 'Inter',
  className
}) => {
 const { spinnerData, isSpinning } = useSpinnerContext();
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = 100; // Assuming a default value for timer delay
  let angleCurrent = 0;
  let angleDelta = 0;
  let frames = 0;
  let canvasContext = null;
  let maxSpeed = Math.PI / 8; // Assuming a default value for maxSpeed
  const upTime = 800; // Assuming a default value for upTime
  const downTime = 8000; // Assuming a default value for downTime
  let spinStart = 0;
  const centerX = size;
  const centerY = size;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
    
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById('canvas');
    if (navigator.userAgent.indexOf('MSIE') !== -1) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', `${size * 2}`);
      canvas.setAttribute('height', `${size * 2}`);
      canvas.setAttribute('id', 'canvas');
      document.getElementById('wheel')?.appendChild(canvas);
    }
    canvas.addEventListener('click', spin, false);
    canvasContext = canvas.getContext('2d');
  };

  const spin = () => {
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / 8; // Reset maxSpeed
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;
    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      progress = duration / downTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished();
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    if (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, size, lastAngle, angle, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = `hsl(${key * 360 / 8}, 100%, 50%)`;
      ctx.fill();
      ctx.stroke();
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((lastAngle + angle) / 2);
      ctx.fillStyle = 'white';
      ctx.font = `bold 1rem ${fontFamily}`;
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillText(key + 1, size / 2 + 20, 0);
      ctx.restore();
    }
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = 8; // Assuming a default value for spinnerData.length
    const PI2 = Math.PI * 2;
    if (ctx) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'white';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
    }
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i, lastAngle, angle);
      lastAngle = angle;
    }
  };

  const drawNeedle = () => {
    const change = angleCurrent + Math.PI / 2;
    let i =8 - Math.floor((change / (Math.PI * 2)) * 8) - 1;
    if (i < 0) 
    i = i + 8;
    let currentSegment = i;
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, size * 2, size * 2);
  };

  useEffect(() => {
    if (isSpinning) {
      document.getElementById('canvas')?.click();
    }
  }, [isSpinning]);

  return (
    <div id='wheel' className={className}>
      <canvas
        id='canvas'
        width={size * 2}
        height={size * 2}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto',
          transform: 'rotate(90deg)',
        }}
      />
    </div>
  );
};

export default WheelComponent;
