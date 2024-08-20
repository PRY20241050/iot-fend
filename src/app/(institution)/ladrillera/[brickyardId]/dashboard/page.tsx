import { BrickyardDashboard } from "@/components/brickyard/dashboard";

interface Props {
  params: { brickyardId?: string };
}

export default function LadrilleraDashboardPage({ params }: Props) {
  return <BrickyardDashboard brickyardId={params.brickyardId} institution />;
}
