import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  text?: string
}

export function LoadingScreen({ text = "読み込み中..." }: LoadingScreenProps) {
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-lg font-medium text-muted-foreground">{text}</p>
    </div>
  )
}
