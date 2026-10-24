import { useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import { rig, updateRig } from '../lib/laptopRig'

const COLS = 14
const ROWS = 5

function Keys() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D()
    let i = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        dummy.position.set((c - (COLS - 1) / 2) * 0.205, 0.07, -0.72 + r * 0.19)
        dummy.updateMatrix()
        ref.current.setMatrixAt(i++, dummy.matrix)
      }
    }
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[null, null, COLS * ROWS]} frustumCulled={false}>
      <boxGeometry args={[0.17, 0.02, 0.15]} />
      <meshStandardMaterial color="#07080c" roughness={0.55} metalness={0.3} />
    </instancedMesh>
  )
}

function Laptop({ store }) {
  const group = useRef(null)
  const lid = useRef(null)
  const screenMat = useRef(null)
  const light = useRef(null)

  useFrame((state, dt) => {
    updateRig(state, dt, store.state, {
      group: group.current,
      lid: lid.current,
      screenMat: screenMat.current,
      light: light.current,
    })
  })

  return (
    <group ref={group}>
      <RoundedBox args={[3.2, 0.12, 2.1]} radius={0.05} smoothness={4} material={rig.bodyMat} />
      <Keys />
      <mesh position={[0, 0.07, 0.23]}>
        <boxGeometry args={[1.3, 0.02, 0.15]} />
        <meshStandardMaterial color="#07080c" roughness={0.55} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.0635, 0.74]}>
        <boxGeometry args={[1.15, 0.006, 0.6]} />
        <meshStandardMaterial color="#0b0d12" roughness={0.25} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.07, -1.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 3.0, 20]} />
        <meshStandardMaterial color="#0b0d12" metalness={1} roughness={0.4} />
      </mesh>

      <group ref={lid} position={[0, 0.085, -1.05]}>
        <RoundedBox
          args={[3.2, 0.08, 2.1]}
          radius={0.04}
          smoothness={4}
          position={[0, 0.04, 1.05]}
          material={rig.bodyMat}
        />
        <mesh position={[0, -0.002, 1.05]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.0, 1.9]} />
          <meshBasicMaterial ref={screenMat} map={rig.tex} color="#000000" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0.0815, 1.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.16, 0.19, 48]} />
          <meshBasicMaterial color="#8FB4FF" toneMapped={false} />
        </mesh>
        <pointLight ref={light} position={[0, -0.9, 1.0]} color="#4D7CFF" distance={7} intensity={0} />
      </group>
    </group>
  )
}

export default function LaptopScene({ store, active }) {
  const maxDpr = typeof window !== 'undefined' && window.innerWidth < 768 ? 1.25 : 1.5

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, maxDpr]}
      camera={{ fov: 35, position: [0, 3.2, 7.8], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[-3, 4, 2]} intensity={1.1} color="#cfdcff" />
      <directionalLight position={[4, 2, -3]} intensity={0.8} color="#4D7CFF" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} color="#cfd8ff" />
        <Lightformer form="rect" intensity={3} position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color="#8FB4FF" />
        <Lightformer form="rect" intensity={2} position={[5, 1, -2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#ffffff" />
      </Environment>
      <Laptop store={store} />
    </Canvas>
  )
}