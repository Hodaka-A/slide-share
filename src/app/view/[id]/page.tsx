"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { FileIcon, FileTextIcon, ArrowLeftIcon, DownloadIcon } from "lucide-react"
import { getFile, formatFileSize, formatDate, type UploadedFile } from "@/lib/file-storage"

export default function ViewPage({ params }: { params: { id: string } }) {
  const [file, setFile] = useState<UploadedFile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const foundFile = getFile(params.id)
    if (foundFile) {
      setFile(foundFile)
    }
    setLoading(false)
  }, [params.id])

  // ファイルが見つからない場合
  if (!loading && !file) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">ファイルが見つかりません</h1>
        <p className="text-gray-500 mb-6">指定されたファイルは存在しないか、削除された可能性があります。</p>
        <Button onClick={() => router.push("/")}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          ファイル一覧に戻る
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.push("/")} className="mr-4">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          戻る
        </Button>
        <h1 className="text-3xl font-bold">ファイル閲覧</h1>
      </div>

      {file && (
        <Card className="overflow-hidden">
          <CardHeader>
            <div className="flex items-center">
              {file.type.includes("pdf") ? (
                <FileTextIcon className="h-8 w-8 text-red-500 mr-3" />
              ) : (
                <FileIcon className="h-8 w-8 text-blue-500 mr-3" />
              )}
              <div>
                <CardTitle>{file.name}</CardTitle>
                <CardDescription>
                  {formatFileSize(file.size)} • アップロード日時: {formatDate(file.uploadDate)}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[600px] border rounded">
              {file.type.includes("pdf") ? (
                <iframe src={file.url} className="w-full h-full" title={file.name} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <FileIcon className="h-16 w-16 text-blue-500 mb-4" />
                  <p className="text-center px-4 mb-6">PowerPointファイルはブラウザで直接プレビューできません。</p>
                  <a href={file.url} download={file.name}>
                    <Button>
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      ダウンロード
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t">
            <div className="text-sm text-gray-500">ファイルID: {file.id}</div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
