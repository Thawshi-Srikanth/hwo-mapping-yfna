import { Html } from "@react-three/drei";
import { GLOBAL_PLANET_RADIUS } from "../config/planetConfig";

const PingAnimation: React.FC = () => {
  return (
    <Html
      position={[0, GLOBAL_PLANET_RADIUS, 0]} // Position the label slightly above the sphere
      center
      style={{ pointerEvents: "none", zIndex: -10 }}
    >
      <div className="relative flex items-center justify-center h-screen">
        <div className="absolute w-4 h-4 bg-blue-500 rounded-full animate-ping" />
      </div>
    </Html>
  );
};

export default PingAnimation;
