import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Target {
  x: number;
  y: number;
  radius: number;
}

const TargetShootingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState<number>(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Function to create a new target
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createTarget = (): void => {
    if (targets.length >= 10) return; // Limit the number of targets
    const canvas = canvasRef.current;
    if (!canvas) return;

    const radius = Math.random() * 30 + 10;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;

    setTargets((prev) => [...prev, { x, y, radius }]);
  };

  // Function to draw all targets on the canvas
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    targets.forEach((target) => {
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    });
  };

  // Game loop function
  const update = useCallback((): void => {
    if (Math.random() < 0.02) {
      createTarget();
    }
    draw();

    if (animationFrameId.current !== null) {
      animationFrameId.current = requestAnimationFrame(update);
    }
  },[createTarget, draw]);

  // Set up the game loop and resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = (): void => {
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.8;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    animationFrameId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [update]);

  // Handle click events on the canvas
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setTargets((prevTargets) => {
      const newTargets = prevTargets.filter((target) => {
        const dist = Math.hypot(mouseX - target.x, mouseY - target.y);
        return dist >= target.radius; // Keep targets that are not hit
      });

      if (prevTargets.length !== newTargets.length) {
        setScore((prev) => prev + 10); // Increment score only if a target was hit
      }

      return newTargets;
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Стрельба по мишеням</h1>
      <canvas
        ref={canvasRef}
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.8}
        onClick={handleClick}
        style={{
          border: '1px solid black',
          display: 'block',
          margin: '0 auto',
          backgroundColor: '#f0f0f0',
        }}
      />
      <p style={{ textAlign: 'center' }}>Очки: <span>{score}</span></p>
    </div>
  );
};

export default TargetShootingGame;