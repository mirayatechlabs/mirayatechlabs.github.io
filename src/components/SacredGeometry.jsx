import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function SacredCore() {
  const group = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Normalizziamo lo scroll tra 0 e 1 rispetto all'altezza totale della pagina
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      scrollRef.current = window.scrollY / maxScroll;
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Rotazione continua di base (fluttuazione tech)
    group.current.rotation.y += delta * 0.15;
    
    // Reazione allo scroll
    // Quando scorri la pagina, il nucleo si avvicina (Z) e ruota velocemente sull'asse X
    const targetZ = scrollRef.current * 4; 
    const targetRotX = scrollRef.current * Math.PI * 2;
    
    // Lerp per rendere il movimento fluido ed evitare scatti
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.05);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.05);
  });

  return (
    <group ref={group}>
      {/* Float aggiunge un naturale "galleggiamento" su e giù */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        
        {/* Merkabah: Due Tetraedri intersecanti (Geometria Sacra) */}
        {/* Usiamo meshBasicMaterial con toneMapped={false} per creare un materiale "puro" che emette luce per il Bloom (Effetto LED) */}
        <mesh>
          <tetrahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color={[0, 4, 4]} wireframe toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]}>
          <tetrahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color={[4, 0, 4]} wireframe toneMapped={false} />
        </mesh>
        
        {/* Icosaedro protettivo esterno (gabbia wireframe) */}
        <mesh scale={1.8}>
          <icosahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#2222ff" wireframe transparent opacity={0.15} toneMapped={false} />
        </mesh>
      </Float>
    </group>
  );
}

export default function SacredGeometryBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#020205']} />
        
        {/* Sfondo stellato per dare profondità spaziale */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <SacredCore />

        {/* Effetto LED al Neon (Bloom Post-processing) */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
