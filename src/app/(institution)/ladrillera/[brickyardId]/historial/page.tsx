import { History } from "@/components/brickyard/history";

interface Props {
  params: { brickyardId?: string };
}

export default function LadrilleraHistorialPage({ params }: Props) {
  return <History brickyardId={params.brickyardId} institution />;
}
