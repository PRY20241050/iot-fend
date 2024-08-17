import { History } from "@/components/brickyard/history";

interface Props {
  params: { id?: string };
}

export default function LadrilleraHistorialPage({ params }: Props) {
  return <History brickyardId={params.id} institution />;
}
