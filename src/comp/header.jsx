import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Star, Code, Sparkles, Brain, Zap, Radio, MessageSquare, Mail, Twitter } from 'lucide-react';

// Three.js background animation
const BackgroundAnimation = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        // Create particles
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const particleCount = 1000;

        for (let i = 0; i < particleCount; i++) {
            vertices.push(
                THREE.MathUtils.randFloatSpread(100),
                THREE.MathUtils.randFloatSpread(100),
                THREE.MathUtils.randFloatSpread(100)
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x8a2be2,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        camera.position.z = 30;

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0002;
            particles.rotation.y += 0.0003;
            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            mountRef.current.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

// Card component with enhanced hover effects
const Card = ({ children, className = "", highlight = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`
        relative overflow-hidden
        backdrop-blur-lg rounded-xl p-6 
        transition-all duration-300
        ${highlight ? 'bg-white/15' : 'bg-white/10'}
        hover:bg-white/20
        border border-white/10
        hover:border-white/20
        ${isHovered ? 'scale-[1.02] shadow-2xl' : 'scale-100'}
        ${className}
      `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`
        absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0
        transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}
      `} />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

// Section title with animation
const SectionTitle = ({ icon: Icon, children }) => (
    <h2 className="
    flex items-center text-2xl font-bold mb-8
    text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400
    hover:from-fuchsia-400 hover:to-blue-400 transition-all duration-300
  ">
        <Icon className="mr-3 h-8 w-8" />
        {children}
    </h2>
);

// Project card component
const ProjectCard = ({ icon: Icon, title, description, items, goal }) => (
    <Card className="hover:shadow-xl hover:shadow-purple-500/10">
        <h3 className="text-xl font-bold mb-4 flex items-center text-white">
            <Icon className="mr-2 h-6 w-6" />
            {title}
        </h3>
        <p className="text-white/80 mb-4">{description}</p>
        <ul className="space-y-2 mb-4">
            {items.map((item, index) => (
                <li key={index} className="flex items-center text-white/70 hover:text-white/90">
                    <span className="mr-2">•</span> {item}
                </li>
            ))}
        </ul>
        <p className="text-white/80 mt-4 border-t border-white/10 pt-4">{goal}</p>
    </Card>
);

// Team member type badge
const TypeBadge = ({ children }) => (
    <div className="
    group relative overflow-hidden
    bg-gradient-to-r from-purple-500/20 to-blue-500/20
    hover:from-purple-500/30 hover:to-blue-500/30
    rounded-lg p-3 transition-all duration-300
  ">
        <div className="relative z-10">{children}</div>
        <div className="
      absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10
      transform translate-x-full group-hover:translate-x-0 transition-transform duration-300
    " />
    </div>
);

export default function VertexLab() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen text-white font-sans">
            <BackgroundAnimation />

            {/* Floating navigation */}
            <nav className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${scrolled ? 'bg-black/20 backdrop-blur-lg shadow-lg' : ''}
        py-4
      `}>
                <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
                    <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                        The Vertex Lab
                    </div>
                    <div className="space-x-8">
                        <a href="#about" className="hover:text-purple-300 transition-colors">关于</a>
                        <a href="#projects" className="hover:text-purple-300 transition-colors">项目</a>
                        <a href="#join" className="hover:text-purple-300 transition-colors">加入</a>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main className="max-w-6xl mx-auto px-6 pt-24">
                {/* Hero section */}
                <section className="text-center mb-24">
                    <div className="inline-block text-6xl mb-6 animate-float">🔮</div>
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 text-transparent bg-clip-text">
                        The Vertex Lab 数元实验室
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        在数字时代的缝隙中，探索知识的新形态
                    </p>
                </section>

                {/* About section */}
                <section id="about" className="mb-24">
                    <SectionTitle icon={Sparkles}>我们是谁</SectionTitle>
                    <Card highlight>
                        <p className="text-lg text-white/90 leading-relaxed mb-6">
                            数元实验室像一座建在数字与现实之间的实验空间。我们痴迷于一个问题：当知识离开纸张，脱离屏幕，会呈现出怎样的形态？
                        </p>
                        <p className="text-lg text-white/90 leading-relaxed">
                            在这里，我们是工程师，是诗人，是黑客，是艺术家，是白日梦想家。我们相信知识不该被困在平面的牢笼，相信思想可以在空间中舞蹈，相信技术与诗意可以共鸣。
                        </p>
                    </Card>
                </section>

                {/* Projects section */}
                <section id="projects" className="mb-24">
                    <SectionTitle icon={Zap}>2024探索计划</SectionTitle>
                    <div className="space-y-6">
                        <ProjectCard
                            icon={Code}
                            title="知识织网计划：超越超链接"
                            description="还记得第一次用 Notion 或 Obsidian 时的震撼吗？但我们觉得这还不够。我们正在设计一个知识组织系统，让思想可以："
                            items={[
                                "像树一样生长，像水一样流动",
                                "在不同的节点间自由跳跃",
                                "根据语境动态重组，产生新的理解"
                            ]}
                            goal="第一阶段目标：开发一个极简但够酷的原型，实现思想的自由漫游。找10个爱写爱记录的朋友一起实验，看看会蹦出什么火花。"
                        />

                        <ProjectCard
                            icon={Brain}
                            title="AI诗人工程：解放创造力"
                            description="不，我们不是要做另一个 ChatGPT。我们在尝试："
                            items={[
                                "训练AI理解诗与画的内在联系",
                                "让机器学会讲故事，不是复制，而是创造",
                                "探索人类创意和机器生成的化学反应"
                            ]}
                            goal="第一个实验：让AI学习徐志摩和康定斯基，看它能不能用颜色说诗，用线条唱歌。"
                        />

                        <ProjectCard
                            icon={Radio}
                            title="空间叙事实验：知识的星图"
                            description="屏幕是平的，但思维是立体的。我们正在把知识变成可以漫步的风景："
                            items={[
                                "用VR/AR技术构建知识的星座",
                                "让抽象概念变成可触摸的几何体",
                                "在虚拟空间中重现思想的脉络"
                            ]}
                            goal="首个展示计划：把一篇论文变成一座可以探索的花园，预计年中完成概念原型。"
                        />
                    </div>
                </section>

                {/* Activities section */}
                <section className="mb-24">
                    <SectionTitle icon={MessageSquare}>定期聚会</SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                🔍 每周解谜会
                            </h3>
                            <p className="text-white/80 mb-4">周三晚上，我们聚在一起：</p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 解构一个有趣的数字作品
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 拆解一个迷人的技术概念
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 重组一个古老的哲学问题
                                </li>
                            </ul>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                🎨 月度创造营
                            </h3>
                            <p className="text-white/80 mb-4">每月最后的周末，我们会：</p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 邀请一位跨界创作者分享经验
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 实践一次疯狂的想法
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 碰撞出新的火花
                                </li>
                            </ul>
                        </Card>
                    </div>
                </section>

                {/* Join section */}
                <section id="join" className="mb-24">
                    <SectionTitle icon={Star}>寻找同路人</SectionTitle>

                    <Card className="mb-8">
                        <h3 className="text-xl font-bold mb-6">特别期待这样的跨界怪才</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <TypeBadge>🖥️ 热爱编程的诗人</TypeBadge>
                            <TypeBadge>🎨 会写代码的艺术家</TypeBadge>
                            <TypeBadge>📚 懂技术的人文学者</TypeBadge>
                            <TypeBadge>🔮 研究哲学的工程师</TypeBadge>
                            <TypeBadge>🎮 热爱游戏的理论家</TypeBadge>
                            <TypeBadge>🎵 玩音乐的科学家</TypeBadge>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <h4 className="font-bold text-lg mb-4">核心成员</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 每周投入10小时以上
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 领导或参与主要项目
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 需要提交项目提案或作品集
                                </li>
                            </ul>
                        </Card>

                        <Card>
                            <h4 className="font-bold text-lg mb-4">项目合作者</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 根据项目节奏参与
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 负责具体项目模块
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 展示相关领域作品即可
                                </li>
                            </ul>
                        </Card>

                        <Card>
                            <h4 className="font-bold text-lg mb-4">社群成员</h4>
                            <ul className="space-y-2">
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 自由参与周活动
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 参与线上讨论
                                </li>
                                <li className="flex items-center text-white/70">
                                    <span className="mr-2">•</span> 无特殊要求，保持好奇心
                                </li>
                            </ul>
                        </Card>
                    </div>
                </section>

                {/* Contact section */}
                <section className="mb-24">
                    <SectionTitle icon={Mail}>联系方式</SectionTitle>
                    <Card>
                        <div className="space-y-4">
                            <a
                                href="mailto:vertex@lab.net"
                                className="flex items-center group hover:text-purple-300 transition-colors"
                            >
                                <Mail className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                                vertex@lab.net
                            </a>
                            <div className="flex items-center group">
                                <MessageSquare className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                                <span>微信公众号：VertexLab</span>
                            </div>
                            <a
                                href="https://twitter.com/VertexLab_"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center group hover:text-purple-300 transition-colors"
                            >
                                <Twitter className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                                @VertexLab_
                            </a>
                        </div>
                    </Card>
                </section>

                {/* Footer */}
                <footer className="text-center py-12 border-t border-white/10">
                    <p className="max-w-3xl mx-auto text-white/60 italic leading-relaxed">
                        "在这里，我们是未来考古学家，发掘尚未出现的知识形态；是数字炼金术士，尝试思想与技术的疯狂实验。如果你也对知识的未来图景着迷，欢迎来撞出火花。"
                    </p>
                </footer>
            </main>

            {/* Custom cursor effect */}
            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        body {
          background: #0f172a;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
        </div>
    );
}

// Add required CSS animations for Tailwind
const tailwindConfig = {
    theme: {
        extend: {
            animation: {
                float: 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        }
    }
};