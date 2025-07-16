import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UploadSuccessProps = {
  onReset: () => void;
};

export function UploadSuccess({ onReset }: UploadSuccessProps) {
  return (
    <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
      <CardHeader>
        <CardTitle className="text-green-800 dark:text-green-200">
          Upload Successful!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onReset} variant="outline">
          Upload Another Video
        </Button>
      </CardContent>
    </Card>
  );
}
