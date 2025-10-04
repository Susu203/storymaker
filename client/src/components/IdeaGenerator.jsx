import { useState, useEffect } from "react";
import { generateIdea } from "../api/ideaService";
import { Book, Clock, Users, Palette, Wand2, Send, RefreshCw, Sparkles } from "lucide-react";

export default function IdeaGeneratorMenu() {
  const [storyStart, setStoryStart] = useState("");
  const [length, setLength] = useState("short");
  const [audience, setAudience] = useState("general");
  const [style, setStyle] = useState("fantasía");
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIdea("");

    try {
      const data = await generateIdea({ storyStart, length, audience, style });
      setIdea(data.idea);
    } catch (err) {
      setIdea("Error generando la idea");
    } finally {
      setLoading(false);
    }
  };

   const styles = [
    { value: "fantasía", icon: "✨", color: "from-purple-500 to-pink-500", name: "Fantasía" },
    { value: "ciencia ficción", icon: "🚀", color: "from-blue-500 to-cyan-500", name: "Ciencia Ficción" },
    { value: "misterio", icon: "🔍", color: "from-gray-700 to-gray-900", name: "Misterio" },
    { value: "aventura", icon: "⚔️", color: "from-orange-500 to-red-500", name: "Aventura" },
    { value: "romántico", icon: "💖", color: "from-pink-500 to-rose-500", name: "Romántico" }
  ];

 return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-20 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="inline-flex items-center justify-center mb-4">
              <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
              <Book className="w-16 h-16 text-white mx-4" />
              <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 mb-3 animate-pulse">
              Creador de Historias Mágicas
            </h1>
            <p className="text-xl text-purple-200">Donde la imaginación cobra vida</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Panel - Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="space-y-6">
                {/* Topic Input */}
                <div className="group">
                  <label className="flex items-center text-white font-semibold mb-2 text-lg">
                    <Wand2 className="w-5 h-5 mr-2 text-yellow-300" />
                    Inicio de tu Historia
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ej: dragones en el espacio, robots con sentimientos..."
                      value={storyStart}
                      onChange={(e) => setStoryStart(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                      className="w-full px-4 py-3 bg-white/20 border-2 border-purple-300/50 rounded-xl text-white placeholder-purple-200 focus:ring-4 focus:ring-pink-400 focus:outline-none focus:border-pink-400 transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Length Selection */}
                <div>
                  <label className="flex items-center text-white font-semibold mb-3 text-lg">
                    <Clock className="w-5 h-5 mr-2 text-cyan-300" />
                    Extensión
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "short", label: "Corto", desc: "2 frases" },
                      { value: "medium", label: "Medio", desc: "1 párrafo" },
                      { value: "long", label: "Largo", desc: "2 párrafos" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setLength(option.value)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          length === option.value
                            ? "bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300 scale-105 shadow-lg"
                            : "bg-white/10 border-white/30 hover:border-cyan-300 hover:bg-white/20"
                        }`}
                      >
                        <div className="text-white font-semibold text-sm">{option.label}</div>
                        <div className="text-xs text-purple-200">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audience Selection */}
                <div>
                  <label className="flex items-center text-white font-semibold mb-3 text-lg">
                    <Users className="w-5 h-5 mr-2 text-green-300" />
                    Audiencia
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "general", label: "General", emoji: "👥" },
                      { value: "kids", label: "Niños", emoji: "🧒" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setAudience(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          audience === option.value
                            ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 scale-105 shadow-lg"
                            : "bg-white/10 border-white/30 hover:border-green-300 hover:bg-white/20"
                        }`}
                      >
                        <div className="text-3xl mb-1">{option.emoji}</div>
                        <div className="text-white font-semibold">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="flex items-center text-white font-semibold mb-3 text-lg">
                    <Palette className="w-5 h-5 mr-2 text-pink-300" />
                    Estilo de Historia
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {styles.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setStyle(option.value)}
                        onMouseEnter={() => setHoveredCard(option.value)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          style === option.value
                            ? `bg-gradient-to-br ${option.color} border-white scale-105 shadow-2xl`
                            : "bg-white/10 border-white/30 hover:border-white hover:bg-white/20"
                        } ${hoveredCard === option.value ? "transform -translate-y-1" : ""}`}
                      >
                        <div className="text-3xl mb-2">{option.icon}</div>
                        <div className="text-white font-semibold text-sm">{option.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || !storyStart.trim()}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transform flex items-center justify-center group"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Creando Magia...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      ✨ Generar Historia Mágica
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Panel - Result */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 flex flex-col">
              {!idea && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="mb-6">
                    <Sparkles className="w-24 h-24 text-yellow-300 mx-auto mb-4 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    ¡Listo para crear magia!
                  </h3>
                  <p className="text-purple-200 text-lg">
                    Completa el formulario y deja que la creatividad fluya ✨
                  </p>
                </div>
              )}

              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-6">
                    <div className="absolute inset-0 border-8 border-purple-300/30 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-transparent border-t-pink-400 rounded-full animate-spin"></div>
                    <Wand2 className="absolute inset-0 m-auto w-12 h-12 text-yellow-300 animate-pulse" />
                  </div>
                  <p className="text-white text-xl font-semibold animate-pulse">
                    Tejiendo tu historia...
                  </p>
                </div>
              )}

              {idea && !loading && (
                <div className="flex-1 animate-fadeIn">
                  <div className="mb-4 flex items-center">
                    <Book className="w-6 h-6 text-yellow-300 mr-2" />
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-300">
                      Tu Historia Mágica
                    </h3>
                  </div>
                  <div className="bg-gradient-to-br from-white/20 to-white/5 rounded-2xl p-6 border border-white/30 backdrop-blur-sm">
                    <p className="text-white text-lg leading-relaxed">{idea}</p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => setIdea("")}
                      className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center border border-white/30"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Nueva Historia
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
