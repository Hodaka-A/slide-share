import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import {
    EyeIcon,
    FileIcon,
    FileTextIcon,
    TrashIcon,
    UploadIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  const files: Array<{
    id: string;
    name: string;
    size: string;
    uploadDate: string;
    type: string;
  }> = [
    {
      id: "1",
      name: "レポート.pdf",
      size: "1.2 MB",
      uploadDate: "2025/05/09",
      type: "application/pdf",
    },
    {
      id: "2",
      name: "プレゼン資料.pptx",
      size: "3.4 MB",
      uploadDate: "2025/05/08",
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    },
    {
        id: "2",
        name: "プレゼン資料.pptx",
        size: "3.4 MB",
        uploadDate: "2025/05/08",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      },
      {
        id: "3",
        name: "プレゼン資料.pptx",
        size: "3.4 MB",
        uploadDate: "2025/05/08",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      },
      {
        id: "4",
        name: "プレゼン資料.pptx",
        size: "3.4 MB",
        uploadDate: "2025/05/08",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      },
  ];

  return (
    <div>
      {/* ログアウトボタン */}
      <div className="flex justify-end p-4">
        <Button onClick={handleSignOut}>ログアウト</Button>
      </div>

      {/* メイン表示 */}
      <div className="px-4 max-w-screen-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">ファイル一覧</h1>
        </div>

        {files.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileTextIcon className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">ファイルがありません</h3>
              <p className="text-gray-500 mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => (
              <Card
                key={file.id}
                className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow max-w-[340px] w-full"
              >
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
                  <h3
                    className="font-medium text-lg text-center mb-2 line-clamp-1"
                    title={file.name}
                  >
                    {file.name}
                  </h3>
                  <div className="text-sm text-gray-500 text-center">
                    <p>{file.size}</p>
                    <p>{file.uploadDate}</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t p-4 flex justify-between">
                  <Link to={`/view/${file.id}`} className="flex-1 mr-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      閲覧
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
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
