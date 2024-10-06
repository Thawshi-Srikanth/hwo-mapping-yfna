// Vertex Shader
varying vec3 vEmissiveColor;
varying float vEmissiveIntensity;

attribute vec3 emissiveColor; // Per-instance emissive color
attribute float emissiveIntensity; // Per-instance emissive intensity

void main() {
  vEmissiveColor = emissiveColor;
  vEmissiveIntensity = emissiveIntensity;

  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
}