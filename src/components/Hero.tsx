import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, Mail } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const container = canvasRef.current.parentElement;
    const width = container?.clientWidth || 500;
    const height = container?.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Group to hold all interactive assets (tilts with mouse)
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Create AI Neural Brain (Central Point Cloud Cluster)
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsCount = 180;
    const positions = new Float32Array(pointsCount * 3);
    const colors = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount; i++) {
      // Form a spherical shell or cluster
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.5 + Math.random() * 0.8; // Radius between 2.5 and 3.3

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Gradient colors: Blue to Purple
      colors[i * 3] = 0.15 + (positions[i * 3] + 3) / 6 * 0.5;  // R
      colors[i * 3 + 1] = 0.4 + (positions[i * 3 + 1] + 3) / 6 * 0.2; // G
      colors[i * 3 + 2] = 0.9; // B
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const brainCluster = new THREE.Points(pointsGeometry, pointsMaterial);
    mainGroup.add(brainCluster);

    // Connect some of the dots with glowing lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    
    // Choose random points to connect
    for (let i = 0; i < pointsCount; i += 4) {
      for (let j = i + 1; j < i + 4; j++) {
        if (j < pointsCount) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const brainNetwork = new THREE.LineSegments(lineGeometry, lineMaterial);
    mainGroup.add(brainNetwork);

    // 2. Floating 3D Cubes (Glassmorphism look)
    const cubeCount = 4;
    const cubes: THREE.Mesh[] = [];
    const cubeMaterials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.35,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.6,
        thickness: 0.5,
        ior: 1.5,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.3,
        roughness: 0.2,
        metalness: 0.2,
        transmission: 0.7,
        thickness: 0.8,
        ior: 1.6,
      })
    ];

    for (let i = 0; i < cubeCount; i++) {
      const size = 0.8 + Math.random() * 0.8;
      const geom = new THREE.BoxGeometry(size, size, size);
      const mesh = new THREE.Mesh(geom, cubeMaterials[i % 2]);
      
      // Position around the center
      const angle = (i / cubeCount) * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * 4.5 + (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * 4.5 + (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 2
      );
      
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mainGroup.add(mesh);
      cubes.push(mesh);
    }

    // 3. Floating Technology Logo Cards (React & Python via custom Canvas textures)
    const createLogoTexture = (tech: 'react' | 'python') => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Transparent BG
        ctx.clearRect(0, 0, 256, 256);
        
        // Draw Soft Glass Rounded Card
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowColor = 'rgba(37, 99, 235, 0.15)';
        ctx.shadowBlur = 15;
        
        // Round Rect path
        const r = 40;
        ctx.beginPath();
        ctx.roundRect(16, 16, 224, 224, r);
        ctx.fill();
        
        // Draw Border
        ctx.strokeStyle = tech === 'react' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(124, 58, 237, 0.3)';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.shadowBlur = 0; // Reset shadow

        if (tech === 'react') {
          // Draw React symbol
          ctx.strokeStyle = '#00D8FF';
          ctx.lineWidth = 6;
          
          ctx.translate(128, 128);
          // Ellipse 1
          ctx.beginPath();
          ctx.ellipse(0, 0, 80, 28, 0, 0, 2 * Math.PI);
          ctx.stroke();
          // Ellipse 2
          ctx.beginPath();
          ctx.ellipse(0, 0, 80, 28, Math.PI / 3, 0, 2 * Math.PI);
          ctx.stroke();
          // Ellipse 3
          ctx.beginPath();
          ctx.ellipse(0, 0, 80, 28, -Math.PI / 3, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Nucleus
          ctx.fillStyle = '#00D8FF';
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Draw Python symbol (Simplified)
          ctx.translate(128, 128);
          ctx.scale(0.8, 0.8);
          
          // Draw Blue Top segment
          ctx.fillStyle = '#3776AB';
          ctx.beginPath();
          ctx.moveTo(-20, -60);
          ctx.lineTo(20, -60);
          ctx.arcTo(60, -60, 60, -20, 40);
          ctx.lineTo(60, -10);
          ctx.lineTo(30, -10);
          ctx.arcTo(30, 20, 0, 20, 20);
          ctx.lineTo(-30, 20);
          ctx.arcTo(-50, 20, -50, -10, 20);
          ctx.lineTo(-50, -30);
          ctx.arcTo(-50, -60, -20, -60, 20);
          ctx.fill();
          
          // Draw Yellow Bottom segment
          ctx.fillStyle = '#FFE873';
          ctx.beginPath();
          ctx.moveTo(20, 60);
          ctx.lineTo(-20, 60);
          ctx.arcTo(-60, 60, -60, 20, 40);
          ctx.lineTo(-60, 10);
          ctx.lineTo(-30, 10);
          ctx.arcTo(-30, -20, 0, -20, 20);
          ctx.lineTo(30, -20);
          ctx.arcTo(50, -20, 50, 10, 20);
          ctx.lineTo(50, 30);
          ctx.arcTo(50, 60, 20, 60, 20);
          ctx.fill();
          
          // Dot 1 (top)
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(-15, -40, 6, 0, 2 * Math.PI);
          ctx.fill();
          
          // Dot 2 (bottom)
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(15, 40, 6, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      return new THREE.CanvasTexture(canvas);
    };

    const reactTex = createLogoTexture('react');
    const pythonTex = createLogoTexture('python');

    const cardGeom = new THREE.PlaneGeometry(1.5, 1.5);
    
    const reactCardMat = new THREE.MeshBasicMaterial({
      map: reactTex,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const reactCard = new THREE.Mesh(cardGeom, reactCardMat);
    reactCard.position.set(-4, 2, 1);
    mainGroup.add(reactCard);

    const pythonCardMat = new THREE.MeshBasicMaterial({
      map: pythonTex,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const pythonCard = new THREE.Mesh(cardGeom, pythonCardMat);
    pythonCard.position.set(4.5, -1.5, 1.5);
    mainGroup.add(pythonCard);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x2563eb, 3.0);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7c3aed, 2.0);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.0, 30);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 5. Mouse Interaction variables
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX - windowHalfX) * 0.0004;
      targetY = (e.clientY - windowHalfY) * 0.0004;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. Window Resize handler
    const handleResize = () => {
      if (!canvasRef.current) return;
      const newWidth = container?.clientWidth || 500;
      const newHeight = container?.clientHeight || 500;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Brain sphere rotation
      brainCluster.rotation.y = elapsedTime * 0.05;
      brainNetwork.rotation.y = elapsedTime * 0.05;
      
      // Floating cards floating up and down
      reactCard.position.y = 2.0 + Math.sin(elapsedTime * 1.5) * 0.3;
      reactCard.rotation.y = Math.sin(elapsedTime * 0.5) * 0.15;
      
      pythonCard.position.y = -1.5 + Math.cos(elapsedTime * 1.2) * 0.35;
      pythonCard.rotation.y = Math.cos(elapsedTime * 0.6) * 0.18;

      // Rotate cubes
      cubes.forEach((cube, idx) => {
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.008;
        cube.position.y += Math.sin(elapsedTime * 1.0 + idx) * 0.003;
      });

      // Smooth camera tilt follow mouse
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanups
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      // Memory cleanup
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      reactTex.dispose();
      reactCardMat.dispose();
      pythonTex.dispose();
      pythonCardMat.dispose();
      cardGeom.dispose();
      
      cubes.forEach((c) => {
        c.geometry.dispose();
      });
      cubeMaterials.forEach((m) => m.dispose());
      
      renderer.dispose();
    };
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-white">
      {/* Background Animated Gradient Blobs */}
      <div className="bg-blob blob-blue top-1/4 -left-32"></div>
      <div className="bg-blob blob-purple bottom-1/4 -right-32"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        {/* Left Side Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-blue-50/50 text-accent-primary font-mono text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span>
            Open to Opportunities
          </div>

          <div className="space-y-4">
            <h2 className="text-slate-500 font-heading text-lg md:text-xl font-medium tracking-wide">
              Hello, I'm
            </h2>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-900 leading-none">
              Periketi Hari Krishna
            </h1>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-sm font-semibold tracking-wide border border-slate-200 shadow-sm">
                AI & Machine Learning Engineer
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-sm font-semibold tracking-wide border border-slate-200 shadow-sm">
                Full Stack Developer
              </span>
            </div>
          </div>

          <p className="text-lg text-text-secondary leading-relaxed max-w-xl font-sans">
            I build intelligent software, scalable web applications, AI-powered platforms, and immersive digital experiences that solve real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={() => handleScrollToSection('projects')}
              className="btn-accent flex items-center justify-center gap-2 text-base font-semibold font-button group"
            >
              <span>View Projects</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={() => handleScrollToSection('contact')}
              className="btn-secondary flex items-center justify-center gap-2 text-base font-semibold font-button"
            >
              <Download size={18} />
              <span>Download Resume</span>
            </button>

            <button
              onClick={() => handleScrollToSection('contact')}
              className="btn-secondary border border-transparent hover:border-slate-200 bg-slate-50/50 hover:bg-slate-100 flex items-center justify-center gap-2 text-base font-semibold font-button"
            >
              <Send size={18} />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Socials & Profiles */}
          <div className="flex items-center gap-5 pt-8 border-t border-slate-100">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Connect:</span>
            
            <a 
              href="https://github.com/periketiharikrishna" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-slate-100 hover:border-accent-primary hover:text-accent-primary hover:bg-blue-50/50 text-slate-600 transition-all duration-300"
              aria-label="GitHub profile"
            >
              <Github size={20} />
            </a>

            <a 
              href="https://linkedin.com/in/periketiharikrishna" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-slate-100 hover:border-accent-primary hover:text-accent-primary hover:bg-blue-50/50 text-slate-600 transition-all duration-300"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={20} />
            </a>

            <a 
              href="mailto:periketiharikrishna@gmail.com" 
              className="p-2.5 rounded-full border border-slate-100 hover:border-accent-primary hover:text-accent-primary hover:bg-blue-50/50 text-slate-600 transition-all duration-300"
              aria-label="Send email"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
        
        {/* Right Side 3D Interactive Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="relative h-[450px] md:h-[550px] flex items-center justify-center rounded-3xl overflow-hidden glass-card shadow-sm border border-slate-100/50"
        >
          {/* Glass Overlay Badges inside 3D environment space */}
          <div className="absolute top-6 left-6 z-20 px-3.5 py-1.5 rounded-2xl glass-card text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-sm border border-white/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Real-time WebGL Renderer
          </div>

          <div className="absolute bottom-6 right-6 z-20 px-4 py-2 rounded-2xl glass-card text-xs font-mono text-slate-500 shadow-sm border border-white/60">
            FPS: <span className="text-slate-800 font-bold">60.0</span> | Latency: <span className="text-slate-800 font-bold">2.4ms</span>
          </div>

          <canvas ref={canvasRef} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />
        </motion.div>
        
      </div>
    </section>
  );
}
