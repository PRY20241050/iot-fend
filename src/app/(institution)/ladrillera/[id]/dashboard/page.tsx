import { BrickyardDashboard } from "@/components/brickyard/dashboard";

interface Props {
  params: { id?: string };
}

export default function LadrilleraDashboardPage({ params }: Props) {
  return <BrickyardDashboard brickyardId={params.id} institution />;
}
