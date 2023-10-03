import { useParams } from "react-router-dom";
import MainLayout from "../components/layout";
import LoadingSparkle from "@/components/LoadingSparkle";

export default function LoginWithEmailPage() {
  const { token } = useParams();

  console.log(token)


  return (
    <MainLayout secure={false} sidebar={false}>
      <div className="flex flex-col items-center justify-center py-36 h-full">
        <LoadingSparkle variant="large" spark />
      </div>
    </MainLayout>
  );
}
