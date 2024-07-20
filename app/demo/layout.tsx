interface DemoLayoutProps {
  children: React.ReactNode
}

export default function DemoLayout({ children }: DemoLayoutProps) {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      {children}
    </div>
  )
}
