import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Eraser, Download, RotateCcw } from "lucide-react";

const cartoons = [
  {
    name: "Happy Sun",
    emoji: "☀️",
    paths: [
      // Sun body (closed circle — fillable)
      { d: "M150,150 m-60,0 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0", fill: "transparent", stroke: "#333", strokeWidth: 3, fillable: true },
      // Rays (lines — not fillable)
      { d: "M80,150 L60,150", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
      { d: "M220,150 L240,150", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
      { d: "M150,80 L150,60", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
      { d: "M150,220 L150,240", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
      { d: "M100,100 L85,85", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
      { d: "M200,100 L215,85", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
      { d: "M100,200 L85,215", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
      { d: "M200,200 L215,215", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
      // Left eye
      { d: "M125,135 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0", fill: "#333", stroke: "none", strokeWidth: 0, fillable: true },
      // Right eye
      { d: "M165,135 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0", fill: "#333", stroke: "none", strokeWidth: 0, fillable: true },
      // Smile
      { d: "M120,170 Q150,200 180,170", fill: "none", stroke: "#333", strokeWidth: 3, fillable: false },
    ],
  },
  {
    name: "Cute Cat",
    emoji: "🐱",
    paths: [
      // Cat head (closed shape — fillable)
      { d: "M100,200 Q100,100 150,80 Q200,100 200,200 Z", fill: "transparent", stroke: "#333", strokeWidth: 3, fillable: true },
      // Left ear (closed triangle — fillable)
      { d: "M100,140 L80,80 L120,120 Z", fill: "transparent", stroke: "#333", strokeWidth: 3, fillable: true },
      // Right ear (closed triangle — fillable)
      { d: "M200,140 L220,80 L180,120 Z", fill: "transparent", stroke: "#333", strokeWidth: 3, fillable: true },
      // Left eye
      { d: "M130,150 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0", fill: "#333", stroke: "none", strokeWidth: 0, fillable: true },
      // Right eye
      { d: "M160,150 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0", fill: "#333", stroke: "none", strokeWidth: 0, fillable: true },
      // Nose
      { d: "M145,175 L150,182 L155,175 Z", fill: "#333", stroke: "none", strokeWidth: 0, fillable: true },
      // Mouth line
      { d: "M150,182 L150,192", fill: "none", stroke: "#333", strokeWidth: 2, fillable: false },
      // Whiskers
      { d: "M110,170 L80,165", fill: "none", stroke: "#333", strokeWidth: 2, fillable: false },
      { d: "M110,178 L80,178", fill: "none", stroke: "#333", strokeWidth: 2, fillable: false },
      { d: "M190,170 L220,165", fill: "none", stroke: "#333", strokeWidth: 2, fillable: false },
      { d: "M190,178 L220,178", fill: "none", stroke: "#333", strokeWidth: 2, fillable: false },
    ],
  },
  {
    name: "Rainbow",
    emoji: "🌈",
    paths: [
      // Each rainbow band as a closed fillable region
      { d: "M50,200 Q150,40 250,200 L230,200 Q150,60 70,200 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      { d: "M70,200 Q150,60 230,200 L210,200 Q150,80 90,200 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      { d: "M90,200 Q150,80 210,200 L190,200 Q150,100 110,200 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      { d: "M110,200 Q150,100 190,200 L170,200 Q150,120 130,200 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      { d: "M130,200 Q150,120 170,200 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
    ],
  },
  {
    name: "Flower",
    emoji: "🌸",
    paths: [
      // Center circle (fillable)
      { d: "M150,150 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Top petal (fillable)
      { d: "M150,110 m-14,0 a14,18 0 1,0 28,0 a14,18 0 1,0 -28,0", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Bottom petal (fillable)
      { d: "M150,190 m-14,0 a14,18 0 1,0 28,0 a14,18 0 1,0 -28,0", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Left petal (fillable)
      { d: "M110,150 m0,-14 a18,14 0 1,0 0,28 a18,14 0 1,0 0,-28", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Right petal (fillable)
      { d: "M190,150 m0,-14 a18,14 0 1,0 0,28 a18,14 0 1,0 0,-28", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Stem (line — not fillable)
      { d: "M150,200 L150,280", fill: "none", stroke: "#2D8A4E", strokeWidth: 3, fillable: false },
      // Leaf (fillable)
      { d: "M150,240 Q170,220 180,230 Q165,240 150,240 Z", fill: "transparent", stroke: "#2D8A4E", strokeWidth: 2, fillable: true },
    ],
  },
  {
    name: "Star",
    emoji: "⭐",
    paths: [
      // Star shape (fillable)
      { d: "M150,50 L175,120 L250,120 L190,165 L210,240 L150,195 L90,240 L110,165 L50,120 L125,120 Z", fill: "transparent", stroke: "#333", strokeWidth: 3, fillable: true },
      // Left eye
      { d: "M130,140 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0", fill: "#333", stroke: "none", strokeWidth: 0, fillable: true },
      // Right eye
      { d: "M162,140 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0", fill: "#333", stroke: "none", strokeWidth: 0, fillable: true },
      // Smile
      { d: "M130,165 Q150,185 170,165", fill: "none", stroke: "#333", strokeWidth: 2, fillable: false },
    ],
  },
  {
    name: "House",
    emoji: "🏠",
    paths: [
      // Roof (triangle — fillable)
      { d: "M60,150 L150,70 L240,150 Z", fill: "transparent", stroke: "#333", strokeWidth: 3, fillable: true },
      // Walls (rectangle — fillable)
      { d: "M80,150 L80,250 L220,250 L220,150 Z", fill: "transparent", stroke: "#333", strokeWidth: 3, fillable: true },
      // Door (fillable)
      { d: "M130,250 L130,190 L170,190 L170,250 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Left window (fillable)
      { d: "M90,170 L90,200 L120,200 L120,170 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Right window (fillable)
      { d: "M180,170 L180,200 L210,200 L210,170 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Chimney (fillable)
      { d: "M190,70 L190,110 L210,110 L210,85 Z", fill: "transparent", stroke: "#333", strokeWidth: 2, fillable: true },
      // Door knob
      { d: "M160,220 a3,3 0 1,0 6,0 a3,3 0 1,0 -6,0", fill: "#333", stroke: "none", strokeWidth: 0, fillable: false },
    ],
  },
];

const colors = [
  "#FF6B6B", "#FF8E53", "#FECA57", "#48DBFB", "#0ABDE3",
  "#10AC84", "#EE5A24", "#6C5CE7", "#FD79A8", "#A29BFE",
  "#55E6C1", "#F8C291", "#2D3436", "#DFE6E9", "#FFFFFF",
];

const Arts = () => {
  const [selectedCartoon, setSelectedCartoon] = useState(0);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [filledPaths, setFilledPaths] = useState<Record<string, string>>({});
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePathClick = (pathIndex: number) => {
    const path = cartoons[selectedCartoon].paths[pathIndex];
    if (!path.fillable) return; // Don't color non-fillable paths like lines
    const key = `${selectedCartoon}-${pathIndex}`;
    setFilledPaths((prev) => ({ ...prev, [key]: currentColor }));
  };

  const resetColors = () => {
    const newFilled = { ...filledPaths };
    cartoons[selectedCartoon].paths.forEach((_, i) => {
      delete newFilled[`${selectedCartoon}-${i}`];
    });
    setFilledPaths(newFilled);
  };

  const downloadArt = () => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cartoons[selectedCartoon].name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen section-padding">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-heading text-4xl font-bold text-center text-foreground mb-4">Arts & Colors 🎨</h1>
        <p className="text-center text-muted-foreground mb-8">Pick a cartoon, choose a color, and click to paint!</p>

        {/* Cartoon selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {cartoons.map((c, i) => (
            <motion.button
              key={c.name}
              onClick={() => setSelectedCartoon(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                selectedCartoon === i
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-foreground hover:bg-primary/10"
              }`}
            >
              {c.emoji} {c.name}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr,auto] gap-8 items-start">
          {/* Canvas */}
          <motion.div
            key={selectedCartoon}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="card-playful border-border p-6 flex items-center justify-center"
          >
            <svg ref={svgRef} viewBox="0 0 300 300" className="w-full max-w-sm h-auto bg-white rounded-2xl shadow-inner">
              {cartoons[selectedCartoon].paths.map((p, i) => (
                <path
                  key={i}
                  d={p.d}
                  fill={filledPaths[`${selectedCartoon}-${i}`] || p.fill}
                  stroke={p.stroke}
                  strokeWidth={p.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onClick={() => handlePathClick(i)}
                  style={{ pointerEvents: "all" }}
                  className={`transition-all duration-200 ${
                    p.fillable ? "cursor-pointer hover:opacity-70" : ""
                  }`}
                />
              ))}
            </svg>
          </motion.div>

          {/* Color palette & tools */}
          <div className="space-y-5">
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">🎨 Pick a Color</h3>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((c) => (
                  <motion.button
                    key={c}
                    onClick={() => setCurrentColor(c)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-xl border-2 transition-all shadow-sm ${
                      currentColor === c ? "border-foreground scale-110 shadow-lg ring-2 ring-primary/30" : "border-border"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Current color indicator */}
            <div className="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3">
              <span className="text-sm font-semibold text-foreground">Selected:</span>
              <div
                className="w-8 h-8 rounded-lg border-2 border-border shadow-inner"
                style={{ backgroundColor: currentColor }}
              />
              <span className="text-xs text-muted-foreground font-mono">{currentColor}</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetColors}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-muted text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors"
              >
                <RotateCcw size={14} /> Reset
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadArt}
                className="flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Download size={14} /> Save
              </motion.button>
            </div>

            {/* Instructions */}
            <div className="bg-muted/50 rounded-2xl p-4 text-sm text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground">💡 How to play:</p>
              <p>1. Pick a cartoon above</p>
              <p>2. Choose a color from the palette</p>
              <p>3. Click on shapes in the drawing to fill them!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arts;
