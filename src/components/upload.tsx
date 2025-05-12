"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { UploadIcon } from "lucide-react"
// import { useRef } from "react"

export default function UploadPageLayout() {
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ファイルアップロード</h1>

      <Card>
        <CardHeader>
          <CardTitle>新規ファイルのアップロード</CardTitle>
          <CardDescription>
            PowerPointまたはPDFファイルをアップロードできます (最大50MB)
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-12 text-center border-gray-300"
          >
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold">
              ファイルをドラッグ&ドロップするか、クリックしてアップロード
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              PowerPoint (.pptx) または PDF (.pdf) ファイルのみ
            </p>
            <Button variant="outline" className="mt-6">
              ファイルを選択
            </Button>
          </div>

          {/* アップロード進捗バーのレイアウト例 */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>アップロード中...</span>
              <span>50%</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
