import { memo } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import SectionReveal from '../components/ui/SectionReveal'
import SkillBadge from '../components/ui/SkillBadge'

// Module-level constants
const SKILLS = [
  { name: 'C# / .NET', level: 95, icon: '⚡' },
  { name: 'Unity Engine', level: 90, icon: '🎮' },
  { name: 'ASP.NET Core', level: 75, icon: '🌐' },
  { name: 'LINQ & Async/Await', level: 92, icon: '🔗' },
  { name: 'Entity Framework', level: 70, icon: '🗄️' },
  { name: 'Compute Shaders', level: 80, icon: '🖥️' },
  { name: 'Design Patterns', level: 88, icon: '🏗️' },
  { name: 'Performance Profiling', level: 82, icon: '📈' },
] as const

const CODE_SNIPPET = `// Custom ECS Archetype System
public sealed class World
{
    private readonly Dictionary<Type, IComponentPool> _pools = new();
    private readonly SparseSet<Entity> _entities = new();

    public Entity CreateEntity()
    {
        var entity = new Entity(_nextId++);
        _entities.Add(entity);
        return entity;
    }

    public ref T AddComponent<T>(Entity entity) where T : struct
    {
        var pool = GetOrCreatePool<T>();
        return ref pool.Add(entity);
    }

    public void Query<T>(ComponentQuery<T> query) where T : struct
    {
        if (!_pools.TryGetValue(typeof(T), out var pool)) return;
        var typedPool = (ComponentPool<T>)pool;
        
        foreach (var entity in typedPool.Entities)
            query(entity, ref typedPool.Get(entity));
    }
}`

const PROJECTS = [
  {
    title: 'Procedural World Generator',
    desc: 'Infinite voxel terrain using layered Perlin/Simplex noise with biome blending, cave systems, and GPU-accelerated chunk streaming.',
    tags: ['C#', 'Unity', 'Compute Shaders', 'Jobs System'],
  },
  {
    title: 'Custom ECS Framework',
    desc: 'Minimal high-performance Entity-Component-System in C# with archetype storage, structural queries, and zero-allocation iteration.',
    tags: ['C#', '.NET 8', 'Unsafe Code', 'SIMD'],
  },
  {
    title: 'AI Behavior Trees',
    desc: 'A visual behavior tree editor with runtime execution, blackboard memory, and parallel composite nodes for game AI.',
    tags: ['C#', 'Unity', 'Editor Tools'],
  },
] as const

// Static viewport objects
const VIEWPORT = { once: true } as const

// Syntax highlighting — computed once per line at module level, not each render
// Uses a stable Map to cache results
const highlighted = CODE_SNIPPET.split('\n').map((line) =>
  line
    .replace(/\b(public|private|sealed|class|void|ref|new|return|if|foreach|var|where|struct)\b/g, '<span style="color:#cba6f7">$1</span>')
    .replace(/\b(Dictionary|Type|IComponentPool|SparseSet|Entity|ComponentPool|World)\b/g, '<span style="color:#89b4fa">$1</span>')
    .replace(/"[^"]*"/g, '<span style="color:#a6e3a1">$&</span>')
    .replace(/\/\/.*/g, '<span style="color:#6c7086">$&</span>')
    .replace(/\b(T)\b/g, '<span style="color:#fab387">$1</span>')
)

export default memo(function CSharp() {
  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <SectionReveal>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs text-accent font-mono tracking-widest">LANGUAGE</span>
              <div className="h-[1px] w-12 bg-accent/30" aria-hidden="true" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              C<span className="text-gradient">#</span>
              <br />
              Development
            </h1>
            <p className="text-muted text-lg max-w-xl leading-relaxed">
              Deep expertise in C# across game development, systems architecture, and backend services. Built on performance, clarity, and modern .NET.
            </p>
          </div>
        </SectionReveal>

        {/* Skills grid */}
        <section className="mb-20">
          <SectionReveal>
            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-8">Skills & Proficiency</p>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <SkillBadge {...s} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Code snippet */}
        <section className="mb-20">
          <SectionReveal>
            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-6">Code Sample</p>
            <div className="rounded-2xl bg-surface border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-surface-2" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-muted font-mono">World.cs</span>
              </div>
              {/* pre + code — correct semantic HTML for code blocks */}
              <pre className="p-6 overflow-x-auto text-sm leading-relaxed" role="region" aria-label="Code sample: Custom ECS Archetype System">
                <code className="font-mono text-[13px]">
                  {/* Pre-rendered highlighted lines — no processing on render */}
                  {highlighted.map((html, i) => (
                    <div key={i} className="flex">
                      <span className="text-muted/40 w-8 shrink-0 select-none text-right mr-4 text-xs leading-[1.6rem]" aria-hidden="true">
                        {i + 1}
                      </span>
                      <span
                        className="text-[#cdd6f4]"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </SectionReveal>
        </section>

        {/* C# Projects */}
        <section>
          <SectionReveal>
            <p className="text-xs text-muted uppercase tracking-widest font-mono mb-8">C# Projects</p>
          </SectionReveal>
          <div className="space-y-4">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-surface-2 border border-border hover:border-accent/20 rounded-2xl p-6 transition-all duration-300"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-surface border border-border text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  )
})
