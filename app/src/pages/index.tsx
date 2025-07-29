import type React from "react"
import { useState, useEffect } from "react"
import {
    Menu,
    X,
    Instagram,
    Users,
    Car,
    Zap,
    Trophy,
    ChevronRight,
    ArrowUp,
    ChevronUp,
} from "lucide-react"

interface AnimatedCounterProps {
    target: number
    duration?: number
}

import { navItems } from "../data/navitens"
import { americanMuscles } from "../data/american"
import { curiosities } from "../data/curiosities"
import { japaneseGiants } from "../data/japanese"
import { communityActivities } from "../data/comunity"

    
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setIsVisible(true)
            }
        },
        { threshold: 0.1 },
        )

        const element = document.getElementById(`counter-${target}`)
        if (element) observer.observe(element)

        return () => observer.disconnect()
    }, [target])

    useEffect(() => {
        if (!isVisible) return

        let start = 0
        const increment = target / (duration / 16)
        const timer = setInterval(() => {
        start += increment
        if (start >= target) {
            setCount(target)
            clearInterval(timer)
        } else {
            setCount(Math.floor(start))
        }
        }, 16)

        return () => clearInterval(timer)
    }, [target, duration, isVisible])

    return <span id={`counter-${target}`}>{count.toLocaleString()}</span>
}

