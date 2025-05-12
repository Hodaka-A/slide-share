import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { addFile, type UploadedFile } from "@/lib/file-storage"

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  // ドラッグ&ドロップイベントハンドラ
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // ファイル選択イベントハンドラ
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  // ファイル処理
  const handleFiles = (fileList: FileList) => {
    const file = fileList[0]

    // ファイルタイプの検証
    if (!file.type.includes("pdf") && !file.type.includes("powerpoint") && !file.name.endsWith(".pptx")) {
      toast({
        title: "エラー",
        description: "PDFまたはPowerPointファイルのみアップロードできます。",
        variant: "destructive",
      })
      return
    }

    uploadFile(file)
  }

  // ファイルアップロード処理（模擬）
  const uploadFile = (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    // アップロード進捗のシミュレーション
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // ファイルをBase64エンコード
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // アップロード完了を模擬
      setTimeout(() => {
        clearInterval(interval)
        setUploadProgress(100)

        const newFile: UploadedFile = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          url: reader.result as string,
          uploadDate: new Date(),
        }

        addFile(newFile)
        setIsUploading(false)

        toast({
          title: "アップロード完了",
          description: `${file.name} が正常にアップロードされました。`,
        })

        // ファイル一覧ページにリダイレクト
        router.push("/")
      }, 2000)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ファイルアップロード</h1>

      <Card>
        <CardHeader>
          <CardTitle>新規ファイルのアップロード</CardTitle>
          <CardDescription>PowerPointまたはPDFファイルをアップロードできます</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              isDragging ? "border-primary bg-primary/10" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold">ファイルをドラッグ&ドロップするか、クリックしてアップロード</h3>
            <p className="mt-2 text-sm text-gray-500">PowerPoint (.pptx) または PDF (.pdf) ファイルのみ</p>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.pptx,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation"
              onChange={handleFileSelect}
            />
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={isUploading}
            >
              ファイルを選択
            </Button>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>アップロード中...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
