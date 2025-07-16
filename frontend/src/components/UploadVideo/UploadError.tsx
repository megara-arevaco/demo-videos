import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type UploadErrorProps = {
  error: string;
  onRetry: () => void;
};

export function UploadError({ error, onRetry }: UploadErrorProps) {
  return (
    <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
      <CardHeader>
        <CardTitle className="text-red-800 dark:text-red-200">
          Upload Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
        <Button variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </CardContent>
    </Card>
  );
}
