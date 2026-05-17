import { motion } from 'framer-motion'

interface SkillBadgeProps {
  name: string
  level?: number
  icon?: string
}

export default function SkillBadge({ name, level = 90, icon }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, borderColor: 'rgba(200,255,0,0.3)' }}
      className="bg-surface-2 border border-border rounded-xl px-4 py-3 flex items-center gap-3 transition-colors duration-200"
    >
      {icon && <span className="text-xl">{icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium truncate">{name}</span>
          <span className="text-xs text-muted font-mono ml-2">{level}%</span>
        </div>
        <div className="h-[2px] bg-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-accent rounded-full"
          />
        </div>
      </div>
    </motion.div>
  )
}
