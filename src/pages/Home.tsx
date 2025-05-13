"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { auth } from "@/firebase/firebase";
import { supabase } from "@/lib/supabase";
import { signOut } from "firebase/auth";
import {
  EyeIcon,
  FileIcon,
  FileTextIcon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type File = {
  id: string;
  name: string;
  size: number;
  fileType: string;
  updated_At: string;
  url: string;
};

export default function Home() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchUserFiles = async () => {
      if (!user?.uid) return;
      const filePath = `users/${user?.uid}/`;

      const { data, error } = await supabase.storage
        .from("files")
        .list(filePath);

      console.log(data);

      const fileList = (data ?? []).map((file) => {
        const fullPath = `${filePath}${file.name}`;
        const publicUrl = supabase.storage.from("files").getPublicUrl(fullPath)
          .data.publicUrl;

        const displayName = file.name.includes("_")
          ? file.name.substring(file.name.indexOf("_") + 1)
          : file.name;

        return {
          id: file.id,
          name: displayName,
          fileType: file.metadata?.mimetype as string,
          size: file.metadata?.size ? file.metadata.size / 1024 : 0,
          updated_At: file.metadata?.lastModified
            ? new Date(file.metadata.lastModified).toLocaleString("ja-JP")
            : "不明",
          url: publicUrl,
        };
      });

      setFiles(fileList);

      if (error) {
        console.error("ファイル取得エラー:", error.message);
      }
    };

    fetchUserFiles();
  }, [user?.uid]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  const formatFileSize = (sizeInKB: number) => {
    if (sizeInKB < 1) return "0 KB";
    if (sizeInKB < 1024) return `${Math.round(sizeInKB)} KB`;
    return `${(sizeInKB / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex justify-end p-4 container mx-auto">
        <Button onClick={handleSignOut}>ログアウト</Button>
      </div>


      <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold">ファイル一覧</h1>
          {files.length > 0 && (
            <Link to="/upload">
              <Button size="sm" className="hidden sm:flex">
                <UploadIcon className="mr-2 h-4 w-4" />
                ファイルをアップロード
              </Button>
              <Button size="sm" className="sm:hidden" variant="outline">
                <UploadIcon className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        {files.length === 0 ? (
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileTextIcon className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                ファイルがありません
              </h3>
              <p className="text-gray-500 mb-6 text-center">
                アップロードボタンからファイルをアップロードしてください
              </p>
              <Link to="/upload">
                <Button>
                  <UploadIcon className="mr-2 h-4 w-4" />
                  ファイルをアップロード
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {files.map((file) => (
              <Card
                key={file.id}
                className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4 sm:p-6 flex-grow">
                  <div className="flex justify-center mb-4">
                    {file.fileType.includes("pdf") ? (
                      <div className="bg-red-50 p-4 rounded-full">
                        <FileTextIcon className="h-10 w-10 sm:h-12 sm:w-12 text-red-500" />
                      </div>
                    ) : (
                      <div className="bg-blue-50 p-4 rounded-full">
                        <FileIcon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500" />
                      </div>
                    )}
                  </div>
                  <h3
                    className="font-medium text-base sm:text-lg text-center mb-2 line-clamp-1"
                    title={file.name}
                  >
                    {file.name}
                  </h3>
                  <div className="text-xs sm:text-sm text-gray-500 text-center">
                    <p>{formatFileSize(file.size)}</p>
                    <p>{file.updated_At}</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t p-3 sm:p-4 flex justify-between">
                  <Link to={`/view/${file.id}`} className="flex-1 mr-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      閲覧
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
