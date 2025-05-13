"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/firebase/firebase";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPageLayout() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const user = auth.currentUser;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      navigate("/login");
      return;
    }

    setIsUploading(true); 

    const encodedFileName = encodeURIComponent(file.name);
    const filePath = `users/${user.uid}/${Date.now()}_${encodedFileName}`;
    const { error } = await supabase.storage
      .from("files") 
      .upload(filePath, file);

    if (error) {
      toast({
        title: "アップロード失敗",
        description: error.message,
        variant: "destructive",
      });
      setIsUploading(false);
      return;
    }

    
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setUploadProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        toast({
          title: "アップロード完了",
          description: `${file.name} をアップロードしました。`,
        });
      }
    }, 100);
  };

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
          <div className="border-2 border-dashed rounded-lg p-12 text-center border-gray-300">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold">
              クリックしてアップロード
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              PowerPoint (.pptx) または PDF (.pdf) ファイルのみ
            </p>

            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.pptx"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => inputRef.current?.click()}
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
  );
}
