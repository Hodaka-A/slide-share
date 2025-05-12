import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FileIcon, FileTextIcon, EyeIcon, TrashIcon, UploadIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { getFiles, deleteFile, formatFileSize, formatDate, type UploadedFile } from "@/lib/file-storage"

export default function Home() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const { toast } = useToast()

  // ファイル一覧を読み込む
  useEffect(() => {
    setFiles(getFiles())
  }, [])

  // ファイル削除
  const handleDeleteFile = (id: string) => {
    const updatedFiles = deleteFile(id)
    setFiles(updatedFiles)

    toast({
      title: "ファイル削除",
      description: "ファイルが削除されました。",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ファイル一覧</h1>
        <Link href="/upload" passHref>
          <Button>
            <UploadIcon className="mr-2 h-4 w-4" />
            新規アップロード
          </Button>
        </Link>
      </div>

      {files.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileTextIcon className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">ファイルがありません</h3>
            <p className="text-gray-500 mb-6">アップロードボタンからファイルをアップロードしてください</p>
            <Link href="/upload" passHref>
              <Button>
                <UploadIcon className="mr-2 h-4 w-4" />
                ファイルをアップロード
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.map((file) => (
            <Card key={file.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex-grow">
                <div className="flex justify-center mb-4">
                  {file.type.includes("pdf") ? (
                    <div className="bg-red-50 p-4 rounded-full">
                      <FileTextIcon className="h-12 w-12 text-red-500" />
                    </div>
                  ) : (
                    <div className="bg-blue-50 p-4 rounded-full">
                      <FileIcon className="h-12 w-12 text-blue-500" />
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-lg text-center mb-2 line-clamp-1" title={file.name}>
                  {file.name}
                </h3>
                <div className="text-sm text-gray-500 text-center">
                  <p>{formatFileSize(file.size)}</p>
                  <p>{formatDate(file.uploadDate)}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t p-4 flex justify-between">
                <Link href={`/view/${file.id}`} passHref className="flex-1 mr-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    閲覧
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteFile(file.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
