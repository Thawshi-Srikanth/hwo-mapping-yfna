// Fragment Shader
varying vec3 vEmissiveColor;
varying float vEmissiveIntensity;

void main() {
  vec3 color = vEmissiveColor * vEmissiveIntensity;
  gl_FragColor = vec4(color, 1.0);
}