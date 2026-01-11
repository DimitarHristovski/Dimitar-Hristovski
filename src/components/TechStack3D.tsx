import { useEffect, useRef } from "react";
import { useTheme } from "./contexts/ThemeContext";

interface TechNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  label: string;
  color: string;
}

export const TechStack3D = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Tech stack nodes with labels - using color palette
    const techStack: TechNode[] = [
      { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, label: "React", color: "#2E66F6" }, // hero-blue
      { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, label: "TypeScript", color: "#3D1B6F" }, // deep-purple
      { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, label: "Node.js", color: "#FF5A2D" }, // fiery-orange
      { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, label: "LangChain", color: "#F7B500" }, // gold-accent
      { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, label: "Next.js", color: "#FF2E2E" }, // energy-red
    ];

    // Initialize positions in a sphere
    const radius = 300;
    techStack.forEach((node, i) => {
      const angle = (i / techStack.length) * Math.PI * 2;
      const elevation = (i / techStack.length) * Math.PI - Math.PI / 2;
      node.x = Math.cos(angle) * Math.cos(elevation) * radius;
      node.y = Math.sin(elevation) * radius;
      node.z = Math.sin(angle) * Math.cos(elevation) * radius;
      node.vx = (Math.random() - 0.5) * 0.2;
      node.vy = (Math.random() - 0.5) * 0.2;
      node.vz = (Math.random() - 0.5) * 0.2;
    });

    let animationFrameId: number;
    let rotationX = 0;
    let rotationY = 0;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      rotationY = (mouseX / canvas.width - 0.5) * 0.5;
      rotationX = (mouseY / canvas.height - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const focalLength = 800;

      // Update positions with slight drift
      techStack.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Keep nodes in a sphere
        const distance = Math.sqrt(node.x * node.x + node.y * node.y + node.z * node.z);
        if (distance > radius * 1.2) {
          const scale = radius / distance;
          node.x *= scale;
          node.y *= scale;
          node.z *= scale;
        }
      });

      // Rotate all nodes
      techStack.forEach((node) => {
        // Rotate around Y axis
        let x = node.x * Math.cos(rotationY) - node.z * Math.sin(rotationY);
        let z = node.x * Math.sin(rotationY) + node.z * Math.cos(rotationY);
        let y = node.y;

        // Rotate around X axis
        const y2 = y * Math.cos(rotationX) - z * Math.sin(rotationX);
        const z2 = y * Math.sin(rotationX) + z * Math.cos(rotationX);

        // 3D projection
        const scale = focalLength / (focalLength + z2 + 500);
        const x2d = centerX + x * scale;
        const y2d = centerY + y2 * scale;
        const size2d = 8 * scale;

        // Store 2D position for connections
        (node as any).x2d = x2d;
        (node as any).y2d = y2d;
        (node as any).z2d = z2;
        (node as any).scale = scale;
      });

      // Draw connections
      techStack.forEach((node, i) => {
        techStack.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const dz = node.z - otherNode.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < radius * 1.5) {
            const opacity = (1 - distance / (radius * 1.5)) * 0.3;
            const heroBlueRgb = "46, 102, 246"; // hero-blue #2E66F6
            ctx.strokeStyle = theme === "dark"
              ? `rgba(${heroBlueRgb}, ${opacity})`
              : `rgba(${heroBlueRgb}, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo((node as any).x2d, (node as any).y2d);
            ctx.lineTo((otherNode as any).x2d, (otherNode as any).y2d);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      techStack.forEach((node) => {
        const x2d = (node as any).x2d;
        const y2d = (node as any).y2d;
        const scale = (node as any).scale;
        const size2d = 8 * scale;

        // Glow effect - using hero-blue from palette
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size2d * 3);
        const heroBlueRgb = "46, 102, 246"; // hero-blue #2E66F6
        gradient.addColorStop(0, theme === "dark" ? `rgba(${heroBlueRgb}, 0.4)` : `rgba(${heroBlueRgb}, 0.2)`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fill();

        // Label (only if close enough)
        if (scale > 0.3) {
          ctx.fillStyle = theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";
          ctx.font = `${12 * scale}px sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(node.label, x2d, y2d + size2d + 15 * scale);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: theme === "dark" ? 0.4 : 0.2 }}
    />
  );
};