const Page: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")
    const [showScrollTop, setShowScrollTop] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleScroll = () => {
        setShowScrollTop(window.scrollY > 400)
        }

        const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("mousemove", handleMouseMove)

        return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }


    
    const renderContent = () => {
        switch (activeSection) {
        case "home":
            return (
            <div className="space-y-20">
                {/* Hero Section */}
                <div className="relative min-h-screen flex items-center justify-center">
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                    }}
                />
                <div className="text-center space-y-8 relative z-10">
                    <div className="overflow-hidden">
                    <h1 className="text-7xl md:text-9xl font-thin tracking-wider animate-fade-in-up">LINHA DE FUGA</h1>
                    </div>
                    <div className="w-32 h-px bg-white mx-auto animate-expand-width" />
                    <div className="overflow-hidden">
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up-delay">
                        O portal definitivo que reúne o melhor do mundo automotivo.
                        <br />
                        Dos lendários gigantes japoneses aos poderosos muscles americanos.
                    </p>
                    </div>
                    <div className="pt-8">
                    <div className="inline-block animate-bounce-slow">
                        <ChevronUp className="w-8 h-8 rotate-90 text-gray-400" />
                    </div>
                    </div>
                </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800">
                {[
                    { icon: Car, title: "Gigantes Japoneses", desc: "Precisão e tecnologia dos icônicos carros japoneses" },
                    { icon: Zap, title: "Muscles Americanos", desc: "Força bruta dos clássicos muscle cars americanos" },
                    {
                    icon: Trophy,
                    title: "Curiosidades",
                    desc: "Fatos únicos e histórias fascinantes do universo automotivo",
                    },
                ].map((item, index) => (
                    <div
                    key={index}
                    className="group bg-black p-12 hover:bg-zinc-950 transition-all duration-700 cursor-pointer"
                    onClick={() => setActiveSection(index === 0 ? "japanese" : index === 1 ? "american" : "curiosities")}
                    >
                    <div className="space-y-6">
                        <item.icon className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-500" />
                        <div className="space-y-4">
                        <h3 className="text-2xl font-light tracking-wide">{item.title}</h3>
                        <div className="w-12 h-px bg-gray-600 group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                        <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                        </div>
                        <div className="flex items-center text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                        <span className="text-sm font-light">Explorar</span>
                        <ChevronRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                {/* Statistics */}
                <div className="py-20 border-t border-b border-gray-800">
                <div className="text-center space-y-16">
                    <div className="space-y-4">
                    <h2 className="text-4xl font-thin tracking-wider">Estatísticas da Comunidade</h2>
                    <div className="w-16 h-px bg-white mx-auto" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { target: 25000, label: "Seguidores", suffix: "+" },
                        { target: 150, label: "Carros Analisados", suffix: "+" },
                        { target: 500, label: "Curiosidades", suffix: "+" },
                        { target: 1000, label: "Discussões", suffix: "+" },
                    ].map((stat, index) => (
                        <div key={index} className="space-y-4 group">
                        <div className="text-5xl font-thin text-white group-hover:scale-110 transition-transform duration-300">
                            <AnimatedCounter target={stat.target} />
                            {stat.suffix}
                        </div>
                        <div className="w-8 h-px bg-gray-600 mx-auto group-hover:w-16 group-hover:bg-white transition-all duration-300" />
                        <p className="text-gray-400 font-light">{stat.label}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
            )

        case "japanese":
            return (
            <div className="space-y-16">
                <div className="text-center space-y-8 py-16">
                <h2 className="text-6xl font-thin tracking-wider">GIGANTES JAPONESES</h2>
                <div className="w-24 h-px bg-white mx-auto" />
                <p className="text-xl text-gray-300 font-light">
                    Precisão, tecnologia e performance em perfeita harmonia
                </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
                {japaneseGiants.map((car, index) => (
                    <div
                    key={index}
                    className="group bg-black p-12 hover:bg-zinc-950 transition-all duration-700 cursor-pointer"
                    >
                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-light">{car.name}</h3>
                            <div className="w-12 h-px bg-gray-600 group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                        </div>
                        <span className="text-sm text-gray-500 font-light">{car.year}</span>
                        </div>
                        <p className="text-gray-400 font-light leading-relaxed">{car.description}</p>
                        <div className="text-sm text-gray-500 font-light">{car.specs}</div>
                        <div className="flex items-center text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 pt-4">
                        <span className="font-light">Saiba mais</span>
                        <ChevronRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )

        case "american":
            return (
            <div className="space-y-16">
                <div className="text-center space-y-8 py-16">
                <h2 className="text-6xl font-thin tracking-wider">MUSCLES AMERICANOS</h2>
                <div className="w-24 h-px bg-white mx-auto" />
                <p className="text-xl text-gray-300 font-light">Força bruta e rugido de motor que ecoa na alma</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
                {americanMuscles.map((car, index) => (
                    <div
                    key={index}
                    className="group bg-black p-12 hover:bg-zinc-950 transition-all duration-700 cursor-pointer"
                    >
                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-light">{car.name}</h3>
                            <div className="w-12 h-px bg-gray-600 group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                        </div>
                        <span className="text-sm text-gray-500 font-light">{car.year}</span>
                        </div>
                        <p className="text-gray-400 font-light leading-relaxed">{car.description}</p>
                        <div className="text-sm text-gray-500 font-light">{car.specs}</div>
                        <div className="flex items-center text-gray-500 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 pt-4">
                        <span className="font-light">Saiba mais</span>
                        <ChevronRight className="w-4 h-4 ml-2" />
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )

        case "curiosities":
            return (
            <div className="space-y-16">
                <div className="text-center space-y-8 py-16">
                <h2 className="text-6xl font-thin tracking-wider">CURIOSIDADES</h2>
                <div className="w-24 h-px bg-white mx-auto" />
                <p className="text-xl text-gray-300 font-light">Fatos fascinantes do universo automotivo</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
                {curiosities.map((fact, index) => (
                    <div key={index} className="group bg-black p-12 hover:bg-zinc-950 transition-all duration-700">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                        <span className="px-4 py-2 border border-gray-700 text-xs font-light tracking-wider">
                            {fact.category}
                        </span>
                        <Trophy className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="space-y-4">
                        <h3 className="text-2xl font-light leading-tight">{fact.title}</h3>
                        <div className="w-12 h-px bg-gray-600 group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                        <p className="text-gray-400 font-light leading-relaxed">{fact.content}</p>
                        <p className="text-sm text-gray-500 font-light">{fact.detail}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )

        case "community":
            return (
            <div className="space-y-16">
                <div className="text-center space-y-8 py-16">
                <h2 className="text-6xl font-thin tracking-wider">COMUNIDADE</h2>
                <div className="w-24 h-px bg-white mx-auto" />
                <p className="text-xl text-gray-300 font-light">Conectando apaixonados por automóveis</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800">
                {communityActivities.map((item, index) => (
                    <div
                    key={index}
                    className="bg-black p-12 text-center space-y-8 hover:bg-zinc-950 transition-all duration-700 group"
                    >
                    <item.icon className="w-20 h-20 mx-auto text-white group-hover:scale-110 transition-transform duration-500" />
                    <div className="space-y-4">
                        <h3 className="text-2xl font-light">{item.title}</h3>
                        <div className="w-12 h-px bg-gray-600 mx-auto group-hover:w-24 group-hover:bg-white transition-all duration-500" />
                        <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )

        default:
            return null
        }
    }

    return (
        <div className="bg-black text-white min-h-screen font-light antialiased">
        {/* Navigation Sidebar */}
        <div
            className={`fixed inset-y-0 left-0 z-50 w-full md:w-80 bg-black border-r border-gray-800 transform transition-transform duration-500 ease-out ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
            <div className="p-8 border-b border-gray-800">
            <h2 className="text-2xl font-thin tracking-wider">NAVEGAÇÃO</h2>
            <div className="w-16 h-px bg-gray-600 mt-4" />
            </div>
            <nav className="p-8 space-y-2">
            {navItems.map((item) => {
                const Icon = item.icon
                return (
                <button
                    key={item.id}
                    onClick={() => {
                    setActiveSection(item.id)
                    setIsNavOpen(false)
                    }}
                    className={`w-full flex items-center space-x-6 p-6 transition-all duration-300 group ${
                    activeSection === item.id
                        ? "bg-zinc-900 border-l-2 border-white"
                        : "hover:bg-zinc-950 border-l-2 border-transparent hover:border-zinc-600"
                    }`}
                >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-light tracking-wide">{item.label}</span>
                </button>
                )
            })}
            </nav>
        </div>

        {/* Profile Sidebar */}
        <div
            className={`fixed inset-y-0 right-0 z-50 w-full md:w-80 bg-black border-l border-gray-800 transform transition-transform duration-500 ease-out ${isProfileOpen ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}
        >
            <div className="h-full w-auto overflow-y-auto scroll-smooth">
                <div className="p-8 border-b border-gray-800">
                <h2 className="text-2xl font-thin tracking-wider">PERFIL</h2>
                <div className="w-16 h-px bg-gray-600 mt-4" />
                </div>
                <div className="p-8 space-y-8">
                <div className="text-center space-y-6">
                    <div className="w-24 h-24 border border-gray-700 mx-auto flex items-center justify-center group hover:border-white transition-colors duration-300">
                        <img src="https://i.pinimg.com/736x/93/3b/5c/933b5c9cf4702279ab8eeae238064505.jpg" alt="Linhadefuga" className="w-20 h-20 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-wide">@linha_de_fuga__</h3>
                    <div className="w-12 h-px bg-gray-600 mx-auto" />
                    <p className="text-gray-400 font-light">Mais do que carros. É fuga, é cultura.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                    <h4 className="font-light mb-3 tracking-wide">Missão</h4>
                    <div className="w-8 h-px bg-gray-600 mb-4" />
                    <p className="text-sm text-gray-400 font-light leading-relaxed">
                        Conectar apaixonados por motores através de conteúdo único e envolvente.
                    </p>
                    </div>

                    <div className="p-6 border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                    <h4 className="font-light mb-3 tracking-wide">Especialidades</h4>
                    <div className="w-8 h-px bg-gray-600 mb-4" />
                    <div className="flex flex-wrap gap-2">
                        {["Tuning", "Muscles", "Hypercars", "Classics", "Track Toys"].map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 border border-gray-700 text-xs font-light tracking-wider hover:border-gray-500 transition-colors duration-300"
                        >
                            {tag}
                        </span>
                        ))}
                    </div>
                    </div>

                    <div className="p-6 border border-gray-800 hover:border-gray-600 transition-colors duration-300">
                    <h4 className="font-light mb-3 tracking-wide">Dica do Dia</h4>
                    <div className="w-8 h-px bg-gray-600 mb-4" />
                    <p className="text-sm text-gray-400 font-light leading-relaxed italic">
                        "O segredo da velocidade não está apenas na potência, mas na harmonia entre homem e máquina."
                    </p>
                    </div>
                </div>

                <div className="pt-6">
                    <a
                    href="https://www.instagram.com/linha_de_fuga__/"
                    className="flex items-center justify-center space-x-3 w-full p-4 border border-gray-700 hover:border-white hover:bg-gray-950 transition-all duration-300 group"
                    >
                    <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-light tracking-wide">Seguir no Instagram</span>
                    </a>
                </div>
                </div>
            </div>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="lg:hidden fixed top-6 left-6 z-40">
            <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="p-4 bg-black border border-gray-700 hover:border-white transition-colors duration-300"
            >
            {isNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
        </div>

        <div className="lg:hidden fixed top-6 right-6 z-50">
            <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="p-4 bg-black border border-gray-700 hover:border-white transition-colors duration-300"
            >
            <Users className="w-5 h-5" />
            </button>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
            <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 p-4 bg-black border border-gray-700 hover:border-white transition-all duration-300 group lg:right-96"
            >
            <ArrowUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
        )}

        {/* Main Content */}
        <div className="lg:ml-80 lg:mr-80 min-h-screen">
            <main className="relative">{renderContent()}</main>

            {/* Footer */}
            <footer className="border-t border-gray-800 p-12 text-center space-y-6">
            <div className="space-y-4">
                <h3 className="text-2xl font-thin tracking-wider">LINHA DE FUGA</h3>
                <div className="w-16 h-px bg-gray-600 mx-auto" />
                <p className="text-gray-400 font-light">Mais do que um portal, uma comunidade.</p>
            </div>
            <div className="pt-8 text-sm text-gray-500 font-light">
                © {new Date().getFullYear()} Linha de Fuga. Todos os direitos reservados.
            </div>
            </footer>
        </div>

        {/* Mobile Overlay */}
        {(isNavOpen || isProfileOpen) && (
            <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-75 z-40 backdrop-blur-sm"
            onClick={() => {
                setIsNavOpen(false)
                setIsProfileOpen(false)
            }}
            />
        )}
        </div>
    )
}

export default Page
